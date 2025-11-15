import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const recipes = await prisma.recipe.findMany({
      where: {
        published: true,
        ...(category && {
          categories: {
            some: {
              category: {
                slug: category
              }
            }
          }
        })
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        },
        images: true,
        categories: {
          include: {
            category: true
          }
        },
        ratings: true,
        _count: {
          select: {
            comments: true,
            ratings: true,
            reviews: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      images,
      videos,
      categories,
      published
    } = body;

    if (!title || !ingredients || !instructions) {
      return NextResponse.json(
        { error: 'Title, ingredients, and instructions are required' },
        { status: 400 }
      );
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
        instructions,
        prepTime: prepTime ? parseInt(prepTime) : null,
        cookTime: cookTime ? parseInt(cookTime) : null,
        servings: servings ? parseInt(servings) : null,
        difficulty,
        published: published ?? true,
        authorId: session.user.id,
        images: {
          create: images?.map((img: any) => ({
            url: img.url,
            key: img.key
          })) || []
        },
        videos: {
          create: videos?.map((vid: any) => ({
            url: vid.url,
            key: vid.key || null,
            type: vid.type,
            youtubeId: vid.youtubeId || null
          })) || []
        },
        categories: {
          create: categories?.map((catId: string) => ({
            categoryId: catId
          })) || []
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        },
        images: true,
        videos: true,
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    );
  }
}
