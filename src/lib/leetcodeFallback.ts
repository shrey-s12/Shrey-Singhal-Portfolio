import type { LeetCodeStats } from '@/data/types';
import { dsaData } from '@/data/dsa';

export const LEETCODE_USERNAME = 'shrey_s12';

// Shown when LeetCode can't be reached: solved counts come from dsaData, totals are recent snapshots
export function getFallbackLeetCodeStats(): LeetCodeStats {
  return {
    username: LEETCODE_USERNAME,
    ranking: 0,
    reputation: 0,
    totalSolved: parseInt(dsaData.totalSolved) || 600,
    totalQuestions: 4082,
    easySolved: parseInt(dsaData.easy) || 370,
    easyTotal: 971,
    mediumSolved: parseInt(dsaData.medium) || 286,
    mediumTotal: 2128,
    hardSolved: parseInt(dsaData.hard) || 32,
    hardTotal: 983,
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
