// Features.tsx
import { BarChart2, PenTool, Palette } from "lucide-react";

export default function Features() {
    const items = [
        {
            icon: <PenTool size={18} />,
            title: "Live Editor",
            desc: "Intuitive point-and-click interface. See your profile transform in real-time as you curate your digital gallery.",
        },
        {
            icon: <BarChart2 size={18} />,
            title: "Analytics",
            desc: "Deep insights into your audience behavior. Understand which connections matter most with our surgical data reporting.",
        },
        {
            icon: <Palette size={18} />,
            title: "Design Control",
            desc: "Absolute authority over your aesthetic. No unnecessary shadows or clutter—just pure, monochromatic precision.",
        },
    ];

    return (
        <section className="border-b">

            <div className="px-10 py-12">
                <p className="text-xs tracking-widest text-gray-500">
                    THE ARCHITECTURE
                </p>

                <h2 className="text-3xl font-bold mt-2">
                    ENGINEERED FOR IMPACT
                </h2>
            </div>

            <div className="grid md:grid-cols-3 border-t">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="p-8 border-r last:border-r-0 border-black"
                    >
                        <div className="w-8 h-8 bg-black text-white flex items-center justify-center mb-4">
                            {item.icon}
                        </div>

                        <h3 className="font-semibold text-sm mb-2 uppercase tracking-wide">
                            {item.title}
                        </h3>

                        <p className="text-sm text-gray-600">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}