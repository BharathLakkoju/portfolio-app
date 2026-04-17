"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Phase = "idle" | "covering" | "uncovering";

type TransitionContextType = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");

  // Store target href and the pathname at the time navigation was triggered
  const pendingHref = useRef<string | null>(null);
  const prevPathname = useRef(pathname);
  // Track whether router.push has been called (covering animation done)
  const pushedRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (phase !== "idle") return;
      pendingHref.current = href;
      pushedRef.current = false;
      setPhase("covering");
    },
    [phase],
  );

  // After covering animation completes → push route
  const handleCoveringComplete = useCallback(() => {
    if (pendingHref.current) {
      router.push(pendingHref.current);
      pendingHref.current = null;
      pushedRef.current = true;
    }
  }, [router]);

  // Detect pathname change after router.push → start uncovering
  useEffect(() => {
    if (
      phase === "covering" &&
      pushedRef.current &&
      pathname !== prevPathname.current
    ) {
      prevPathname.current = pathname;
      setPhase("uncovering");
    }
  }, [pathname, phase]);

  // Safety valve: if page never changes (same route / error), force exit after 3 s
  useEffect(() => {
    if (phase === "idle") return;
    const id = setTimeout(() => {
      prevPathname.current = pathname;
      setPhase("idle");
    }, 3000);
    return () => clearTimeout(id);
  }, [phase, pathname]);

  const handleUncoveringComplete = useCallback(() => {
    setPhase("idle");
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {phase !== "idle" && (
        <motion.div
          key="page-transition-overlay"
          className="fixed inset-0 z-9999 overflow-hidden bg-background"
          aria-hidden
          initial={{ y: "100%" }}
          animate={{ y: phase === "covering" ? "0%" : "-100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={
            phase === "covering"
              ? handleCoveringComplete
              : handleUncoveringComplete
          }
        >
          {/* ── Dot-grid background ── */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.06]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.5" cy="1.5" r="1.5" fill="#06b6d4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* ── Diagonal accent lines ── */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={`${(i / 12) * 130 - 15}%`}
                y1="0%"
                x2={`${(i / 12) * 130 - 15 + 40}%`}
                y2="100%"
                stroke="#06b6d4"
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* ── Glow orbs ── */}
          <motion.div
            className="absolute -left-40 -top-40 h-96 w-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          />

          {/* ── Expanding ripple rings ── */}
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border border-accent/20"
              style={{ translateX: "-50%", translateY: "-50%" }}
              initial={{ width: 80, height: 80, opacity: 0.6 }}
              animate={{
                width: 500 + i * 160,
                height: 500 + i * 160,
                opacity: 0,
              }}
              transition={{
                duration: 1.1,
                delay,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            />
          ))}

          {/* ── Center logo ── */}
          <div className="absolute inset-0 flex items-center justify-center select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={72}
                height={72}
                className="opacity-60"
              />
            </motion.div>
          </div>

          {/* ── Corner brackets ── */}
          {(
            [
              { pos: "top-5 left-5", rotate: "0deg" },
              { pos: "top-5 right-5", rotate: "90deg" },
              { pos: "bottom-5 right-5", rotate: "180deg" },
              { pos: "bottom-5 left-5", rotate: "270deg" },
            ] as const
          ).map(({ pos, rotate }, i) => (
            <motion.svg
              key={i}
              className={`absolute ${pos} text-accent/30`}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ rotate }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
            >
              <path
                d="M1 11V1H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ))}

          {/* ── Bottom accent sweep line ── */}
          {/* <motion.div
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          /> */}
        </motion.div>
      )}
    </TransitionContext.Provider>
  );
}
