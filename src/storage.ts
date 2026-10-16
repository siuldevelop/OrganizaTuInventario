import type { InventoryTemplate } from './types'
import { starterTemplates } from './data'

const DATABASE_NAME = 'organiza-tu-inventario'
const DATABASE_VERSION = 1
const STORE_NAME = 'templates'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
    request.onerror = () => reject(request.error ?? new Error('No se pudo abrir el almacenamiento local.'))
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME, { keyPath: 'id' })
    }
    request.onsuccess = () => resolve(request.result)
  })
}

export async function loadTemplates(): Promise<InventoryTemplate[]> {
  const database = await openDatabase()
  const templates = await new Promise<InventoryTemplate[]>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result as InventoryTemplate[])
  })
  database.close()
  if (templates.length > 0) return templates.map((template, index) => ({ ...template, createdAt: template.createdAt ?? index }))
  await Promise.all(starterTemplates.map((template) => saveTemplate(template)))
  return starterTemplates.map((template) => ({ ...template, records: template.records.map((record) => ({ ...record })) }))
}

export async function saveTemplate(template: InventoryTemplate): Promise<void> {
  const database = await openDatabase()
  await new Promise<void>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(template)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
  database.close()
}

export async function deleteTemplate(id: string): Promise<void> {
  const database = await openDatabase()
  await new Promise<void>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(id)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
  database.close()
}
