import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function OperatorButton({
  children,
  onClick,
  className,
}: Props) {
  return (
    <button
      className={
        "btn border ps-4 pe-4 border-2 rounded-pill mt-3 ms-1 me-1 calculator-btn " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
