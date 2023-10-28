interface Props {
  children: string;
  onChange: () => void;
}

const Button = ({ children, onChange }: Props) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onChange}>
      {children}
    </button>
  );
};

export default Button;
