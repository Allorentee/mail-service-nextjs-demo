import fs from "fs";
import path from "path";

// Función para cargar una plantilla HTML
export function loadTemplate(templateName) {
  try {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      `${templateName}.html`
    );
    return fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    console.log({
      error: `Error al cargar la plantilla ${templateName}:`,
      error,
    });
    throw new Error(`No se pudo cargar la plantilla ${templateName}`);
  }
}

// Función para reemplazar variables en una plantilla
export function renderTemplate(template, variables) {
  let renderedTemplate = template;

  // Reemplazar todas las variables en el formato {{variable}}
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{ ${key} }}`, "g");
    renderedTemplate = renderedTemplate.replace(regex, variables[key] || "");
  });

  return renderedTemplate;
}

// Función para obtener la fecha formateada
export function getFormattedDate() {
  return new Date().toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Función principal para generar email HTML
export function generateEmailHTML(templateName, data) {
  try {
    const template = loadTemplate(templateName);
    const variables = {
      ...data,
      date: getFormattedDate(),
    };
    return renderTemplate(template, variables);
  } catch (error) {
    console.log({ error: "Error al generar el HTML del email:", error });
    throw error;
  }
}
