interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "tertiary";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    type = "button",
    onClick,
    className,
}: ButtonProps) {
    const base = "w-full py-3 text-body-sm font-medium rounded-sharp border-none cursor-pointer transition-opacity duration-150";

    const variants = {
        primary: "bg-inverse-surface text-inverse-primary hover:opacity-85",
        secondary: "bg-surface-highest text-on-surface hover:bg-surface-high",
        tertiary: "bg-transparent text-tertiary hover:opacity-80",
    };

    return (
        <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className ?? ""}`}>
            {children}
        </button>
    );
}