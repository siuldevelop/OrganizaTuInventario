import { useEffect, useMemo, useState } from 'react'
import { Archive, ArrowLeft, Bell, ChevronRight, Copy, FileSpreadsheet, LayoutGrid, MoreHorizontal, Pencil, Plus, Search, Settings2, Trash2, Upload, X } from 'lucide-react'
import { starterTemplates } from './data'
import type { InventoryTemplate } from './types'

function App() {
  const [templates, setTemplates] = useState(starterTemplates)
  const [query, setQuery] = useState('')
  const [activeTemplate, setActiveTemplate] = useState<InventoryTemplate | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    const openFromUrl = () => {
      const templateId = window.location.hash.startsWith('#plantilla/') ? window.location.hash.slice('#plantilla/'.length) : null
      setActiveTemplate(templates.find((template) => template.id === templateId) ?? null)
    }

    openFromUrl()
    window.addEventListener('popstate', openFromUrl)
    window.addEventListener('hashchange', openFromUrl)
    return () => {
      window.removeEventListener('popstate', openFromUrl)
      window.removeEventListener('hashchange', openFromUrl)
    }
  }, [templates])

  const filteredTemplates = useMemo(() => templates.filter((template) =>
    template.name.toLowerCase().includes(query.toLowerCase()) || template.description.toLowerCase().includes(query.toLowerCase()),
  ), [query, templates])

  const showPending = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(null), 4000)
  }

  const duplicateTemplate = (template: InventoryTemplate) => {
    const copy = { ...template, id: `${template.id}-${Date.now()}`, name: `${template.name} (copia)`, updatedAt: 'Creada ahora', records: template.records.map((record) => ({ ...record })) }
    setTemplates((current) => [...current, copy])
    showPending('Plantilla duplicada como copia independiente. El guardado definitivo estará disponible en la siguiente fase.')
  }

  const openTemplate = (template: InventoryTemplate) => {
    window.history.pushState({ templateId: template.id }, '', `#plantilla/${template.id}`)
    setActiveTemplate(template)
  }

  const closeEditor = () => {
    if (window.location.hash.startsWith('#plantilla/')) {
      window.history.back()
    } else {
      setActiveTemplate(null)
    }
  }

  if (activeTemplate) {
    return <EditorPlaceholder template={activeTemplate} onBack={closeEditor} onPending={showPending} notice={notice} />
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Ir al inicio"><span className="brand-mark"><Archive size={21} /></span><span>OrganizaTu<span>Inventario</span></span></a>
        <div className="topbar-actions"><button className="icon-button" aria-label="Notificaciones"><Bell size={19} /></button><div className="avatar">GU</div></div>
      </header>
      <main className="main-content">
        <div className="page-heading"><div><p className="eyebrow">Tu espacio de trabajo</p><h1>Mis plantillas</h1><p className="subtitle">Crea y reutiliza estructuras para mantener tus inventarios organizados.</p></div><button className="primary-button" onClick={() => showPending('La creación de plantillas estará disponible en la siguiente fase.')}><Plus size={18} /> Crear plantilla</button></div>
        <div className="toolbar"><label className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar plantillas" aria-label="Buscar plantillas" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={16} /></button>}</label><button className="secondary-button" onClick={() => showPending('La importación de Excel estará disponible en una fase posterior.')}><Upload size={17} /> Importar Excel</button></div>
        <section className="template-section"><div className="section-heading"><div><h2>Plantillas disponibles</h2><p>{filteredTemplates.length} {filteredTemplates.length === 1 ? 'plantilla' : 'plantillas'} listas para usar</p></div><button className="view-button" aria-label="Vista de cuadrícula"><LayoutGrid size={18} /></button></div>{filteredTemplates.length > 0 ? <div className="template-grid">{filteredTemplates.map((template) => <TemplateCard key={template.id} template={template} onOpen={() => openTemplate(template)} onDuplicate={() => duplicateTemplate(template)} onPending={showPending} />)}</div> : <EmptyState onClear={() => setQuery('')} />}</section>
        <div className="local-note"><div className="note-icon"><Settings2 size={18} /></div><div><strong>Tus datos son locales</strong><p>En esta primera versión, tus inventarios se guardarán en este navegador. No necesitas crear una cuenta.</p></div></div>
      </main>{notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => setNotice(null)} aria-label="Cerrar aviso"><X size={16} /></button></div>}
    </div>
  )
}

function TemplateCard({ template, onOpen, onDuplicate, onPending }: { template: InventoryTemplate; onOpen: () => void; onDuplicate: () => void; onPending: (message: string) => void }) {
  return <article className="template-card"><div className={`card-icon ${template.type}`}><FileSpreadsheet size={24} /></div><div className="card-body"><div className="card-title-row"><h3>{template.name}</h3><button className="icon-button small" onClick={() => onPending('Las acciones adicionales estarán disponibles en la siguiente fase.')} aria-label={`Más opciones para ${template.name}`}><MoreHorizontal size={19} /></button></div><p>{template.description}</p><div className="card-meta"><span>{template.columns.length} columnas</span><span className="dot">·</span><span>{template.recordCount} registros</span></div><div className="card-footer"><span className="updated">{template.updatedAt}</span><button className="open-link" onClick={onOpen}>Abrir plantilla <ChevronRight size={16} /></button></div></div><div className="card-actions"><button onClick={onOpen}><Pencil size={15} /> Abrir</button><button onClick={onDuplicate}><Copy size={15} /> Duplicar</button><button onClick={() => onPending('Renombrar y eliminar plantillas estarán disponibles en la siguiente fase.')}><Trash2 size={15} /> Eliminar</button></div></article>
}

function EmptyState({ onClear }: { onClear: () => void }) { return <div className="empty-state"><Search size={30} /><h3>No encontramos plantillas</h3><p>Prueba con otro término de búsqueda.</p><button className="secondary-button" onClick={onClear}>Limpiar búsqueda</button></div> }

function EditorPlaceholder({ template, onBack, onPending, notice }: { template: InventoryTemplate; onBack: () => void; onPending: (message: string) => void; notice: string | null }) { return <div className="app-shell"><header className="topbar"><button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Mis plantillas</button><div className="brand compact"><span className="brand-mark"><Archive size={21} /></span><span>OrganizaTu<span>Inventario</span></span></div><div className="avatar">GU</div></header><main className="editor-content"><div className="editor-heading"><div><p className="eyebrow">Plantilla</p><h1>{template.name}</h1><p className="subtitle">El editor de inventario estará disponible en la Fase 2.</p></div><button className="primary-button" onClick={() => onPending('La edición de registros estará disponible en la siguiente fase.')}><Plus size={18} /> Nueva fila</button></div><div className="editor-toolbar"><label className="search-field"><Search size={18} /><input placeholder="Buscar registros" disabled /></label><div className="toolbar-actions"><button className="secondary-button" onClick={() => onPending('La importación de Excel estará disponible en una fase posterior.')}><Upload size={17} /> Importar Excel</button><button className="secondary-button" onClick={() => onPending('La exportación de Excel estará disponible en una fase posterior.')}><FileSpreadsheet size={17} /> Exportar Excel</button></div></div><div className="table-preview"><div className="table-preview-header"><strong>Vista previa de columnas · {template.records.length} registros de ejemplo</strong><button className="secondary-button" onClick={() => onPending('La gestión de columnas estará disponible en la siguiente fase.')}><Settings2 size={16} /> Gestionar columnas</button></div><div className="table-scroll"><table><thead><tr>{template.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{template.records.length > 0 ? template.records.map((record, index) => <tr key={`${template.id}-record-${index}`}>{template.columns.map((column) => <td key={column}>{record[column] || '—'}</td>)}</tr>) : <tr><td colSpan={template.columns.length}><div className="table-empty"><FileSpreadsheet size={28} /><strong>Aún no hay registros</strong><span>Agrega filas o importa un archivo para comenzar.</span></div></td></tr>}</tbody></table></div></div>{notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => onPending('')} aria-label="Cerrar aviso"><X size={16} /></button></div>}</main></div> }

export default App
