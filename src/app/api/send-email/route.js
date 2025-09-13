import nodemailer from "nodemailer";
import { generateEmailHTML } from "../../../utils/emailTemplates";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.RECIPIENT_EMAIL,
    pass: process.env.APPLICATION_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => {
    console.log({ message: "Servidor SMTP listo" });
  })
  .catch((error) => {
    console.log({ error: "Error verificando SMTP", details: error });
  });

export async function POST(request) {
  try {
    const { email, name, message } = await request.json();

    // Generar HTML usando la plantilla
    const emailHTML = generateEmailHTML("basic", {
      name,
      email,
      message,
    });

    // Enviar email al administrador
    const info = await transporter.sendMail({
      from: '"Sistema de Contacto" <maddison53@ethereal.email>',
      to: process.env.RECIPIENT_EMAIL,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      html: emailHTML,
    });

    return Response.json({ success: true, messageId: info.messageId });
  } catch (_error) {
    return Response.json(
      { error: "Error al enviar el email" },
      { status: 500 }
    );
  }
}
