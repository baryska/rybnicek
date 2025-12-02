import { NextRequest, NextResponse } from 'next/server';
import { adventLocations, AdventLocation } from '@/data/adventLocations';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const testDateParam = searchParams.get('testDate');

    let now: Date;
    if (testDateParam) {
      now = new Date(testDateParam);
      console.log('🧪 API Test mode active! Simulating date:', now.toLocaleDateString('cs-CZ'));
    } else {
      now = new Date();
    }

    // Filter locations based on reveal date
    const isLocationRevealed = (location: AdventLocation): boolean => {
      const revealDate = new Date(location.revealDate + 'T00:00:00');
      return now >= revealDate;
    };

    const visibleLocations = adventLocations.filter(isLocationRevealed);

    return NextResponse.json({
      locations: visibleLocations,
      currentDate: now.toISOString(),
      totalLocations: adventLocations.length,
      revealedCount: visibleLocations.length
    });
  } catch (error) {
    console.error('Error fetching advent locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
