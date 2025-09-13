import EmailForm from "@/components/email-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Demo send emails with Next.js and NodeMailer</h1>
      <p className="text-center">
        This is a demo of how to send emails with Next.js and NodeMailer
      </p>
      <EmailForm />
    </div>
  );
}
