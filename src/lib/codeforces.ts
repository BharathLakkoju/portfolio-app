const HANDLE = "bharath0712";

export type CodeforcesStats = {
  handle: string;
  profileUrl: string;
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  solvedCount: number;
};

type Submission = {
  verdict?: string;
  problem: { contestId?: number; index: string };
};

export async function getCodeforcesStats(): Promise<CodeforcesStats | null> {
  try {
    const [infoRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${HANDLE}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://codeforces.com/api/user.status?handle=${HANDLE}`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!infoRes.ok || !statusRes.ok) return null;

    const infoJson = await infoRes.json();
    const statusJson = await statusRes.json();
    if (infoJson.status !== "OK" || statusJson.status !== "OK") return null;

    const user = infoJson.result[0];
    const solved = new Set<string>();
    for (const sub of statusJson.result as Submission[]) {
      if (sub.verdict === "OK") {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    }

    return {
      handle: user.handle,
      profileUrl: `https://codeforces.com/profile/${user.handle}`,
      rating: user.rating ?? null,
      maxRating: user.maxRating ?? null,
      rank: user.rank ?? null,
      solvedCount: solved.size,
    };
  } catch {
    return null;
  }
}
