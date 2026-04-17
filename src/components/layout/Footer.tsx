import { TransitionLink as Link } from "~/components/shared/TransitionLink";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "~/components/shared/Icons";
import { profile } from "~/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand + nav */}
          <div className="flex flex-col gap-2.5">
            <Link
              href="/"
              className="text-sm font-semibold text-text-primary hover:text-accent transition-colors w-fit"
            >
              Bharath Lakkoju
            </Link>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-text-muted hover:text-text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        <p className="mt-6 text-[10px] text-text-muted border-t border-border pt-5">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
