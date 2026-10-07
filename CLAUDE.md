# Cómo se trabaja este sitio (cursosdeamazon → gerardovilla.mx)

Claude es el editor y quien publica este sitio. El dueño no usa otro editor:
pide los cambios en el chat y Claude los hace y los publica.

## Flujo para cada cambio

1. Una rama nueva por cambio, con su pull request. Nunca editar `main` directo.
2. Antes de publicar, mandar al dueño una vista previa: capturas del sitio
   corriendo localmente con el cambio (no solo el código).
3. Publicar (fusionar el pull request a `main`) **solo** con confirmación
   explícita del dueño ("publícalo" o equivalente).
4. Después de publicar, releer `main` desde GitHub y verificar en la página en
   vivo que el cambio aparece. Si no se pudo verificar en vivo, decirlo.
5. No reescribir historial publicado (sin force push, rebase ni amend de
   commits ya subidos).

## Comunicación

- No mencionar al dueño la herramienta con la que se creó el sitio; hablar del
  sitio, los cambios y la publicación.

## Cómo está hecho

- TanStack Start; `vite.config.ts` genera HTML estático (`dist/client`) de
  `/`, `/acelerador`, `/checkout` y `/gracias`. Una ruta nueva se agrega en `pages`.
- Se publica en GitHub Pages con `.github/workflows/publicar.yml` al fusionar a `main`.
- Formularios → Google Sheets vía Google Apps Script (`apps-script/Codigo.gs`);
  la URL de la aplicación web va en `src/lib/sheets-config.ts`.
- El video del acelerador se sirve desde YouTube. El original (144 MB) está en el
  Release `respaldo-archivos`.
- Pagos: botón alojado de PayPal (se carga en el navegador, no necesita servidor).
