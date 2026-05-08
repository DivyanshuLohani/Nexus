interface Props {
  title: string;
  subtitle: string;
  selected?: boolean;
  badge?: string;
  onClick?: () => void;
}

export default function BillingOptionCard({
  title,
  subtitle,
  selected,
  badge,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        relative rounded-2xl border p-5 text-left transition-all duration-200

        ${
          selected
            ? `
              border-primary
              bg-primary/5
              shadow-sm
            `
            : `
              border-border
              bg-card
              hover:border-primary/40
              hover:bg-accent/40
            `
        }
      `}
    >
      {/* RADIO */}
      <div className="mb-5">
        <div
          className={`
            w-5 h-5 rounded-full border-2
            flex items-center justify-center
            transition-all

            ${
              selected
                ? "border-primary bg-background"
                : "border-muted-foreground/40 bg-background"
            }
          `}
        >
          {/* inner fill */}
          <div
            className={`
              rounded-full transition-all
              ${selected ? "w-2.5 h-2.5 bg-primary" : "w-0 h-0"}
            `}
          />
        </div>
      </div>

      {/* BADGE */}
      {badge && (
        <div
          className="
            absolute top-4 right-4
            text-[11px]
            bg-primary/10
            text-primary
            px-2 py-1
            rounded-full
            font-medium
          "
        >
          {badge}
        </div>
      )}

      {/* CONTENT */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>

        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>
    </button>
  );
}
