import { NextResponse } from 'next/server';
import { adventLocations } from '@/data/adventLocations';

// Returns basic metadata for all locations (safe for client)
// Only includes number and reveal date - no sensitive data like names, descriptions, or positions
export async function GET() {
  try {
    const metadata = adventLocations.map(loc => ({
      number: loc.number,
      revealDate: loc.revealDate
    }));

    return NextResponse.json({
      metadata,
      totalCount: metadata.length
    });
  } catch (error) {
    console.error('Error fetching advent metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
