'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'

interface Product {
  id: string
  name: string
  category: string
  image?: string
  artisan: { name: string }
}

const CATEGORIES = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'VAISSELLE', label: 'Vaisselle' },
  { value: 'VERRERIE', label: 'Verrerie' },
  { value: 'COUVERTS', label: 'Couverts' },
  { value: 'LINGE_DE_TABLE', label: 'Linge de table' },
  { value: 'DECORATION', label: 'Décoration' },
  { value: 'AUTRE', label: 'Autre' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const { show, ToastEl } = useToast()

  async function load(cat: string) {
    setLoading(true)
    const url = cat ? `/api/admin/products?category=${cat}` : '/api/admin/products'
    const res = await fetch(url)
    setProducts(await res.json())
    setLoading(false)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      show('Produit supprimé')
      setProducts(prev => prev.filter(p => p.id !== id))
    } else {
      show('Erreur lors de la suppression', 'error')
    }
  }

  useEffect(() => { load(category) }, [category])

  const categoryLabel = (val: string) =>
    CATEGORIES.find(c => c.value === val)?.label ?? val

  return (
    <>
      {ToastEl}
      <div className="admin-header">
        <h1 className="admin-header__title">Produits — Notre Sélection</h1>
        <div className="admin-header__actions">
          <Link href="/admin/products/new" className="admin-btn admin-btn--primary">
            <span className="material-symbols-outlined">add</span>
            Nouveau produit
          </Link>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <select
          className="admin-form__select"
          style={{ maxWidth: 280 }}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : products.length === 0 ? (
        <div className="admin-empty">
          <span className="material-symbols-outlined">inventory_2</span>
          <p>Aucun produit dans cette catégorie</p>
          <Link href="/admin/products/new" className="admin-btn admin-btn--primary">
            Ajouter un produit
          </Link>
        </div>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Artisan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="admin-table__img" />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)' }}>image</span>
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>
                    <span className="admin-table__badge">{categoryLabel(p.category)}</span>
                  </td>
                  <td>{p.artisan.name}</td>
                  <td>
                    <div className="admin-table__actions">
                      <Link href={`/admin/products/${p.id}`} className="admin-btn admin-btn--ghost">
                        <span className="material-symbols-outlined">edit</span>
                        Modifier
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDelete(p.id, p.name)}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}