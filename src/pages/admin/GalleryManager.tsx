import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Star, Search } from 'lucide-react';
import { GalleryRecord } from '../../types';
import { galleryApi } from '../../services/cms';
import { AdminModal } from '../../components/admin/AdminModal';
import {
  Spinner,
  PageHeader,
  PrimaryButton,
  OutlineButton,
  DangerButton,
  GhostEditButton,
  EmptyState,
  Field,
  TextInput,
  TextArea,
  ImageUploader,
  Checkbox,
  Toast,
  inputClass,
} from '../../components/admin/AdminUI';

const emptyItem: GalleryRecord = {
  title: '',
  description: '',
  imageUrl: '',
  thumbnailUrl: '',
  altText: '',
  featured: false,
  tags: [],
};

export const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryRecord | null>(null);
  const [form, setForm] = useState<GalleryRecord>(emptyItem);
  const [tagsDraft, setTagsDraft] = useState('');
  const [saving, setSaving] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await galleryApi.findAll();
      setItems(data || []);
    } catch (err) {
      console.error('Error loading gallery items:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filtered = items.filter(
    (item) =>
      !search ||
      (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyItem);
    setTagsDraft('');
    setModalOpen(true);
  };

  const openEdit = (item: GalleryRecord) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      thumbnailUrl: item.thumbnailUrl || '',
      altText: item.altText || '',
      featured: item.featured || false,
      tags: item.tags || [],
    });
    setTagsDraft('');
    setModalOpen(true);
  };

  const setField = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags || [] };
      if (editing?._id) {
        await galleryApi.update(editing._id, payload);
      } else {
        await galleryApi.create(payload);
      }
      setModalOpen(false);
      notify('Gallery item saved');
      loadItems();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save gallery item', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await galleryApi.remove(id);
      notify('Gallery item deleted');
      loadItems();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete gallery item', 'error');
    }
  };

  if (isLoading) return <Spinner label="Loading gallery..." />;

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Showcase your beautiful farm images"
        action={
          <PrimaryButton onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add Image
          </PrimaryButton>
        }
      />

      {/* Search */}
      <div className="mb-6 bg-white rounded-xl border border-stone-200 p-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gallery..."
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12">
          <EmptyState message="No images yet. Add your first image to the gallery." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <div key={item._id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative pb-[70%] overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {item.featured && (
                  <div className="absolute top-3 right-3 bg-[#15803D] text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#0F3020]">{item.title}</h3>
                <p className="text-sm text-stone-600 mt-1 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {(item.tags || []).map((tag) => (
                    <span key={tag} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <GhostEditButton onClick={() => openEdit(item)}>
                    <Pencil className="w-3 h-3" /> Edit
                  </GhostEditButton>
                  <DangerButton onClick={() => handleDelete(item._id!)}>
                    <Trash2 className="w-3 h-3" /> Delete
                  </DangerButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Update Gallery Image' : 'Add Gallery Image'}
        footer={
          <>
            <OutlineButton onClick={() => setModalOpen(false)}>Cancel</OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Update' : 'Save'}
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Title" required>
            <TextInput value={form.title} onChange={(e) => setField('title', e.target.value)} />
          </Field>
          <Field label="Description" required>
            <TextArea rows={3} value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </Field>
          <Field label="Image" required>
            <ImageUploader value={form.imageUrl} onChange={(url) => setField('imageUrl', url)} label="Gallery Image" />
          </Field>
          <Field label="Thumbnail URL" hint="Optional - leave blank to use the main image">
            <TextInput
              type="url"
              value={form.thumbnailUrl || ''}
              onChange={(e) => setField('thumbnailUrl', e.target.value)}
            />
          </Field>
          <Field label="Alt Text">
            <TextInput value={form.altText || ''} onChange={(e) => setField('altText', e.target.value)} />
          </Field>
          <Field label="Tags" hint="Comma separated, e.g. farm, cows, pasture">
            <input
              type="text"
              value={tagsDraft}
              onChange={(e) => setTagsDraft(e.target.value)}
              onBlur={() => {
                if (tagsDraft.trim()) {
                  setField('tags', [
                    ...(form.tags || []),
                    ...tagsDraft
                      .split(',')
                      .map((t) => t.trim())
                      .filter((t) => t && !(form.tags || []).includes(t)),
                  ]);
                  setTagsDraft('');
                }
              }}
              placeholder="farm, cows, pasture"
              className={inputClass}
            />
            {(form.tags || []).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {(form.tags || []).map((tag) => (
                  <span key={tag} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                    {tag}
                    <button
                      type="button"
                      onClick={() => setField('tags', (form.tags || []).filter((t) => t !== tag))}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>
          <Checkbox label="Featured image" checked={!!form.featured} onChange={(checked) => setField('featured', checked)} />
        </div>
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
