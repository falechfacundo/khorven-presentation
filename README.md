# Propuestas comerciales

Generador de propuestas comerciales personalizadas por cliente, construido con Astro, React islands, Tailwind CSS v4 y Framer Motion.

## Stack

- Astro 6 (output estático, adapter de Vercel)
- React 19 (islands)
- Tailwind CSS v4
- Framer Motion
- TypeScript estricto

## Rutas

- `/`: propuesta genérica ("… para tu negocio").
- `/propuesta/[id]`: propuesta personalizada para un prospecto (ej: `/propuesta/001`). Se generan en build una por prospecto; un id inexistente da 404.

## Estructura

- `src/pages/`: `index.astro` (raíz) y `propuesta/[id].astro`.
- `src/layouts/PropuestaLayout.astro`: shell HTML compartido por ambas rutas.
- `src/components/react/PropuestaView.tsx`: arma la página y aplica el color del prospecto.
- `src/components/propuesta/`: secciones (Hero, Problema, Demo, Plan, Antes/Después, Paquetes, Cierre) y primitivas compartidas en `ui.tsx`.
- `src/data/prospectos.ts`: datos de los prospectos y funciones de acceso (`getProspectoById`, etc.), aisladas para migrar a Cloudflare D1 sin tocar la UI.
- `src/config/firma.ts`: quién firma las propuestas (agregar `fotoUrl` para mostrar una foto).
- `src/lib/whatsapp.ts`: arma los links de WhatsApp con mensaje prellenado.
- `src/styles/global.css`: tokens de tema, tipografías y utilidades de animación.

## Agregar un prospecto

Sumar un objeto en `src/data/prospectos.ts`:

```ts
{
  id: '003',
  nombreNegocio: 'Nombre del negocio',
  dolorPrincipal: 'El dolor principal, en una frase.',
  colorTema: '#0EA5E9',
  logoUrl: '/prospectos/logo.png', // opcional: solo si hay logo real en public/prospectos
  whatsappLink: 'https://wa.me/5491127329540',
}
```

## Comandos

- `pnpm install`: instala dependencias
- `pnpm dev`: desarrollo en localhost:4321
- `pnpm build`: build de producción en `dist`
- `pnpm preview`: sirve localmente el build
