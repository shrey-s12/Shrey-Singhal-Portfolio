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
