"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Briefcase, Github, Linkedin, Mail } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.project.trim()) e.project = "Project details are required.";
    else if (form.project.length > 3000) e.project = "Project details must be under 3000 characters.";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!executeRecaptcha) {
      setSubmitError("Security check is not ready yet. Please try again in a moment.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const token = await executeRecaptcha("contact_form_submit");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          token,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Failed to send request." }));
        throw new Error(data.error || "Failed to send request.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (submitError) setSubmitError("");
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-card px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring/20 transition-shadow";

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Let's build something great" subtitle="I'd love to hear about your project. Fill out the form or reach out directly." />
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal delay={40}>
            <div>
              {submitted ? (
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                  <p className="text-2xl font-semibold text-foreground">Thank you</p>
                  <p className="mt-3 text-sm text-muted-foreground">Your message has been received. I&apos;ll get back to you within 1-2 business days.</p>
                </div>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Name</label>
                    <input id="name" type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} placeholder="Your name" maxLength={100} />
                    {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Email</label>
                    <input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} placeholder="you@example.com" maxLength={255} />
                    {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                      <label htmlFor="project" className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Project</label>
                      <textarea id="project" rows={6} value={form.project} onChange={(e) => handleChange("project", e.target.value)} className={`${inputClass} resize-none`} placeholder="Tell me about your project..." maxLength={3000} />
                      {errors.project && <p className="mt-1.5 text-xs text-destructive">{errors.project}</p>}
                    </div>
                    {submitError && <p className="text-xs text-destructive">{submitError}</p>}
                    <button type="submit" disabled={isSubmitting} className="btn-hover inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
                      {isSubmitting ? "Sending..." : "Send message"} <ArrowRight className="h-4 w-4" />
                    </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">Other ways to reach me</p>
                <div className="space-y-4">
                  <a href="mailto:pavel.pogulailo@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"><Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} /> pavel.pogulailo@gmail.com</a>
                  <a href="https://www.linkedin.com/in/pogulailopavel/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"><Linkedin className="h-4 w-4 shrink-0" strokeWidth={1.5} /> LinkedIn</a>
                  <a href="https://github.com/ppogulailo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"><Github className="h-4 w-4 shrink-0" strokeWidth={1.5} /> GitHub</a>
                  <a href="https://www.upwork.com/freelancers/pavelp48" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"><Briefcase className="h-4 w-4 shrink-0" strokeWidth={1.5} /> Upwork</a>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  I typically respond within <span className="font-medium text-foreground">1-2 business days</span>. For urgent inquiries, feel free to reach out directly via email.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
