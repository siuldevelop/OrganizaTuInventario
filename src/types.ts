export type TemplateType = 'motorcycles' | 'products'

export interface InventoryTemplate {
  id: string
  name: string
  description: string
  type: TemplateType
  columns: string[]
  updatedAt: string
  recordCount: number
  records: Record<string, string>[]
  createdAt?: number
  updatedAtMs?: number
  isExample?: boolean
}
