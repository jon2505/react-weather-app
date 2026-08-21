# Tarjeta de Tienda con QR

Aplicación React para generar una tarjeta de presentación de tu tienda con código QR integrado.

## Características

- Tarjeta de tienda con diseño moderno y profesional
- Código QR generado automáticamente a partir de la URL de tu tienda
- Personalización completa: nombre, eslogan, teléfono, dirección, URL, ícono y colores
- Opción de imprimir o guardar como PDF directamente desde el navegador

## Cómo usar

```bash
cd store-card
npm install
npm run dev
```

Luego abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Personalizar

Haz clic en **Editar** para modificar:

| Campo | Descripción |
|---|---|
| Nombre de la tienda | Título principal de la tarjeta |
| Eslogan | Descripción corta debajo del nombre |
| URL | Se usa para generar el QR |
| Teléfono | Número de contacto |
| Dirección | Dirección física |
| Emoji / Ícono | Ícono circular en el encabezado |
| Color primario / secundario | Degradado del encabezado y del QR |

## Imprimir / Guardar PDF

Haz clic en **Imprimir / Guardar PDF** y selecciona "Guardar como PDF" en el diálogo del navegador para obtener la tarjeta lista para imprimir.

## Tecnologías

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [qrcode.react](https://www.npmjs.com/package/qrcode.react)
