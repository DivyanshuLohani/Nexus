interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "tertiary";
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    type = "button",
    onClick,
    className,
    disabled,
}: ButtonProps) {
    const base = "py-3 text-body-sm font-medium rounded-sharp border-none cursor-pointer transition-opacity duration-150";

    const variants = {
        primary: "bg-inverse-surface text-inverse-primary hover:opacity-85",
        secondary: "bg-surface-highest text-on-surface hover:bg-surface-high",
        tertiary: "bg-transparent text-tertiary hover:opacity-80",
    };

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className ?? ""}`}>
            {children}
        </button>
    );
}