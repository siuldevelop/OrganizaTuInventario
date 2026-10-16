# OrganizaTuInventario

Aplicación web para crear y reutilizar plantillas de inventario. Esta versión corresponde a la Fase 1: estructura, navegación y pantalla inicial.

## Ejecutar localmente

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

También se puede crear una compilación de producción con `npm run build` y previsualizarla con `npm run preview`.

## Fase 1 implementada

- Pantalla «Mis plantillas» responsive en español.
- Dos plantillas de ejemplo: motocicletas y productos.
- Búsqueda visual de plantillas, tarjetas y estado vacío.
- Entrada al editor con vista previa de columnas.
- Avisos claros para funciones que aún están pendientes.
- Diseño preparado para el almacenamiento local y las fases posteriores.

## Fase 2 implementada

- Editor funcional con celdas editables y guardado automático.
- Creación y eliminación de filas con confirmación.
- Creación, renombrado y eliminación de columnas con advertencia si contienen datos.
- Búsqueda de registros dentro de cada plantilla.
- Creación, duplicación, renombrado y eliminación de plantillas.
- Persistencia mediante IndexedDB, incluyendo recuperación después de recargar.
- Indicadores de estado «Guardando», «Guardado» y «No se pudo guardar».

La importación y exportación de Excel siguen pendientes para una fase posterior.

## Pendiente para la Fase 2

Implementar el modelo de datos definitivo, el editor editable, almacenamiento en IndexedDB, gestión de filas y columnas, y luego importación/exportación de Excel con validación.
Aplicación web para crear, personalizar y gestionar plantillas de inventario, con edición de registros y columnas, búsqueda de productos e importación y exportación de archivos Excel. Los datos se guardan localmente en el navegador, sin necesidad de crear una cuenta.
