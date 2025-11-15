import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { prisma } from '@/lib/prisma';

const parser = new Parser();

// Example RSS feeds for cookie content
const RSS_FEEDS = [
  'https://www.thekitchn.com/main.rss', // Food blog
  // Add more cookie/baking RSS feeds here
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchNew = searchParams.get('fetch') === 'true';

    if (!fetchNew) {
      // Return cached RSS items from database
      const items = await prisma.post.findMany({
        where: {
          content: {
            contains: '[RSS]'
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 20
      });

      return NextResponse.json(items);
    }

    // Fetch new items from RSS feeds
    const allItems: any[] = [];

    for (const feedUrl of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);

        for (const item of feed.items.slice(0, 5)) {
          // Check if item contains cookie/baking keywords
          const title = item.title || '';
          const content = item.contentSnippet || item.content || '';
          const keywords = ['cookie', 'baking', 'dessert', 'sweet', 'recipe'];

          const isRelevant = keywords.some(keyword =>
            title.toLowerCase().includes(keyword) ||
            content.toLowerCase().includes(keyword)
          );

          if (isRelevant) {
            allItems.push({
              title: item.title,
              content: `[RSS] ${item.contentSnippet || item.content || ''}`,
              link: item.link,
              pubDate: item.pubDate,
              source: feed.title
            });
          }
        }
      } catch (error) {
        console.error(`Error parsing feed ${feedUrl}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      items: allItems,
      count: allItems.length
    });
  } catch (error) {
    console.error('RSS fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feeds' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Import RSS items into the feed
    // This would require an admin user
    const body = await request.json();
    const { items } = body;

    // Create a system user for RSS posts if doesn't exist
    let systemUser = await prisma.user.findFirst({
      where: { email: 'rss@cookiecastle.com' }
    });

    if (!systemUser) {
      systemUser = await prisma.user.create({
        data: {
          email: 'rss@cookiecastle.com',
          name: 'Cookie Castle RSS',
          password: 'no-login', // Can't login with this
          role: 'admin'
        }
      });
    }

    const created = [];

    for (const item of items) {
      const post = await prisma.post.create({
        data: {
          content: `[RSS from ${item.source}]\n\n${item.title}\n\n${item.content}\n\nRead more: ${item.link}`,
          userId: systemUser.id,
          imageUrl: null
        }
      });
      created.push(post);
    }

    return NextResponse.json({
      success: true,
      created: created.length
    });
  } catch (error) {
    console.error('RSS import error:', error);
    return NextResponse.json(
      { error: 'Failed to import RSS items' },
      { status: 500 }
    );
  }
}
