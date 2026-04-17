"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { AnimatedSection } from "~/components/shared/AnimatedSection";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { profile } from "~/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const links = [
    {
      href: `mailto:${profile.email}`,
      icon: <Mail size={14} />,
      label: "Email",
      value: profile.email,
      external: false,
    },
    {
      href: profile.github,
      icon: <GithubIcon size={14} />,
      label: "GitHub",
      value: "github.com/BharathLakkoju",
      external: true,
    },
    {
      href: profile.linkedin,
      icon: <LinkedinIcon size={14} />,
      label: "LinkedIn",
      value: "linkedin.com/in/bharathlakkoju",
      external: true,
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-12">

        {/* ── Header ── */}
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Get in touch
          </h1>
          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            Open to full-time roles, contract work, and interesting
            collaborations. Drop a message and I&apos;ll reply within 24 hours.
          </p>
        </AnimatedSection>

        {/* ── Two-col layout ── */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 border-t border-border pt-10">

          {/* Left — contact links + availability */}
          <AnimatedSection delay={0.05} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {links.map(({ href, icon, label, value, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 hover:border-accent/40 transition-colors duration-200"
                >
                  <span className="text-text-muted group-hover:text-accent transition-colors">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-text-muted mb-0.5">
                      {label}
                    </p>
                    <p className="text-xs font-medium text-text-secondary group-hover:text-accent transition-colors truncate">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability pill */}
            <div className="rounded-lg border border-accent/20 bg-accent-subtle px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <p className="text-xs font-semibold text-text-primary">
                  Available for work
                </p>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Open to remote roles globally. Based in Hyderabad, India.
              </p>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection delay={0.1}>
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-70 rounded-lg border border-accent/20 bg-surface p-6 text-center gap-3"
              >
                <CheckCircle2 size={32} className="text-success" />
                <div>
                  <p className="text-sm font-semibold mb-1">Message sent!</p>
                  <p className="text-xs text-text-secondary">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-border bg-surface p-5 space-y-4"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-[11px] font-medium text-text-secondary"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-[11px] font-medium text-text-secondary"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, email: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-[11px] font-medium text-text-secondary"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, message: e.target.value }))
                    }
                    className="min-h-30"
                  />
                </div>

                {formState === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 text-xs text-error"
                  >
                    <XCircle size={13} />
                    Something went wrong — email me directly instead.
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="sm"
                  className="w-full"
                  disabled={formState === "loading"}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      Send message
                    </>
                  )}
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
