interface Props {
  yearly: boolean;
  setYearly: (value: boolean) => void;
}

export default function BillingToggle({ yearly, setYearly }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 mb-14">
      <span
        className={!yearly ? "font-medium text-black" : "text-muted-foreground"}
      >
        Monthly
      </span>

      <button
        onClick={() => setYearly(!yearly)}
        className={`
          w-14 h-8 rounded-full p-1 transition
          ${yearly ? "bg-black" : "bg-muted"}
        `}
      >
        <div
          className={`
            w-6 h-6 rounded-full bg-white transition-transform
            ${yearly ? "translate-x-6" : ""}
          `}
        />
      </button>

      <span
        className={yearly ? "font-medium text-black" : "text-muted-foreground"}
      >
        Annual
      </span>
    </div>
  );
}
