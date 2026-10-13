import type { InventoryTemplate } from './types'

export const starterTemplates: InventoryTemplate[] = [
  {
    id: 'motorcycles',
    name: 'Inventario de motocicletas',
    description: 'Controla tus motocicletas, documentos y precios en un solo lugar.',
    type: 'motorcycles',
    columns: ['Placa', 'Motocicleta', 'Modelo', 'Color', 'SOAT', 'Tecnomecánica', 'Traspasos', 'Precio'],
    updatedAt: 'Plantilla de ejemplo',
    recordCount: 8,
    records: [
      { Placa: 'KJ-48H', Motocicleta: 'AKT CHR 125 (TIPO GN)', Modelo: '2025', Color: 'NEGRO', SOAT: 'JULIO', Tecnomecánica: 'JULIO', Traspasos: 'TRASPASOS', Precio: '$ 4.900.000' },
      { Placa: 'WF-50F', Motocicleta: 'AKT CR4 125', Modelo: '2022', Color: 'GRIS MATE', SOAT: 'NUEVO', Tecnomecánica: 'NUEVO', Traspasos: 'TRASPASOS', Precio: '$ 4.900.000' },
      { Placa: 'DOO-54G', Motocicleta: 'AKT CR4 162', Modelo: '2024', Color: 'NEGRO MATE', SOAT: 'NUEVO', Tecnomecánica: 'NUEVO', Traspasos: 'TRASPASOS', Precio: '$ 5.600.000' },
      { Placa: 'PW-31I', Motocicleta: 'AUTOMATICA NMAX 155 V3 NUEVA 0KM', Modelo: '2027', Color: 'GRIS PLATA', SOAT: 'NUEVO', Tecnomecánica: '2028', Traspasos: 'TRASPASOS', Precio: '$ 22.500.000' },
      { Placa: 'SQ-49G', Motocicleta: 'AUTOMATICA NMAX CONNECT 155', Modelo: '2025', Color: 'NEGRO MATE', SOAT: 'ENERO', Tecnomecánica: 'ENERO', Traspasos: 'TRASPASOS', Precio: '$ 17.500.000' },
      { Placa: 'JN-49G', Motocicleta: 'AUTOMATICA NMAX CONNECT 155', Modelo: '2024', Color: 'NEGRO MATE', SOAT: 'MARZO', Tecnomecánica: 'MARZO', Traspasos: 'TRASPASOS', Precio: '$ 16.500.000' },
      { Placa: 'CX-35E', Motocicleta: 'AUTOMATICA VICTORY BLACK', Modelo: '2022', Color: 'NEGRO MATE', SOAT: 'NUEVO', Tecnomecánica: 'NUEVO', Traspasos: 'TRASPASOS', Precio: '$ 7.900.000' },
      { Placa: 'PF-99C', Motocicleta: 'FZ 16', Modelo: '2014', Color: 'PURPURA GRIS', SOAT: 'NUEVO', Tecnomecánica: 'SEPTIEMBRE', Traspasos: 'TRASPASOS', Precio: '$ 5.800.000' },
    ],
  },
  {
    id: 'products',
    name: 'Inventario de productos',
    description: 'Organiza existencias, costos y precios de venta fácilmente.',
    type: 'products',
    columns: ['Código', 'Producto', 'Categoría', 'Cantidad', 'Costo unitario', 'Precio de venta'],
    updatedAt: 'Plantilla de ejemplo',
    recordCount: 0,
    records: [],
  },
]
