import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// define the schema for validating our input fields
const schema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 character long" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be at least 18." }),
});

type FormData = z.infer<typeof schema>; // zod will create type for us based on the schema we defined above.

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger"> {errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          id="age"
          {...register("age", { valueAsNumber: true })}
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger"> {errors.age.message}</p>}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
