"use server";

import MailerLite from '@mailerlite/mailerlite-nodejs';

export type FormState = {
  message: string;
  success?: boolean;
  error?: boolean;
};

if (!process.env.MAILERLITE_API_KEY) {
  throw new Error("MAILERLITE_API_KEY is not defined in .env.local");
}
const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

export async function subscribeToNewsletter(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {

  const email = formData.get("email") as string;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!groupId) {
    console.error("MailerLite Group ID is missing.");
    return { message: "Konfigurace serveru je neúplná.", error: true };
  }

  if (!email || !email.includes('@')) {
    return { message: "Prosím, zadejte platný e-mail.", error: true };
  }

  try {
    const params = {
      email,
      groups: [groupId],
      status: 'active' as const,
    };

    await mailerlite.subscribers.createOrUpdate(params);

    return { message: "Děkujeme za přihlášení!", success: true };

  } catch (error: unknown) {
    console.error(error);

    const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message
      || "Něco se pokazilo. Zkuste to prosím později.";

    return { message: errorMessage, error: true };
  }
}
