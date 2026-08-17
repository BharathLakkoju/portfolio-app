const LEETCODE_USERNAME = "user6463g";

const QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export type LeetCodeStats = {
  username: string;
  profileUrl: string;
  ranking: number;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
};

type CountByDifficulty = { difficulty: string; count: number }[];

function toMap(entries: CountByDifficulty): Record<string, number> {
  return Object.fromEntries(entries.map((e) => [e.difficulty, e.count]));
}

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const matchedUser = json?.data?.matchedUser;
    if (!matchedUser) return null;

    const solved = toMap(matchedUser.submitStatsGlobal.acSubmissionNum);
    const total = toMap(json.data.allQuestionsCount);

    return {
      username: matchedUser.username,
      profileUrl: `https://leetcode.com/u/${matchedUser.username}`,
      ranking: matchedUser.profile.ranking,
      totalSolved: solved.All ?? 0,
      totalQuestions: total.All ?? 0,
      easySolved: solved.Easy ?? 0,
      easyTotal: total.Easy ?? 0,
      mediumSolved: solved.Medium ?? 0,
      mediumTotal: total.Medium ?? 0,
      hardSolved: solved.Hard ?? 0,
      hardTotal: total.Hard ?? 0,
    };
  } catch {
    return null;
  }
}
