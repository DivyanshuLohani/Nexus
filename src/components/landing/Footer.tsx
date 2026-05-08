export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:items-center sm:px-8 text-sm text-muted-foreground">
      <div>
        <p className="font-medium text-foreground">Nexus</p>
        <p>© {new Date().getFullYear()} Nexus. Monochromatic Precision.</p>
      </div>

      <div className="flex gap-4 sm:gap-6 flex-wrap">
        <a href="/terms" className="hover:text-foreground transition">
          Terms
        </a>
        <a href="/privacy" className="hover:text-foreground transition">
          Privacy
        </a>
        <a href="/support" className="hover:text-foreground transition">
          Support
        </a>
        <a href="/feedback" className="hover:text-foreground transition">
          Feedback
        </a>
        <a
          href="https://github.com/DivyanshuLohani/Nexus"
          className="hover:text-foreground transition"
        >
          Github
        </a>
        <a
          href="https://x.com/DivyanshuLohani"
          className="hover:text-foreground transition"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
}
