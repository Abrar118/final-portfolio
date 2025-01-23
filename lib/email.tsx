import emailjs from "@emailjs/browser";
import { toast } from "sonner";

async function email(
  email_from: string,
  email_to: string,
  from_name: string,
  message_body: string
) {
  const form = {
    from_email: email_from,
    from_name: from_name,
    to_email: email_to,
    message: message_body,
  };

  try {
    const response = await emailjs.send(
      "service_3fy6krw",
      "template_beimqbq",
      form,
      "E3-0vUQPbmVnJDhAa"
    );

    toast.success("Email sent successfully");
  } catch (error) {
    throw new Error(error.text);
  }
}

export { email };
