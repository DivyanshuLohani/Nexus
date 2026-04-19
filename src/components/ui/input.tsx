interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    rightText?: string;
    error?: string;
}

export default function Input({
    label,
    placeholder,
    type = "text",
    rightText,
    error,
}: InputProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <label className="text-body-sm font-medium tracking-wide uppercase text-on-surface-variant">
                    {label}
                </label>
                {rightText && (
                    <span className="text-body-sm text-tertiary cursor-pointer">
                        {rightText}
                    </span>
                )}
            </div>

            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-outline-variant rounded-none
                   py-2 px-0 text-body-md text-on-surface placeholder:text-outline
                   outline-none transition-all duration-200
                   focus:border-b-2 focus:border-secondary"
            />

            {error && (
                <p className="mt-1 text-body-sm text-error">{error}</p>
            )}
        </div>
    );
}