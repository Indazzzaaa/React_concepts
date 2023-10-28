import category from "./categories";
interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">All Categories</option>
      {category.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
