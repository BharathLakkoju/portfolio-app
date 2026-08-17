const USERNAME = "lbh_lbharath";

export type HackerRankStats = {
  username: string;
  profileUrl: string;
  level: number;
  badges: { name: string; stars: number; solved: number; total: number }[];
};

type Badge = {
  badge_name: string;
  stars: number;
  solved: number;
  total_challenges: number;
};

export async function getHackerRankStats(): Promise<HackerRankStats | null> {
  try {
    const headers = { "User-Agent": "Mozilla/5.0" };
    const [profileRes, badgesRes] = await Promise.all([
      fetch(
        `https://www.hackerrank.com/rest/contests/master/hackers/${USERNAME}/profile`,
        { headers, next: { revalidate: 3600 } },
      ),
      fetch(`https://www.hackerrank.com/rest/hackers/${USERNAME}/badges`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileRes.ok || !badgesRes.ok) return null;

    const profileJson = await profileRes.json();
    const badgesJson = await badgesRes.json();
    if (!badgesJson.status) return null;

    const badges = (badgesJson.models as Badge[])
      .slice()
      .sort((a, b) => b.stars - a.stars)
      .map((b) => ({
        name: b.badge_name,
        stars: b.stars,
        solved: b.solved,
        total: b.total_challenges,
      }));

    return {
      username: USERNAME,
      profileUrl: `https://www.hackerrank.com/profile/${USERNAME}`,
      level: profileJson.model?.level ?? 0,
      badges,
    };
  } catch {
    return null;
  }
}
