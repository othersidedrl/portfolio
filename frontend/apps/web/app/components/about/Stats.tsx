import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import type { ComponentType } from "react";

type StatsProps = {
  linkedin?: string;
  github?: string;
  available?: boolean;
};

type SocialLink = {
  label: string;
  href?: string;
  description: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
};

const hasLink = (link?: string) => Boolean(link && link.trim().length > 0);

export const Stats = ({
  linkedin = "https://www.linkedin.com/in/grapheel-darel-pandey",
  github = "https://github.com/othersidedrl",
  available = true,
}: StatsProps = {}) => {
  const socialLinks: SocialLink[] = [
    {
      label: "LinkedIn",
      href: linkedin,
      description: "Connect for career updates, mentoring, and product collaborations.",
      icon: SiLinkedin,
    },
    {
      label: "GitHub",
      href: github,
      description: "Explore open-source work, experiments, and backend sandboxes.",
      icon: SiGithub,
    },
  ];

  const statusCopy = available
    ? {
        title: "Currently available",
        description: "Open to remote-friendly collaborations and roles.",
        badge: "Online",
        accent: "text-[var(--color-primary)]",
        icon: CheckCircle2,
      }
    : {
        title: "Booked at the moment",
        description: "Reach out to discuss future availability.",
        badge: "Heads up",
        accent: "text-[var(--text-muted)]",
        icon: Clock3,
      };

  const StatusIcon = statusCopy.icon;

  return (
    <section className="mt-12 w-full">
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-dark)] p-[1px] shadow-[0_30px_70px_var(--shadow-color)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-primary)/18%,_transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-8 rounded-[26px] bg-[var(--bg-mid)] px-8 py-10 sm:px-12">
          <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
                Stay connected
              </p>
              <h2 className="text-3xl font-semibold text-[var(--text-strong)] sm:text-[36px]">
                Let&apos;s collaborate
              </h2>
              <p className="text-[var(--text-normal)]">
                Choose a channel below or check my availability status.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-light)] px-5 py-3 text-sm font-semibold text-[var(--text-strong)]">
              <span className="relative flex h-3 w-3 items-center justify-center">
                {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary)] opacity-60" /> */}
                <span className="relative inline-flex h-[12px] w-[12px] rounded-full bg-[var(--color-primary)] animate-pulse" />
              </span>
              {available ? "Available now" : "Temporarily booked"}
            </div>
          </header>

          <div className="grid gap-5 lg:grid-cols-3">
            <article className="flex flex-col gap-4 rounded-[22px] border border-[var(--border-color)] bg-[var(--bg-light)] p-6 shadow-[0_15px_35px_var(--shadow-color)]">
              <div className="flex items-center gap-3 text-[var(--text-strong)]">
                <StatusIcon size={20} className={`text-[var(--color-primary)] ${statusCopy.accent}`} />
                <span className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Status
                </span>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[var(--text-strong)]">
                  {statusCopy.title}
                </p>
                <p className="mt-2 text-[var(--text-normal)]">{statusCopy.description}</p>
              </div>
              <span className={`inline-flex items-center gap-2 text-sm font-medium ${statusCopy.accent}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {statusCopy.badge}
              </span>
            </article>

            {socialLinks.map(({ label, href, description, icon: Icon }) => (
              <article
                key={label}
                className="group flex h-full flex-col justify-between rounded-[22px] border border-[var(--border-color)] bg-[var(--bg-mid)] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)]/60 hover:bg-[var(--bg-light)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--text-strong)]">
                    <Icon size={20} className="text-[var(--color-primary)]" />
                    <span className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      {label}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-[var(--text-normal)]">
                    {description}
                  </p>
                </div>
                <a
                  href={href ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!hasLink(href)}
                  tabIndex={hasLink(href) ? 0 : -1}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all ${
                    hasLink(href)
                      ? "text-[var(--color-primary)] hover:gap-3"
                      : "cursor-not-allowed text-[var(--text-muted)]"
                  }`}
                >
                  Visit profile
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
