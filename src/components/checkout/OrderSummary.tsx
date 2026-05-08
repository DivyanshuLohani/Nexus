interface Props {
  planName: string;
  tenure: "monthly" | "yearly";
  amount: number;
}

export default function OrderSummary({ planName, tenure, amount }: Props) {
  const tax = Math.round(amount * 0.18);
  const total = amount + tax;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-xl font-semibold mb-8">Order details</h2>

      <div className="space-y-5 text-sm">
        <div className="flex justify-between">
          <div>
            <p>{planName} plan</p>
            <p className="text-zinc-500 capitalize">{tenure}</p>
          </div>

          <span>USD {amount}</span>
        </div>

        <div className="border-t border-zinc-800 pt-5 flex justify-between">
          <span>Subtotal</span>
          <span>USD {amount}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>USD {tax}</span>
        </div>

        <div className="border-t border-zinc-800 pt-5 flex justify-between text-base font-semibold">
          <span>Total due today</span>
          <span>USD {total}</span>
        </div>
      </div>
    </div>
  );
}
