import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const locations = await prisma.popupLocation.findMany({
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
        startDate: 'desc'
      }
    });

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching pop-up locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
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
      name,
      description,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      startDate,
      endDate
    } = body;

    if (!name || !address || !city || !state || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const location = await prisma.popupLocation.create({
      data: {
        name,
        description,
        address,
        city,
        state,
        zipCode,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: session.user.id,
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
      }
    });

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error creating pop-up location:', error);
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    );
  }
}
