import Container from "@/components/layout/Container";
import SectionHeading from "@/components/SectionHeading";

export default function PrivacyPage() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading title="Privacy Policy" subtitle="How we handle your data" />
        <div className="mx-auto mt-12 max-w-2xl space-y-6 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
          <p>
            This website uses cookies to enhance your browsing experience, analyze site traffic, and
            personalize content. Cookies are small text files stored on your device when you visit the site.
          </p>
          <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
          <p>
            We may collect basic analytics data such as pages visited, time spent on site, and referral
            sources. No personally identifiable information is collected without your explicit consent.
          </p>
          <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
          <p>
            You can accept or reject cookies via the consent modal shown on your first visit. You can
            change your preference at any time using the &quot;Cookie settings&quot; link in the footer.
          </p>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>
            If you have questions about this policy, please reach out via the{" "}
            <a href="/contact" className="text-primary underline underline-offset-2">contact page</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
