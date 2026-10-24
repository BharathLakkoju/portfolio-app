import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			text: ["label", "body-lg", "h3", "h2", "h1", "stat", "display"],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

/** "2024-09" → "Sep 2024" */
export function formatMonthYear(startMonth: string) {
	const [y = 0, m = 1] = startMonth.split("-").map(Number);
	return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
}

/**
 * Calendar months in role from `startMonth` (YYYY-MM) through `now`.
 * Counts the start month, so tenure never reads zero on day one.
 */
export function formatTenure(startMonth: string, now: Date = new Date()) {
	const [y = 0, m = 1] = startMonth.split("-").map(Number);
	const total = Math.max(
		1,
		(now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m),
	);
	const years = Math.floor(total / 12);
	const months = total % 12;
	const parts = [
		years > 0 && `${years} year${years === 1 ? "" : "s"}`,
		months > 0 && `${months} month${months === 1 ? "" : "s"}`,
	].filter(Boolean);
	return parts.join(" ");
}

/** "Sep 2024 — Present · 2 years 1 month" for a current role. */
export function formatCurrentRoleDates(startMonth: string, now: Date = new Date()) {
	return `${formatMonthYear(startMonth)} — Present · ${formatTenure(startMonth, now)}`;
}

export function estimateReadTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.trim().split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}
