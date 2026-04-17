"use client";

import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-8xl font-bold text-border mb-4">404</p>
          <h1 className="text-2xl font-bold mb-3">Page not found</h1>
          <p className="text-text-muted mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <Link href="/">
                <Home size={16} />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
