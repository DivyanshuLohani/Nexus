const faqs = [
  {
    q: "Can I change my plan anytime?",
    a: "Yes. Upgrade or downgrade whenever you want.",
  },
  {
    q: "Do you remove branding on Pro?",
    a: "Yes. Pro and Premium remove Nexus branding.",
  },
  {
    q: "Will custom domains be supported?",
    a: "Custom domains are planned for Premium.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="border border-border rounded-md p-6 bg-card"
          >
            <h3 className="font-semibold mb-2">{faq.q}</h3>

            <p className="text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
