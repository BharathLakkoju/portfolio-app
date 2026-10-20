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

/** "2024-09" -> "2 yrs 1 mo" (counts the start month, so it never reads 0). */
export function formatTenure(startMonth: string, now: Date = new Date()) {
	const [y = 0, m = 1] = startMonth.split("-").map(Number);
	const total = Math.max(
		1,
		(now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m),
	);
	const years = Math.floor(total / 12);
	const months = total % 12;
	const parts = [
		years > 0 && `${years} yr${years === 1 ? "" : "s"}`,
		months > 0 && `${months} mo`,
	].filter(Boolean);
	return parts.join(" ");
}

export function estimateReadTime(content: string): number {
	const wordsPerMinute = 200;
	const wordCount = content.trim().split(/\s+/).length;
	return Math.ceil(wordCount / wordsPerMinute);
}
