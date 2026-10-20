"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { duration, ease } from "~/lib/motion";

type Tone = "success" | "danger" | "info";

type Toast = {
	id: number;
	message: string;
	tone: Tone;
	action?: { label: string; href: string };
};

type ToastInput = Omit<Toast, "id">;

const ToastContext = createContext<(toast: ToastInput) => void>(() => {});

export function useToast() {
	return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const nextId = useRef(0);

	const dismiss = useCallback((id: number) => {
		setToasts((list) => list.filter((t) => t.id !== id));
	}, []);

	const push = useCallback((toast: ToastInput) => {
		nextId.current += 1;
		const id = nextId.current;
		setToasts((list) => [...list.slice(-1), { ...toast, id }]);
	}, []);

	const value = useMemo(() => push, [push]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<ol
				aria-label="Notifications"
				className="pointer-events-none fixed inset-x-0 bottom-0 z-[var(--z-toast)] flex flex-col items-center gap-2 p-4 pb-[calc(max(0.75rem,env(safe-area-inset-bottom))+76px)]"
			>
				<AnimatePresence initial={false}>
					{toasts.map((toast) => (
						<ToastItem key={toast.id} onDismiss={dismiss} toast={toast} />
					))}
				</AnimatePresence>
			</ol>
		</ToastContext.Provider>
	);
}

const icons = { success: CheckCircle2, danger: XCircle, info: Info };

function ToastItem({
	toast,
	onDismiss,
}: {
	toast: Toast;
	onDismiss: (id: number) => void;
}) {
	const [paused, setPaused] = useState(false);
	const Icon = icons[toast.tone];

	useEffect(() => {
		if (paused || toast.tone === "danger") return;
		const t = window.setTimeout(() => onDismiss(toast.id), 4000);
		return () => window.clearTimeout(t);
	}, [paused, toast, onDismiss]);

	return (
		<motion.li
			animate={{ opacity: 1, y: 0, x: 0 }}
			className="pointer-events-auto flex w-full max-w-[360px] items-center gap-3 rounded-md border border-border-strong bg-surface py-2 pr-2 pl-4 text-fg text-sm shadow-[var(--shadow-2)]"
			exit={{
				opacity: 0,
				x: 16,
				transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
			}}
			initial={{ opacity: 0, y: 16 }}
			layout
			onBlur={() => setPaused(false)}
			onFocus={() => setPaused(true)}
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			role={toast.tone === "danger" ? "alert" : "status"}
			transition={{ duration: duration.ui, ease: ease.out }}
		>
			<Icon
				aria-hidden
				className={
					toast.tone === "success"
						? "text-success"
						: toast.tone === "danger"
							? "text-danger"
							: "text-accent"
				}
				size={16}
			/>
			<span className="flex-1">{toast.message}</span>
			{toast.action && (
				<a
					className="rounded-sm px-2 py-1 font-medium text-accent hover:text-accent-hover"
					href={toast.action.href}
					rel="noopener"
					target="_blank"
				>
					{toast.action.label}
				</a>
			)}
			<button
				aria-label="Dismiss notification"
				className="grid size-11 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-2 hover:text-fg"
				onClick={() => onDismiss(toast.id)}
				type="button"
			>
				<X size={14} />
			</button>
		</motion.li>
	);
}
