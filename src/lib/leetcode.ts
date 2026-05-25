import type { LeetCodeStats } from '@/data/types';
import { dsaData } from '@/data/dsa';

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';
const LEETCODE_USERNAME = 'shrey_s12';

const USER_SESSION_PROGRESS_QUERY = `
  query userSessionProgress($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      badges {
        id
        name
        shortName
        displayName
        icon
        creationDate
        category
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`;

const USER_STREAK_QUERY = `
  query getUserStreak($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

interface UserSessionProgressData {
  allQuestionsCount: Array<{
    difficulty: string;
    count: number;
  }>;
  matchedUser: {
    submitStats: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
        submissions: number;
      }>;
    };
  };
}

interface UserProfileData {
  matchedUser: {
    username: string;
    profile: {
      ranking: number;
      reputation: number;
    };
    badges: Array<{
      id: string;
      name: string;
      shortName: string;
      displayName: string;
      icon: string;
      creationDate: string;
      category: string;
    }>;
  };
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
  } | null;
}

interface UserStreakData {
  matchedUser: {
    userCalendar: {
      streak: number;
      totalActiveDays: number;
      submissionCalendar: string;
    };
  };
}

async function fetchGraphQL<T>(query: string, variables: Record<string, string>): Promise<T | null> {
  try {
    const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`LeetCode API error: ${response.status}`);
      return null;
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
      console.error('LeetCode GraphQL errors:', result.errors);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Failed to fetch from LeetCode:', error);
    return null;
  }
}

function getFallbackStats(): LeetCodeStats {
  return {
    username: LEETCODE_USERNAME,
    ranking: 0,
    reputation: 0,
    totalSolved: parseInt(dsaData.totalSolved) || 600,
    totalQuestions: 3943,
    easySolved: parseInt(dsaData.easy) || 336,
    easyTotal: 946,
    mediumSolved: parseInt(dsaData.medium) || 246,
    mediumTotal: 2061,
    hardSolved: parseInt(dsaData.hard) || 31,
    hardTotal: 936,
    contestRating: 0,
    contestAttended: 0,
    contestGlobalRanking: 0,
    contestTopPercentage: 0,
    badges: [],
    streak: 0,
    totalActiveDays: 0,
    submissionCalendar: {},
  };
}

export async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const [progressData, profileData, streakData] = await Promise.all([
    fetchGraphQL<UserSessionProgressData>(USER_SESSION_PROGRESS_QUERY, { username: LEETCODE_USERNAME }),
    fetchGraphQL<UserProfileData>(USER_PROFILE_QUERY, { username: LEETCODE_USERNAME }),
    fetchGraphQL<UserStreakData>(USER_STREAK_QUERY, { username: LEETCODE_USERNAME }),
  ]);

  if (!progressData || !progressData.matchedUser) {
    return getFallbackStats();
  }

  // Get total question counts from allQuestionsCount
  const allQuestions = progressData.allQuestionsCount;
  const totalAll = allQuestions.find((q) => q.difficulty === 'All')?.count ?? 3943;
  const totalEasy = allQuestions.find((q) => q.difficulty === 'Easy')?.count ?? 946;
  const totalMedium = allQuestions.find((q) => q.difficulty === 'Medium')?.count ?? 2061;
  const totalHard = allQuestions.find((q) => q.difficulty === 'Hard')?.count ?? 936;

  // Get solved counts from submitStats
  const acStats = progressData.matchedUser.submitStats.acSubmissionNum;
  const solvedAll = acStats.find((s) => s.difficulty === 'All')?.count ?? 0;
  const solvedEasy = acStats.find((s) => s.difficulty === 'Easy')?.count ?? 0;
  const solvedMedium = acStats.find((s) => s.difficulty === 'Medium')?.count ?? 0;
  const solvedHard = acStats.find((s) => s.difficulty === 'Hard')?.count ?? 0;

  // Profile data
  const username = profileData?.matchedUser?.username ?? LEETCODE_USERNAME;
  const ranking = profileData?.matchedUser?.profile?.ranking ?? 0;
  const reputation = profileData?.matchedUser?.profile?.reputation ?? 0;
  const badges = profileData?.matchedUser?.badges?.map((b) => ({
    name: b.shortName || b.displayName || b.name,
    icon: b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`,
  })) ?? [];
  const userContestRanking = profileData?.userContestRanking;

  // Streak data
  let submissionCalendar: Record<string, number> = {};
  let streak = 0;
  let totalActiveDays = 0;

  if (streakData?.matchedUser?.userCalendar) {
    const calendar = streakData.matchedUser.userCalendar;
    streak = calendar.streak;
    totalActiveDays = calendar.totalActiveDays;

    try {
      submissionCalendar = JSON.parse(calendar.submissionCalendar || '{}') as Record<string, number>;
    } catch {
      submissionCalendar = {};
    }
  }

  return {
    username,
    ranking,
    reputation,
    totalSolved: solvedAll,
    totalQuestions: totalAll,
    easySolved: solvedEasy,
    easyTotal: totalEasy,
    mediumSolved: solvedMedium,
    mediumTotal: totalMedium,
    hardSolved: solvedHard,
    hardTotal: totalHard,
    contestRating: userContestRanking?.rating ? Math.round(userContestRanking.rating) : 0,
    contestAttended: userContestRanking?.attendedContestsCount ?? 0,
    contestGlobalRanking: userContestRanking?.globalRanking ?? 0,
    contestTopPercentage: userContestRanking?.topPercentage ? parseFloat(userContestRanking.topPercentage.toFixed(1)) : 0,
    badges,
    streak,
    totalActiveDays,
    submissionCalendar,
  };
}
