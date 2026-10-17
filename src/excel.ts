import type { InventoryTemplate } from './types'

export interface WorkbookPreview {
  fileName: string
  sheets: string[]
  rowsBySheet: Record<string, string[][]>
}

export async function readWorkbook(file: File): Promise<WorkbookPreview> {
  const XLSX = await import('xlsx')
  const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array', cellDates: true })
  const rowsBySheet: Record<string, string[][]> = {}
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName]
    rowsBySheet[sheetName] = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, raw: false, defval: '' })
  })
  return { fileName: file.name, sheets: workbook.SheetNames, rowsBySheet }
}

export async function exportTemplate(template: InventoryTemplate): Promise<void> {
  const XLSX = await import('xlsx')
  const rows = [template.columns, ...template.records.map((record) => template.columns.map((column) => record[column] ?? ''))]
  const worksheet = XLSX.utils.aoa_to_sheet(rows)
  worksheet['!cols'] = template.columns.map((column) => ({ wch: Math.max(12, Math.min(32, column.length + 4)) }))
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario')
  XLSX.writeFile(workbook, `${template.name.replace(/[\\/:*?"<>|]/g, '-').trim() || 'inventario'}.xlsx`)
}
