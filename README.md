# OrganizaTuInventario

Aplicación web para crear, personalizar y reutilizar plantillas de inventario desde el navegador. Está diseñada para funcionar sin cuentas de usuario ni backend: los datos se almacenan localmente en el navegador de cada usuario.

## Estado del proyecto

La versión actual incluye la Fase 1 y la Fase 2 del proyecto.

### Plantillas

- Dos plantillas iniciales: inventario de motocicletas e inventario de productos.
- Creación de plantillas personalizadas.
- Renombrado mediante modal integrado a la interfaz.
- Duplicación completa como copia de seguridad independiente.
- Eliminación con confirmación visual.
- Vista en cuadrícula y vista apilada tipo folder.
- Indicador relativo de última edición para plantillas modificadas.

### Editor de inventario

- Edición directa de celdas.
- Creación y eliminación de filas.
- Creación, renombrado y eliminación de columnas.
- Búsqueda de registros.
- Protección contra eliminaciones accidentales.
- Selección de varias filas y eliminación masiva.
- Deshacer la última acción con `Ctrl + Z`.
- Guardado automático en IndexedDB.
- Recuperación de datos después de recargar la página.

## Almacenamiento y privacidad

Los datos permanecen en el almacenamiento local del navegador. No se envían a un servidor y no es necesario crear una cuenta. Si se borran los datos del navegador, el inventario local podría perderse.

### Excel

- Importación de archivos `.xlsx` y `.xls`.
- Selección de hoja cuando el archivo contiene varias.
- Previsualización de encabezados y registros.
- Relación de columnas del archivo con las columnas de la plantilla.
- Opción para agregar registros o reemplazar los existentes.
- Confirmación antes de aplicar cambios.
- Exportación de la plantilla actual a `.xlsx`.

La compatibilidad se centra en datos tabulares. No se prometen macros, gráficos ni funciones avanzadas de Excel.

## Ejecutar localmente

Requisitos:

- Node.js 20 o superior.

Instalar dependencias y iniciar el servidor de desarrollo:

```bash
npm install
npm run dev
```

Para crear y revisar una compilación de producción:

```bash
npm run build
npm run preview
```

## Tecnologías

- React
- TypeScript
- Vite
- IndexedDB
- Lucide React

## Validación

La compilación se valida con:

```bash
npm run build
```

## Próxima fase

Las siguientes mejoras pueden centrarse en validaciones específicas por tipo de columna, formatos monetarios en la exportación y pruebas adicionales con archivos reales.
