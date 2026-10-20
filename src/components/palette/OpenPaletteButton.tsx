"use client";

import { Search } from "lucide-react";
import { usePalette } from "~/components/palette/PaletteProvider";
import { Button } from "~/components/ui/button";

export function OpenPaletteButton({
	label = "Search the site",
}: {
	label?: string;
}) {
	const { setOpen, isMac } = usePalette();
	return (
		<Button onClick={() => setOpen(true)} variant="ghost">
			<Search aria-hidden size={15} />
			{label}
			<kbd className="ml-1 rounded-sm border border-border-strong px-1.5 font-mono text-fg-muted text-label">
				{isMac ? "⌘K" : "Ctrl K"}
			</kbd>
		</Button>
	);
}
