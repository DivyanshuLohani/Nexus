export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:items-center sm:px-8 text-sm text-gray-500">
      <div>
        <p className="font-medium text-black">Nexus</p>
        <p>© {new Date().getFullYear()} Nexus. Monochromatic Precision.</p>
      </div>

      <div className="flex gap-4 sm:gap-6 flex-wrap">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="https://github.com/DivyanshuLohani/Nexus">Github</a>
        <a href="https://x.com/DivyanshuLohani">Twitter</a>
      </div>
    </footer>
  );
}
