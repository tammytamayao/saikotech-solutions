"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
  MotionConfig,
} from "framer-motion";

type Project = {
  name: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  imageAlt?: string;
};

export default function HomePage() {
  const projects: Project[] = useMemo(
    () => [
      {
        name: "CMD UnliFiberMax (Mobile App)",
        description:
          "A mobile application for monitoring and managing billing and payments, with integrated payment gateways and real-time customer support communication.",
        tags: ["Mobile", "Billing", "Payments", "Gateway"],
        imageSrc: "/cmd-unlifibermax.png",
        imageAlt: "Screenshot of CMD UnliFiberMax mobile billing app",
      },
      {
        name: "CMD Admin (Web App)",
        description:
          "A web-based back-office system for subscriber management, billing oversight, operational monitoring, and automation of daily admin workflows.",
        tags: ["Web", "Admin", "Automation", "CRM"],
        imageSrc: "/cmd-admin-system.png",
        imageAlt: "Screenshot of CMD Admin System web back-office",
      },
      {
        name: "Green Chain+ (Mobile App)",
        description:
          "An e-commerce marketplace integrated with third-party route optimization APIs and AI-based quality detection linked to pricing.",
        tags: ["E-Commerce", "AI", "API", "Logistics"],
        imageSrc: "/green-chain-plus.jpg",
        imageAlt: "Screenshot of Green Chain+ mobile e-commerce app",
      },
    ],
    [],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) setErrMsg(err.message);
      else setErrMsg("Something went wrong.");
    }
  }

  const reduceMotion = useReducedMotion();

  const sectionVariants: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    show: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
  };

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: (i: number) =>
      reduceMotion
        ? { opacity: 1 }
        : {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: "easeOut", delay: i * 0.03 },
          },
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-white text-gray-800">
        {/* Top bar */}
        <header className="sticky top-0 z-50 border-b border-red-100 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
            <a href="#top" className="font-semibold tracking-[-0.01em]">
              Saiko<span className="text-red-600">Tech</span>{" "}
              <span className="text-gray-400">Solutions</span>
            </a>

            <nav className="hidden gap-6 text-sm text-gray-500 md:flex">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#projects">Projects</NavLink>
            </nav>

            <motion.a
              href="#contact"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-red-700"
            >
              Contact Us
            </motion.a>
          </div>
        </header>

        {/* Hero (full screen) */}
        <MotionSection
          id="top"
          className="w-full min-h-screen border-b border-red-100 bg-gradient-to-br from-white via-red-50 to-white"
          variants={sectionVariants}
        >
          <div className="flex min-h-screen items-center">
            <div className="mx-auto w-full px-4 py-16">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="mx-auto flex max-w-4xl flex-col items-center text-center"
              >
                <motion.p
                  variants={cardVariants}
                  custom={0}
                  className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-medium tracking-wide text-red-700"
                >
                  Innovation • Automation • Quality
                </motion.p>

                <motion.h1
                  variants={cardVariants}
                  custom={1}
                  className="mt-4 text-h1 font-semibold text-gray-800"
                >
                  We build software that’s reliable today — and scalable
                  tomorrow.
                </motion.h1>

                {/* <motion.p
                  variants={cardVariants}
                  custom={2}
                  className="mt-4 max-w-2xl text-body text-gray-500"
                >
                  SaikoTech Solutions partners with organizations to design,
                  build, and automate systems that improve operations, reduce
                  manual work, and deliver measurable outcomes.
                </motion.p> */}

                <motion.div
                  variants={cardVariants}
                  custom={3}
                  className="mt-8 flex flex-wrap justify-center gap-3"
                >
                  <motion.a
                    href="#projects"
                    whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-red-700"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    href="#services"
                    whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-red-50"
                  >
                    Explore Services
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </MotionSection>

        {/* About (full screen) */}
        <MotionSection
          id="about"
          className="w-full min-h-screen border-b border-red-100 bg-white"
          variants={sectionVariants}
        >
          <div className="flex min-h-screen items-center">
            <div className="mx-auto w-full px-6 py-20">
              <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-h2 font-semibold text-gray-800">About</h2>

                <p className="mx-auto mt-6 text-body text-gray-500">
                  The name{" "}
                  <span className="font-medium text-gray-700">Saiko</span> comes
                  from the Japanese word{" "}
                  <span className="italic">Saikō (最高)</span>, meaning “the
                  best.” It reflects our commitment to delivering the highest
                  standards in quality, service, and long-term partnership. We
                  help companies design and build systems that improve
                  operations, reduce manual work, and deliver measurable
                  outcomes.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="mx-auto mt-14 w-full max-w-6xl"
              >
                <div className="grid gap-6 md:grid-cols-3">
                  <MotionCard
                    title="Customer-First Approach"
                    variants={cardVariants}
                    custom={0}
                  >
                    We design solutions around your real-world processes,
                    priorities, and long-term goals.
                  </MotionCard>

                  <MotionCard
                    title="Innovation with Purpose"
                    variants={cardVariants}
                    custom={1}
                  >
                    We apply automation and technology where it creates
                    measurable impact and operational efficiency.
                  </MotionCard>

                  <MotionCard
                    title="Long-Term Partnership"
                    variants={cardVariants}
                    custom={2}
                  >
                    We don’t disappear after launch — we provide maintenance,
                    improvements, and reliable after-service support.
                  </MotionCard>
                </div>
              </motion.div>
            </div>
          </div>
        </MotionSection>

        {/* Services (full screen) */}
        <MotionSection
          id="services"
          className="w-full min-h-screen border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50"
          variants={sectionVariants}
        >
          <div className="flex min-h-screen items-center">
            <div className="mx-auto w-full max-w-6xl px-4 py-16">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-h2 font-semibold text-gray-800">
                    Services
                  </h2>
                  <p className="mt-3 text-body text-gray-500">
                    End-to-end development and long-term support — from building
                    new products to improving, integrating, and maintaining
                    existing systems.
                  </p>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-10 grid gap-5 md:grid-cols-2"
              >
                <ServiceCard
                  title="Software Development"
                  desc="Web and mobile applications built for performance, security, and long-term maintainability."
                  bullets={[
                    "Internal tools & dashboards",
                    "Customer portals & platforms",
                    "Responsive web + cross-platform mobile",
                  ]}
                  variants={cardVariants}
                  custom={0}
                />

                <ServiceCard
                  title="Workflow Automation"
                  desc="Automate processes to reduce manual work and speed up operations — for both new and existing workflows."
                  bullets={[
                    "Process upgrade & modernization",
                    "Migration of manual workflows",
                    "Approvals, tracking, and reporting",
                  ]}
                  variants={cardVariants}
                  custom={1}
                />

                <ServiceCard
                  title="Systems Integration"
                  desc="Connect systems and services through reliable APIs — including AI, gateways, analytics, hardware/IoT, and third-party platforms."
                  bullets={[
                    "API design & integration",
                    "AI services & data pipelines",
                    "Gateways, devices, and external services",
                  ]}
                  variants={cardVariants}
                  custom={2}
                />

                <ServiceCard
                  title="Maintenance & Support"
                  desc="Ongoing support for new or existing systems — fixes, monitoring, performance tuning, security updates, and enhancements."
                  bullets={[
                    "Bug fixes & reliability improvements",
                    "Security patches & monitoring",
                    "Feature enhancements & scaling",
                  ]}
                  variants={cardVariants}
                  custom={3}
                />
              </motion.div>
            </div>
          </div>
        </MotionSection>

        {/* Projects (full screen) */}
        <MotionSection
          id="projects"
          className="w-full min-h-screen border-b border-red-100 bg-white"
          variants={sectionVariants}
        >
          <div className="flex min-h-screen items-center">
            <div className="mx-auto w-full max-w-6xl px-4 py-14">
              <h2 className="text-h2 font-semibold text-gray-800">Projects</h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-8 grid gap-4 md:grid-cols-3"
              >
                {projects.map((p, idx) => (
                  <motion.div
                    key={p.name}
                    variants={cardVariants}
                    custom={idx}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className="rounded-2xl border border-red-100 bg-white p-6 transition hover:border-red-300 hover:shadow-lg"
                  >
                    <div className="mb-4 overflow-hidden rounded-xl border border-red-100 bg-red-50">
                      {p.imageSrc ? (
                        <div className="relative h-44 w-full">
                          <motion.div
                            whileHover={
                              reduceMotion ? undefined : { scale: 1.04 }
                            }
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="h-44 w-full"
                          >
                            <Image
                              src={p.imageSrc}
                              alt={p.imageAlt ?? p.name}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </div>
                      ) : (
                        <div className="flex h-44 items-center justify-center text-sm text-gray-500">
                          Add screenshot: /public/your-image.png
                        </div>
                      )}
                    </div>

                    <h3 className="text-h3 font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-body text-gray-500">
                      {p.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-medium tracking-wide text-red-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </MotionSection>

        {/* Contact (full screen) */}
        <MotionSection
          id="contact"
          className="w-full min-h-screen border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50"
          variants={sectionVariants}
        >
          <div className="flex min-h-screen items-center">
            <div className="mx-auto w-full max-w-6xl px-4 py-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-h2 font-semibold text-gray-800">
                  Contact Us
                </h2>
                <p className="mt-3 text-body text-gray-500">
                  Tell us what you’re building. We’ll reply with the next steps
                  and schedule a call with you.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-3xl">
                <motion.form
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onSubmit={onSubmit}
                  className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm"
                >
                  <div className="grid gap-4">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      required
                    />
                    <Field
                      label="Company (optional)"
                      value={form.company}
                      onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-800">
                        Message
                      </label>
                      <textarea
                        className="mt-2 w-full rounded-xl border border-red-100 px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-red-200"
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        required
                      />
                    </div>

                    <motion.button
                      disabled={status === "sending"}
                      whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                      className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-red-700 disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </motion.button>

                    {status === "sent" && (
                      <p className="text-sm text-emerald-700">
                        Message sent! We’ll get back to you soon.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-sm text-red-700">
                        {errMsg ?? "Failed to send. Please try again."}
                      </p>
                    )}
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Global Footer */}
        <footer className="border-t border-red-100 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SaikoTech Solutions. All rights
            reserved.
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative text-sm text-gray-500 transition hover:text-red-700"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full" />
      </span>
    </a>
  );
}

function MotionSection({
  id,
  className,
  variants,
  children,
}: {
  id: string;
  className: string;
  variants: Variants;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}

function MotionCard({
  title,
  children,
  variants,
  custom,
}: {
  title: string;
  children: React.ReactNode;
  variants: Variants;
  custom: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={variants}
      custom={custom}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="rounded-2xl border border-red-100 bg-white p-6 transition hover:border-red-300 hover:shadow-lg"
    >
      <h3 className="text-h3 font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-body text-gray-500">{children}</p>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </label>
      <input
        className="mt-2 w-full rounded-xl border border-red-100 px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-red-200"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  bullets,
  variants,
  custom,
}: {
  title: string;
  desc: string;
  bullets: string[];
  variants: Variants;
  custom: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={variants}
      custom={custom}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="rounded-2xl border border-red-100 bg-white p-6 transition hover:border-red-300 hover:shadow-lg"
    >
      <h3 className="text-h3 font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-body text-gray-500">{desc}</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
