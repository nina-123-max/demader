# Seguridad base

La seguridad HTTP se aplica en la capa del Worker, antes de entregar cualquier
ruta o recurso optimizado. La interfaz, sus clases CSS y su estructura visual no
dependen de esta configuración.

## Variables de entorno

1. Copia `.env.example` como `.env` para desarrollo local.
2. Completa únicamente los valores necesarios.
3. No subas `.env` ni archivos `.env.*` con secretos al repositorio.
4. En producción, configura los valores sensibles desde el entorno seguro del
   alojamiento.

Las credenciales deben leerse únicamente desde código del servidor. Nunca uses
prefijos públicos para secretos ni los incluyas en componentes del navegador.

## Controles activos

- Redirección HTTP a HTTPS con código permanente `308` fuera del entorno local.
- HSTS en respuestas HTTPS.
- Content Security Policy restrictiva y compatible con la aplicación actual.
- Protección contra inclusión en marcos mediante CSP: solo se permite el propio
  sitio y el visor oficial de ChatGPT; otros dominios continúan bloqueados.
- Prevención de interpretación MIME (`X-Content-Type-Options: nosniff`).
- Política restrictiva para cámara, micrófono y geolocalización.

## Validación de datos

El módulo `lib/security/input-validation.ts` centraliza la validación de campos
obligatorios, correo y teléfono, limita longitudes, normaliza caracteres y
convierte las entradas en texto plano. También incluye escape HTML explícito
para cualquier integración que genere HTML manualmente. React mantiene su
escape automático; no debe usarse `dangerouslySetInnerHTML` con datos de
usuarios.

Actualmente el sitio no muestra formularios: los llamados a la acción abren
WhatsApp. Por eso no se añadió ningún campo ni se modificó la estructura visual.
El texto que compone esos enlaces sí pasa por la sanitización centralizada.
