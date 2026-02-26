"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ServiceCard } from "../components/serviceCard";

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
          "An e-commerce marketplace connecting farmers, store owners, and consumers — integrated with third-party route optimization APIs and AI-based quality detection linked to pricing.",
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

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-red-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="font-semibold tracking-tight">
            Saiko<span className="text-red-600">Tech</span>{" "}
            <span className="text-gray-400">Solutions</span>
          </a>

          <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
            <a className="hover:text-red-700" href="#about">
              About
            </a>
            <a className="hover:text-red-700" href="#services">
              Services
            </a>
            <a className="hover:text-red-700" href="#projects">
              Projects
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* Hero (full screen) */}
      <section
        id="top"
        className="w-full min-h-screen border-b border-red-100 bg-gradient-to-br from-white via-red-50 to-white"
      >
        <div className="min-h-screen flex items-center">
          <div className="mx-auto w-full px-4 py-16">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <p className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-700">
                Innovation • Automation • Quality
              </p>

              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                We build software that’s reliable today — and scalable tomorrow.
              </h1>

              <p className="mt-4 max-w-2xl text-gray-600">
                SaikoTech Solutions partners with organizations to design,
                build, and automate systems that improve operations, reduce
                manual work, and deliver measurable outcomes.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition"
                >
                  View Projects
                </a>
                <a
                  href="#services"
                  className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-red-50 transition"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About (full screen) */}
      <section
        id="about"
        className="w-full min-h-screen border-b border-red-100 bg-white"
      >
        <div className="min-h-screen flex items-center">
          <div className="mx-auto w-full px-6 py-20">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">About</h2>

              <p className="mx-auto mt-6 text-gray-600">
                SaikoTech Solutions is a software development and automation
                partner based in the Philippines. We help local and
                international clients build systems that are secure, scalable,
                and aligned with real-world workflows — with dependable
                long-term support after launch.
              </p>

              <p className="mx-auto mt-6 text-gray-600">
                The name <span className="font-medium">Saiko</span> comes from
                the Japanese word <span className="italic">Saikō (最高)</span>,
                meaning “the best.” It reflects our commitment to delivering the
                highest standards in quality, service, and long-term partnership
                for every client we work with.
              </p>
            </div>

            <div className="mx-auto mt-14 w-full max-w-6xl">
              <div className="grid gap-6 md:grid-cols-3">
                <Card title="Customer-First Approach">
                  We design solutions around your real-world processes,
                  priorities, and long-term goals.
                </Card>

                <Card title="Innovation with Purpose">
                  We apply automation and technology where it creates measurable
                  impact and operational efficiency.
                </Card>

                <Card title="Long-Term Partnership">
                  We don’t disappear after launch — we provide maintenance,
                  improvements, and reliable after-service support.
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services (full screen) */}
      <section
        id="services"
        className="w-full min-h-screen border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50"
      >
        <div className="min-h-screen flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                  Services
                </h2>
                <p className="mt-3 text-gray-600">
                  End-to-end development and long-term support — from building
                  new products to improving, integrating, and maintaining
                  existing systems.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <ServiceCard
                title="Software Development"
                desc="Web and mobile applications built for performance, security, and long-term maintainability."
                bullets={[
                  "Internal tools & dashboards",
                  "Customer portals & platforms",
                  "Responsive web + cross-platform mobile",
                ]}
              />

              <ServiceCard
                title="Workflow Automation"
                desc="Automate processes to reduce manual work and speed up operations — for both new and existing workflows."
                bullets={[
                  "Process upgrade & modernization",
                  "Migration of manual workflows",
                  "Approvals, tracking, and reporting",
                ]}
              />

              <ServiceCard
                title="Systems Integration"
                desc="Connect systems and services through reliable APIs — including AI, gateways, analytics, hardware/IoT, and third-party platforms."
                bullets={[
                  "API design & integration",
                  "AI services & data pipelines",
                  "Gateways, devices, and external services",
                ]}
              />

              <ServiceCard
                title="Maintenance & Support"
                desc="Ongoing support for new or existing systems — fixes, monitoring, performance tuning, security updates, and enhancements."
                bullets={[
                  "Bug fixes & reliability improvements",
                  "Security patches & monitoring",
                  "Feature enhancements & scaling",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects (full screen) */}
      <section
        id="projects"
        className="w-full min-h-screen border-b border-red-100 bg-white"
      >
        <div className="min-h-screen flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Projects
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-red-100 bg-white p-6 hover:border-red-300 hover:shadow-lg transition"
                >
                  <div className="mb-4 overflow-hidden rounded-xl border border-red-100 bg-red-50">
                    {p.imageSrc ? (
                      <Image
                        src={p.imageSrc}
                        alt={p.imageAlt ?? p.name}
                        width={1600}
                        height={1000}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center text-sm text-gray-500">
                        Add screenshot: /public/your-image.png
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact (full screen) */}
      <section
        id="contact"
        className="w-full min-h-screen border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-red-50"
      >
        <div className="min-h-screen flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                Contact Us
              </h2>
              <p className="mt-3 text-gray-600">
                Tell us what you’re building. We’ll reply with the next steps
                and schedule a call with you.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <form
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
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="mt-2 w-full rounded-xl border border-red-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200"
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <button
                    disabled={status === "sending"}
                    className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60 transition"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>

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
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Global Footer (fixed placement) */}
      <footer className="border-t border-red-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SaikoTech Solutions. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-red-100 bg-white p-6 hover:border-red-300 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{children}</p>
    </div>
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
      <label className="text-sm font-medium">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </label>
      <input
        className="mt-2 w-full rounded-xl border border-red-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200"
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
