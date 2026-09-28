/** Careers application fields, shared by the form and the server action. */

export const interests = [
  "Engineering",
  "Design",
  "Product",
  "Operations",
  "Something else",
] as const;

export type Field = "name" | "email" | "phone" | "interest" | "message";
export type Errors = Partial<Record<Field, string>>;

export type Application = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export const limits = { name: 200, email: 320, phone: 30, message: 5000 };

export function readApplication(data: FormData): Application {
  const get = (k: Field) => String(data.get(k) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    interest: get("interest"),
    message: get("message"),
  };
}

export function validateApplication(a: Application): Errors {
  const errors: Errors = {};

  if (!a.name) errors.name = "Enter your full name.";
  else if (a.name.length > limits.name)
    errors.name = `Keep your name under ${limits.name} characters.`;

  if (!a.email) errors.email = "Enter your email address.";
  else if (a.email.length > limits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email))
    errors.email = "Enter an email address like name@example.com.";

  if (a.phone && !/^[+()\d\s-]{7,20}$/.test(a.phone))
    errors.phone = "Use digits, spaces, +, - or brackets only.";

  if (!(interests as readonly string[]).includes(a.interest))
    errors.interest = "Choose the area that fits you best.";

  if (a.message.length < 10)
    errors.message = "Write at least a sentence about yourself.";
  else if (a.message.length > limits.message)
    errors.message = `Keep your message under ${limits.message} characters.`;

  return errors;
}
