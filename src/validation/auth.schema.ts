import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.object({
      firstName: z.string().trim().min(1, "First name is required"),
      lastName: z.string().trim().min(1, "Last name is required"),
    }),
    birthday: z.object({
      day: z.string().trim().min(1, "Day is required"),
      month: z.string().trim().min(1, "Month is required"),
      year: z.string().trim().min(1, "Year is required"),
    }),
    gender: z.string().trim().min(1, "Gender is required"),
    contactNumber: z
      .string()
      .trim()
      .min(10, "Invalid contact number")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .trim()
      .email({ message: "Invalid email format" })
      .optional()
      .or(z.literal("")),
    password: z.string().trim().min(8, "Password is too short"),
  })
  .refine((data) => data.email || data.contactNumber, {
    message: "Provide either email or phone number",
    path: ["email", "contactNumber"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
