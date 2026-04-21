# Nexus — Link-in-Bio Builder

A minimal, modern link-in-bio platform with real-time editing, analytics, and deep customization. Built for creators who want full control without an overcrowded interface.

---

## Features

**Live Editor**
Real-time editing with instant preview. Changes sync automatically — no save button required.

**Appearance Customization**
Choose from solid colors or gradients, with light/dark adaptive text. Three icon styles are available: Colored (brand icons), Filled (glass UI), and Minimal (monochrome).

**Smart Links**
Auto-detects platform icons for services like Instagram and GitHub. Links render with a glass-style UI and hover effects, with drag-and-drop reordering.

**Analytics**
Tracks page views with time-based charts and a recent visitor log showing IP, referrer, and device.

**Profile & Branding**
Upload a profile image, set a custom page title and subtitle, and publish a clean public-facing page.

---

## Tech Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Frontend | Next.js 16, React, Tailwind CSS |
| Backend  | Next.js Server Actions          |
| Database | PostgreSQL with Drizzle ORM     |
| Auth     | Better Auth                     |
| UI       | Custom components, Lucide Icons |

---

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/DivyanshuLohani/Nexus
cd Nexus
```

**2. Install dependencies**

```bash
npm install # or bun install if you're the cool ones
```

**3. Configure environment variables**

Copy the .env.example file and rename it to .env.local or .env

Fill in the appropriate details

**4. Start the development server**

```bash
npm run dev
```

---

## Roadmap

- Custom domain support
- Per-link click analytics
- Theme marketplace
- Social share cards
- QR code generation

---

## Contributing

Contributions are welcome. Fork the repository, create a feature branch, and open a pull request.

---

## License

MIT

---

## Author

Built by [Divyanshu Lohani](https://divyanshulohani.xyz)
