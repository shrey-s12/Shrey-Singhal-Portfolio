import { fetchLeetCodeStats } from '@/lib/leetcode';

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await fetchLeetCodeStats();

    return Response.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('LeetCode API route error:', error);

    return Response.json(
      { error: 'Failed to fetch LeetCode stats' },
      { status: 500 }
    );
  }
}
