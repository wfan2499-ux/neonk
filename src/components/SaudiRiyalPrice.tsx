"use client";

export default function SaudiRiyalPrice({ amount }: { amount: number }) {
  return (
    <span dir="ltr" className="inline-flex items-baseline gap-[0.12em]">
      <span className="sr-symbol" aria-hidden="true">
        {"\u{ea}"}
      </span>
      <span>{amount}</span>
    </span>
  );
}
