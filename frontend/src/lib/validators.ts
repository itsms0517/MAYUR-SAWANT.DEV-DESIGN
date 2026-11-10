import { ContactFormValues } from "@/types";

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function validateContactForm(values: ContactFormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Full name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long";
  }

  return errors;
}
