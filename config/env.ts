/** Variables disponibles en el entorno del Worker. */
export interface AppEnvironment {
  APP_ENV?: "development" | "production";
  SITE_URL?: string;
  SITE_API_KEY?: string;
}

/**
 * Lee una variable opcional sin exponerla al cliente.
 * Las variables sensibles solo deben consumirse desde código del servidor.
 */
export function optionalEnv(
  env: AppEnvironment,
  key: keyof AppEnvironment,
): string | undefined {
  const value = env[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
