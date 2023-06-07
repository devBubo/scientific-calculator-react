import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
}

export default function DigitButton({ children, onClick }: Props) {
  return (
    <button
      className="btn border ps-4 pe-4 border-2 rounded-pill mt-3 ms-1 me-1 calculator-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
