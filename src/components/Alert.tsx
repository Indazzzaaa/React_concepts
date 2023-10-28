import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Alert = ({ children, onClick }: Props) => {
  return (
    <div
      className="alert alert-primary alert-dismissible fade show"
      role="alert"
    >
      {children}

      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClick}
      />
    </div>
  );
};

export default Alert;
