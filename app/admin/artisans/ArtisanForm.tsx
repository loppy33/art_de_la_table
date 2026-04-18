'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'
import ImageUpload from '../components/ImageUpload'


interface Props {
    id?: string // если есть — режим редактирования
}

function slugify(str: string) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export default function ArtisanForm({ id }: Props) {
    const router = useRouter()
    const { show, ToastEl } = useToast()
    const isEdit = !!id

    const [form, setForm] = useState({
        name: '',
        slug: '',
        logo: '',
        history: '',
        featured: false,
    })
    const [slugTouched, setSlugTouched] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!isEdit) return
        fetch(`/api/admin/artisans/${id}`)
            .then(r => r.json())
            .then(data => {
                setForm({
                    name: data.name ?? '',
                    slug: data.slug ?? '',
                    logo: data.logo ?? '',
                    history: data.history ?? '',
                    featured: data.featured ?? false,
                })
                setSlugTouched(true)
            })
    }, [id])

    function set(key: string, value: string | boolean) {
        setForm(prev => {
            const next = { ...prev, [key]: value }
            if (key === 'name' && !slugTouched) {
                next.slug = slugify(value as string)
            }
            return next
        })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        const method = isEdit ? 'PATCH' : 'POST'
        const url = isEdit ? `/api/admin/artisans/${id}` : '/api/admin/artisans'

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (res.ok) {
            show(isEdit ? 'Artisan mis à jour' : 'Artisan créé')
            setTimeout(() => router.push('/admin/artisans'), 1000)
        } else {
            const err = await res.json()
            show(err.error || 'Une erreur est survenue', 'error')
        }
        setSaving(false)
    }

    return (
        <>
            {ToastEl}
            <div className="admin-header">
                <h1 className="admin-header__title">
                    {isEdit ? "Modifier l'artisan" : 'Nouvel artisan'}
                </h1>
                <Link href="/admin/artisans" className="admin-btn admin-btn--ghost">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Retour
                </Link>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="admin-form__section">
                    <h2 className="admin-form__section-title">Informations générales</h2>

                    <div className="admin-form__row">
                        <div className="admin-form__field">
                            <label className="admin-form__label">Nom *</label>
                            <input
                                className="admin-form__input"
                                value={form.name}
                                onChange={e => set('name', e.target.value)}
                                required
                                placeholder="ex: Ateliers Riou"
                            />
                        </div>
                        <div className="admin-form__field">
                            <label className="admin-form__label">Slug *</label>
                            <input
                                className="admin-form__input"
                                value={form.slug}
                                onChange={e => {
                                    setSlugTouched(true)
                                    set('slug', e.target.value)
                                }}
                                required
                                placeholder="ex: ateliers-riou"
                            />
                        </div>
                    </div>

                    <div className="admin-form__field">
                        <label className="admin-form__label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={e => set('featured', e.target.checked)}
                            />
                            Mettre en avant (partenaire prioritaire)
                        </label>
                    </div>
                </div>

                <div className="admin-form__section">
                    <h2 className="admin-form__section-title">Logo</h2>
                    <ImageUpload
                        value={form.logo}
                        onChange={url => set('logo', url)}
                        folder="artisans"
                    />
                </div>

                <div className="admin-form__section">
                    <h2 className="admin-form__section-title">Histoire de l'artisan</h2>
                    <div className="admin-form__field">
                        <label className="admin-form__label">Texte de présentation</label>
                        <textarea
                            className="admin-form__textarea"
                            value={form.history}
                            onChange={e => set('history', e.target.value)}
                            placeholder="Racontez l'histoire de l'artisan, son savoir-faire, ses valeurs…"
                            rows={6}
                        />
                    </div>
                </div>

                <div className="admin-form__actions">
                    <Link href="/admin/artisans" className="admin-btn admin-btn--ghost">
                        Annuler
                    </Link>
                    <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                        {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : "Créer l'artisan"}
                    </button>
                </div>
            </form>
        </>
    )
}