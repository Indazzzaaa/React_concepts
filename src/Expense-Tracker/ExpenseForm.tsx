import category from "./categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be atleas 3 characters long." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Please provide the amount" })
    .min(0.001)
    .max(100_1000),
  category: z.enum(category, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;
interface Prop {
  onSubmit: (expense: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Prop) => {
  //  ! here error propery has been destructured from formState object
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description?.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount?.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-lable">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""> All Categories</option>
          {category.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category?.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
