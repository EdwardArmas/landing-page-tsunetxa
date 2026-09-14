# Landing de Tsunexa — instalación en tu PC

Esta es una landing independiente en Next.js, preparada a partir de la identidad visual de tu aplicación. No reemplaza tu aplicación ni cierra su fase 5.2.

## 1. Copiar el contenido

1. Descarga y extrae el ZIP en una carpeta temporal.
2. Abre la carpeta `landing-page-tsunexa` extraída. Dentro verás `package.json`, `src`, `public` y este documento.
3. Abre tu carpeta existente de landing (por ejemplo `E:\landing-page\landing-page-tsunexa`; usa tu ruta real).
4. Copia **el contenido** de la carpeta extraída dentro de tu carpeta existente. No crees otra `landing-page-tsunexa` dentro.
5. Conserva la carpeta `.git` que ya existe en el destino. El ZIP no incluye ninguna.
6. Si Windows avisa que un archivo ya existe, revisa o guarda una copia de ese archivo antes de reemplazarlo.

No copies este paquete sobre la carpeta de tu aplicación principal (antes Varyqon).

## 2. Abrir y arrancar

En Cursor: File → Open Folder → selecciona tu carpeta de landing.
Abre Terminal → New Terminal. Comprueba que la ruta de la terminal sea la landing.

Ejecuta:

```powershell
pnpm install --frozen-lockfile
```

Instala las versiones exactas del archivo `pnpm-lock.yaml`. Espera a que termine.

Después:

```powershell
pnpm dev --port 3001
```

Abre http://localhost:3001 en tu navegador. El puerto 3001 permite mantener tu aplicación en el 3000. Si está ocupado, usa 3002. Mantén la terminal abierta mientras pruebas. Ctrl+C detiene la landing.

## 3. Conectar el botón Sign in

Sin configuración, Sign in lleva a la sección de disponibilidad y no inventa una dirección de tu aplicación.

1. Copia `.env.example` y llama a la copia `.env.local`.
2. Si tu aplicación principal está realmente corriendo en el puerto 3000, escribe:

```dotenv
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Reinicia la landing. Sign in llevará a `http://localhost:3000/login`.

En producción, usa la URL HTTPS real de tu aplicación, sin `/login` al final. Configúrala en el proyecto de landing de Vercel antes de compilar/publicar. No se necesitan claves de Supabase para esta landing.

## 4. Comprobarla

- Abre Platform, Solutions, Our approach y Plans desde la navegación.
- Cambia entre Assets, Maintenance e Integrations en la vista de ejemplo.
- Abre las preguntas frecuentes.
- Prueba a reducir el navegador a tamaño móvil y abre el menú.
- Prueba Sign in con la aplicación principal encendida.

Para comprobar el código antes de guardarlo:

```powershell
pnpm lint
pnpm build
```

## 5. Guardar en GitHub

Desde la terminal de la landing:

```powershell
git status
```

Revisa que sean los archivos esperados y que `.env.local` no aparezca. Después:

```powershell
git add .
git commit -m "Add Tsunexa landing with shared brand design"
git push
```

Si Git indica que falta configurar la rama remota, revisa tu rama y remoto antes de continuar; no fuerces el push. El ZIP no contiene historial Git.

## Qué incluye

- Inglés, siguiendo el idioma actual de tu aplicación.
- Colores originales de `globals.css`, Geist y Geist Mono.
- El componente original `login-background.tsx` y la imagen WebP del dashboard.
- Secciones comerciales y vista interactiva con datos de demostración.
- Enlace configurable al login existente.
- Diseño adaptable, enlaces de teclado y respeto a movimiento reducido.

## Qué queda pendiente

- Confirmar URL de producción, dominio y datos comerciales de contacto.
- Aprobar precios, cobertura y alcance de servicios.
- Documentos legales y requisitos de publicación comercial.
- Conectar formularios o contratación cuando se definan. Actualmente no hay formularios, pagos, cuentas nuevas ni consultas a Supabase.
- Verificar capacidades y seguridad de la aplicación antes de prometerlas comercialmente.

## Archivos principales

- `src/app/page.tsx`: secciones y textos de la landing; validación de la URL de acceso.
- `src/app/globals.css`: variables originales de marca y estilos de la landing.
- `src/app/layout.tsx`: idioma, tipografías y metadatos.
- `src/components/navigation.tsx`: menú móvil.
- `src/components/product-preview.tsx`: módulos de demostración.
- `src/components/login-background.tsx`: fondo original reutilizado.
- `.env.example`: plantilla de URL de la aplicación, sin claves.

Este proyecto usa **pnpm**, no npm. Se conservan el manifiesto y el lockfile para evitar cambiar versiones arbitrariamente. Por eso incluyen dependencias de Supabase que esta landing no utiliza. No añadas sus claves aquí.

Las fuentes Geist se incluyen localmente (paquete geist 1.7.2, licencia en src/app/fonts/LICENSE.txt), para compilar sin descargar fuentes de Google.
