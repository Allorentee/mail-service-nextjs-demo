"use client";
import { Formik } from "formik";
import { useState } from "react";

interface Values {
  email: string;
  name: string;
  message: string;
}

export default function EmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (values: Values) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log({ response });

      if (response.ok) {
        setSubmitStatus("success");
        console.log({ success: "Email enviado correctamente" });
      } else {
        setSubmitStatus("error");
        console.log({ error: "Error al enviar el email" });
      }
    } catch (error) {
      setSubmitStatus("error");
      console.log({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-10/12 md:max-w-7xl mt-10">
      <Formik
        initialValues={{ email: "", name: "", message: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, handleBlur }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white/90"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/90"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
                ¡Mensaje enviado correctamente!
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                Error al enviar el mensaje. Inténtalo de nuevo.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
