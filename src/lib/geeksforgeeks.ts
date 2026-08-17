const USERNAME = "lbhlbharath";

export type GfgStats = {
  username: string;
  profileUrl: string;
  score: number;
  totalSolved: number;
  instituteRank: number | null;
};

export async function getGfgStats(): Promise<GfgStats | null> {
  try {
    const res = await fetch(
      `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${USERNAME}`,
      { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 3600 } },
    );

    if (!res.ok) return null;

    const json = await res.json();
    const data = json?.data;
    if (!data) return null;

    return {
      username: USERNAME,
      profileUrl: `https://www.geeksforgeeks.org/user/${USERNAME}/`,
      score: data.score ?? 0,
      totalSolved: data.total_problems_solved ?? 0,
      instituteRank: data.institute_rank ?? null,
    };
  } catch {
    return null;
  }
}
