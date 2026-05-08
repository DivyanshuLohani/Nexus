export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-card-foreground">
          <section>
            <h2 className="font-semibold text-foreground mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By using Nexus, you agree to these terms. If you do not agree, you
              may not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">
              2. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the security of your account
              and any activity under it.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">
              3. Acceptable Use
            </h2>
            <p>
              You agree not to use the service for illegal, harmful, or abusive
              purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">4. Content</h2>
            <p>
              You retain ownership of your content, but grant us permission to
              display it as part of the service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold  mb-2">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold  mb-2">6. Disclaimer</h2>
            <p>
              The service is provided &ldquo;as is&ldquo; without warranties of
              any kind.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">7. Contact</h2>
            <p>For questions, contact divyanshu@divyanshulohani.xyz</p>
          </section>
        </div>
      </div>
    </main>
  );
}
