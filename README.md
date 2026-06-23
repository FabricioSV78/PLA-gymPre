# Plantilla 3 Gym

Landing premium para gimnasios y centros de alto rendimiento. Está construida con Next.js, TypeScript, Motion y Lucide.

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Desplegar en Netlify

Este proyecto ya queda preparado para Netlify con:

- `netlify.toml` para usar `npm run build`.
- `.node-version` fijado en Node `22`, alineado con una versión soportada por Netlify.

Pasos:

```bash
npm install
npm run build
```

Luego:

1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. Crea un sitio en Netlify conectando ese repositorio.
3. Netlify detectará Next.js automáticamente.
4. Si quieres evitar errores entre despliegues activos, agrega la variable `NETLIFY_NEXT_SKEW_PROTECTION=true` en Netlify y vuelve a desplegar.

## Personalización rápida

- Textos, planes, clases y horarios: `src/components/gym-experience.tsx`.
- Colores, espaciado y efectos: `src/app/globals.css`.
- Fotos, video y audio: `public/media`.
- Número de WhatsApp: constante `WHATSAPP_NUMBER` en el componente principal.
