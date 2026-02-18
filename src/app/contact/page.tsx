"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

type FormInput = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

async function sendEmail(formData: FormInput) {
  const response = await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
}

function ContactPage() {
  const mutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      console.log("Success!", data);
      // You can trigger toasts or redirects here
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as unknown as FormInput;

    mutation.mutate(data, {
      onSuccess: () => {
        (e.target as HTMLFormElement).reset();
      },
    });
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 p-6">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input
              id="form-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              id="form-email"
              name="email"
              type="email"
              placeholder="john@example.com"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
            <Input
              id="form-phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="form-type">Project Type</FieldLabel>
            <select
              id="form-type"
              name="type"
              className="w-full p-2 border rounded-md bg-white" // Basic styling if you don't have a Select component
            >
              <option>Renovation</option>
              <option>New Build</option>
              <option>Commercial</option>
              <option>Small Repair</option>
            </select>
          </Field>

          <Field>
            <FieldLabel htmlFor="form-message">Details</FieldLabel>
            <textarea
              id="form-message"
              name="message"
              className="w-full p-2 border rounded-md min-h-[100px]"
              placeholder="We are looking to add a master bath..."
            />
          </Field>

          <div className="flex justify-end pt-4 items-center gap-4">
            {mutation.isSuccess && (
              <span className="text-green-600">Sent!</span>
            )}
            {mutation.isError && <span className="text-red-600">Error.</span>}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              {mutation.isPending ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </Card>
  );
}

export default ContactPage;
