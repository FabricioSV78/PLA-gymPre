# Gym Rat Club — Design System

## Concepto

Performance club cinematográfico. La interfaz debe sentirse como entrar a una sesión: energía controlada, contraste alto, ritmo editorial y una acción principal inequívoca.

## Identidad

- Fondo: `#080907`; superficies: `#11130f` y `#171a14`.
- Marca: amarillo eléctrico `#f7d517`; apoyo cálido `#ff5a36`.
- Texto principal: `#f5f4ed`; texto secundario: `#a9aa9f`.
- Tipografía display condensada para impacto; sans geométrica y legible para contenido.
- Bordes finos, esquinas medias y sombras profundas. Sin glassmorphism decorativo excesivo.

## Jerarquía y conversión

1. Hero audiovisual + promesa + prueba gratuita.
2. Evidencia inmediata: métricas y propuesta diferencial.
3. Elección guiada por objetivo.
4. Método, agenda, espacios y coaching.
5. Planes comparables y prueba gratuita.
6. Objeciones, ubicación y cierre.

## Movimiento

- Transiciones de 180–320 ms, solo `transform` y `opacity`.
- Reveal por sección y feedback de presión en botones.
- Video en silencio; audio solo después de una acción explícita.
- Respetar `prefers-reduced-motion` y mantener el contenido usable sin animación.

## Accesibilidad

- Contraste WCAG AA, foco visible, navegación por teclado y enlace para saltar contenido.
- Controles táctiles de al menos 44 px.
- Etiquetas visibles, mensajes de validación junto al campo y `aria-live` para confirmaciones.
- No depender solo del color para estados o significado.

## Responsive

- Mobile-first, sin scroll horizontal, tipografía fluida con `clamp()`.
- Navegación plegable bajo 900 px y CTA fija inferior solo en móvil.
- Grillas se convierten en listas legibles sin ocultar contenido esencial.
