import type { FC } from "react";

type CardProps = {
  title?: string;
  description?: string;
};

const Card: FC<CardProps> = ({
  title = "2+",
  description = "Years of Experience",
}) => {
  return (
    <div
      className="flex min-h-[120px] min-w-[180px] flex-col items-center justify-center rounded-[20px] border bg-[var(--bg-mid)] px-20 py-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:bg-[var(--bg-light)] hover:shadow-lg"
      style={{
        borderColor: "var(--border-color)",
        boxShadow: "0 18px 35px var(--shadow-color)",
      }}
    >
      <span className="text-[48px] font-semibold leading-none text-[var(--color-primary)]">
        {title}
      </span>
      <span className="mt-3 text-[16px] font-medium text-[var(--text-normal)]">
        {description}
      </span>
    </div>
  );
};

export default Card;
