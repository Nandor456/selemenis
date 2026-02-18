import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export function EmailTemplate({
  name,
  email,
  phone,
  type,
  message,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Project Type: {type}</p>
      <p>Message: {message}</p>
    </div>
  );
}
