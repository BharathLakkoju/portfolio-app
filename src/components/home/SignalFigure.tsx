"use client";

import { useEffect, useRef, useState } from "react";
import { usePalette } from "~/components/palette/PaletteProvider";
import { SwapAvatar } from "~/components/shared/SwapAvatar";
import {
	useFinePointer,
	useMediaQuery,
	useReducedMotion,
} from "~/hooks/use-media-query";
import { usePageVisible } from "~/hooks/use-page-visible";

type Node = { x: number; y: number; label?: string };

/** Hand-placed so the composition is stable across loads. Index 0 is the hub. */
const NODES: Node[] = [
	{ x: 0.5, y: 0.5 },
	{ x: 0.14, y: 0.34, label: "INGEST" },
	{ x: 0.38, y: 0.12, label: "MATCH" },
	{ x: 0.82, y: 0.22, label: "CITE" },
	{ x: 0.88, y: 0.62, label: "REVIEW" },
	{ x: 0.06, y: 0.58 },
	{ x: 0.2, y: 0.8 },
	{ x: 0.42, y: 0.91 },
	{ x: 0.66, y: 0.87 },
	{ x: 0.95, y: 0.4 },
	{ x: 0.62, y: 0.08 },
	{ x: 0.22, y: 0.16 },
	{ x: 0.06, y: 0.12 },
	{ x: 0.9, y: 0.88 },
	{ x: 0.27, y: 0.63 },
	{ x: 0.73, y: 0.35 },
	{ x: 0.68, y: 0.69 },
	{ x: 0.33, y: 0.33 },
];

const EDGES: [number, number][] = [
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 0],
	[0, 17],
	[0, 15],
	[0, 16],
	[0, 14],
	[12, 1],
	[12, 11],
	[11, 2],
	[11, 17],
	[1, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[8, 13],
	[13, 4],
	[4, 9],
	[9, 3],
	[3, 10],
	[10, 2],
	[6, 14],
	[8, 16],
	[15, 3],
	[17, 1],
];

const CHAIN = [1, 2, 3, 4, 0];
const LINK_RADIUS = 140;
const PULSE_MS = 1400;
const PULSE_EVERY_MS = 3200;
const VIEW = 440;

function readColor(name: string, fallback: string) {
	return (
		getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
		fallback
	);
}

function SignalCanvas() {
	const ref = useRef<HTMLCanvasElement>(null);
	const visible = usePageVisible();
	const { open: paletteOpen } = usePalette();
	const [inView, setInView] = useState(true);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const io = new IntersectionObserver(([e]) =>
			setInView(e?.isIntersecting ?? false),
		);
		io.observe(canvas);
		return () => io.disconnect();
	}, []);

	const running = visible && inView && !paletteOpen;

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx || !running) return;

		let size = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const resize = () => {
			size = canvas.clientWidth;
			canvas.width = size * dpr;
			canvas.height = size * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		let line = readColor("--color-accent-graphic", "#06b6d4");
		let glow = readColor("--color-accent-glow", "rgba(34,211,238,0.14)");
		const mo = new MutationObserver(() => {
			line = readColor("--color-accent-graphic", "#06b6d4");
			glow = readColor("--color-accent-glow", "rgba(34,211,238,0.14)");
		});
		mo.observe(document.documentElement, { attributeFilter: ["class"] });

		const target = { x: -9999, y: -9999 };
		const pointer = { x: -9999, y: -9999 };
		const host = canvas.parentElement ?? canvas;
		const onMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			target.x = e.clientX - rect.left;
			target.y = e.clientY - rect.top;
			if (pointer.x < -999) {
				pointer.x = target.x;
				pointer.y = target.y;
			}
		};
		const onLeave = () => {
			target.x = -9999;
			target.y = -9999;
			pointer.x = -9999;
			pointer.y = -9999;
		};
		host.addEventListener("pointermove", onMove);
		host.addEventListener("pointerleave", onLeave);

		const start = performance.now();
		let raf = 0;
		const draw = (now: number) => {
			ctx.clearRect(0, 0, size, size);
			pointer.x += (target.x - pointer.x) * 0.2;
			pointer.y += (target.y - pointer.y) * 0.2;

			ctx.lineWidth = 1;
			for (const node of NODES) {
				const nx = node.x * size;
				const ny = node.y * size;
				const d = Math.hypot(pointer.x - nx, pointer.y - ny);
				if (d > LINK_RADIUS) continue;
				const a = 1 - d / LINK_RADIUS;
				ctx.globalAlpha = a * 0.7;
				ctx.strokeStyle = line;
				ctx.beginPath();
				ctx.moveTo(nx, ny);
				ctx.lineTo(pointer.x, pointer.y);
				ctx.stroke();
				ctx.globalAlpha = a;
				ctx.fillStyle = line;
				ctx.beginPath();
				ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
				ctx.fill();
			}

			const t = ((now - start) % PULSE_EVERY_MS) / PULSE_MS;
			if (t <= 1) {
				const segs = CHAIN.length - 1;
				const pos = t * segs;
				const seg = Math.min(Math.floor(pos), segs - 1);
				const local = pos - seg;
				const a = NODES[CHAIN[seg] ?? 0] as Node;
				const b = NODES[CHAIN[seg + 1] ?? 0] as Node;
				const px = (a.x + (b.x - a.x) * local) * size;
				const py = (a.y + (b.y - a.y) * local) * size;

				ctx.globalAlpha = 1;
				ctx.fillStyle = glow;
				ctx.beginPath();
				ctx.arc(px, py, 9, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = line;
				ctx.beginPath();
				ctx.arc(px, py, 3, 0, Math.PI * 2);
				ctx.fill();

				for (let i = 0; i <= seg; i++) {
					const n = NODES[CHAIN[i] ?? 0] as Node;
					const since = (pos - i) / segs;
					if (since < 0 || since > 0.35) continue;
					const p = since / 0.35;
					ctx.globalAlpha = (1 - p) * 0.6;
					ctx.strokeStyle = line;
					ctx.beginPath();
					ctx.arc(n.x * size, n.y * size, 4 + p * 14, 0, Math.PI * 2);
					ctx.stroke();
				}
			}
			ctx.globalAlpha = 1;
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			mo.disconnect();
			host.removeEventListener("pointermove", onMove);
			host.removeEventListener("pointerleave", onLeave);
		};
	}, [running]);

	return (
		<canvas aria-hidden className="absolute inset-0 size-full" ref={ref} />
	);
}

function SignalGraph() {
	return (
		<svg
			aria-hidden="true"
			className="absolute inset-0 size-full"
			preserveAspectRatio="xMidYMid slice"
			viewBox={`0 0 ${VIEW} ${VIEW}`}
		>
			<g opacity={0.35} stroke="var(--color-accent-graphic)" strokeWidth={1}>
				{EDGES.map(([a, b]) => {
					const na = NODES[a] as Node;
					const nb = NODES[b] as Node;
					return (
						<line
							key={`${a}-${b}`}
							vectorEffect="non-scaling-stroke"
							x1={na.x * VIEW}
							x2={nb.x * VIEW}
							y1={na.y * VIEW}
							y2={nb.y * VIEW}
						/>
					);
				})}
			</g>
			<circle
				cx={VIEW / 2}
				cy={VIEW / 2}
				fill="none"
				opacity={0.5}
				r={76}
				stroke="var(--color-accent-graphic)"
				strokeDasharray="2 6"
			/>
			{NODES.slice(1).map((n) => (
				<g key={`${n.x}-${n.y}`}>
					<circle
						cx={n.x * VIEW}
						cy={n.y * VIEW}
						fill={n.label ? "var(--color-bg)" : "var(--color-accent-graphic)"}
						r={n.label ? 4 : 2.5}
						stroke={n.label ? "var(--color-accent-graphic)" : undefined}
						strokeWidth={1.5}
					/>
					{n.label && (
						<text
							className="max-lg:hidden"
							fill="var(--color-fg-muted)"
							fontFamily="var(--font-mono)"
							fontSize={12}
							letterSpacing="0.04em"
							textAnchor={n.x > 0.5 ? "end" : "start"}
							x={n.x * VIEW + (n.x > 0.5 ? -10 : 10)}
							y={n.y * VIEW + (n.y < 0.2 ? 20 : -10)}
						>
							{n.label}
						</text>
					)}
				</g>
			))}
		</svg>
	);
}

export function SignalFigure() {
	const reduce = useReducedMotion();
	const fine = useFinePointer();
	const large = useMediaQuery("(min-width: 1024px)");

	return (
		<figure className="relative mx-auto h-40 w-full overflow-hidden rounded-lg border border-border bg-bg-subtle/60 lg:aspect-square lg:h-auto lg:max-w-[440px]">
			<SignalGraph />
			{large && fine && !reduce && <SignalCanvas />}
			<div className="absolute inset-0 grid place-items-center">
				<SwapAvatar
					className="size-[88px] lg:size-[120px]"
					priority
					sizes="(min-width: 1024px) 120px, 88px"
				/>
			</div>
			<figcaption className="sr-only">
				Decorative evidence-chain graph around Bharath&apos;s portrait.
			</figcaption>
		</figure>
	);
}
