export type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; error: string };

const EMAIL_PATTERN = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const HTML_TAGS = /<[^>]*>/g;
const MAX_TEXT_LENGTH = 2_000;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Convierte una entrada desconocida en texto plano seguro y acotado. */
export function sanitizePlainText(value: unknown, maxLength = MAX_TEXT_LENGTH): string {
  return asString(value)
    .normalize("NFKC")
    .replace(CONTROL_CHARACTERS, "")
    .replace(HTML_TAGS, "")
    .slice(0, Math.max(0, maxLength))
    .trim();
}

/** Escapa texto cuando deba insertarse explícitamente en una cadena HTML. */
export function escapeHtml(value: unknown): string {
  return sanitizePlainText(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function validateRequired(value: unknown, fieldName = "Este campo"): ValidationResult {
  const sanitized = sanitizePlainText(value);
  return sanitized
    ? { valid: true, value: sanitized }
    : { valid: false, error: `${fieldName} es obligatorio.` };
}

export function validateEmail(value: unknown): ValidationResult {
  const email = sanitizePlainText(value, 254).toLowerCase();
  if (!email) return { valid: false, error: "El correo electrónico es obligatorio." };
  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, error: "Ingresa un correo electrónico válido." };
  }
  return { valid: true, value: email };
}

export function validatePhone(value: unknown): ValidationResult {
  const input = sanitizePlainText(value, 30);
  if (!input) return { valid: false, error: "El teléfono es obligatorio." };

  const hasLeadingPlus = input.startsWith("+");
  const digits = input.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return { valid: false, error: "Ingresa un número de teléfono válido." };
  }

  return { valid: true, value: `${hasLeadingPlus ? "+" : ""}${digits}` };
}

export type ContactInput = {
  name: unknown;
  email: unknown;
  phone: unknown;
  message?: unknown;
};

export type ContactValidation =
  | {
      valid: true;
      data: { name: string; email: string; phone: string; message: string };
    }
  | { valid: false; errors: Partial<Record<keyof ContactInput, string>> };

/**
 * Validación reutilizable para cualquier formulario de contacto futuro.
 * Debe ejecutarse también en el servidor antes de almacenar o reenviar datos.
 */
export function validateContactInput(input: ContactInput): ContactValidation {
  const name = validateRequired(input.name, "El nombre");
  const email = validateEmail(input.email);
  const phone = validatePhone(input.phone);
  const message = sanitizePlainText(input.message, 1_500);

  const errors: Partial<Record<keyof ContactInput, string>> = {};
  if (!name.valid) errors.name = name.error;
  if (!email.valid) errors.email = email.error;
  if (!phone.valid) errors.phone = phone.error;

  if (Object.keys(errors).length > 0 || !name.valid || !email.valid || !phone.valid) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name: name.value, email: email.value, phone: phone.value, message },
  };
}
