import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { CategoryRecord } from '../../types';
import { categoriesApi } from '../../services/cms';
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

const emptyCategory: CategoryRecord = {
  name: '',
  description: '',
  parent: null,
  image: '',
  isActive: true,
};

export const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRecord | null>(null);
  const [form, setForm] = useState<CategoryRecord>(emptyCategory);
  const [saving, setSaving] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await categoriesApi.getAll();
      setCategories(data || []);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filtered = categories.filter((category) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      (category.name || '').toLowerCase().includes(query) ||
      (category.description || '').toLowerCase().includes(query);
    const matchesStatus = statusFilter === '' || category.isActive === (statusFilter === 'true');
    return matchesSearch && matchesStatus;
  });

  const getParentName = (category: CategoryRecord): string => {
    if (!category.parent) return 'None';
    if (typeof category.parent === 'string') return category.parent;
    return category.parent.name || 'None';
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyCategory });
    setModalOpen(true);
  };

  const openEdit = (category: CategoryRecord) => {
    setEditing(category);
    setForm({
      name: category.name || '',
      description: category.description || '',
      parent: category.parent || null,
      image: category.image || '',
      isActive: category.isActive ?? true,
    });
    setModalOpen(true);
  };

  const setField = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        parent: form.parent || undefined,
      };
      if (editing?._id) {
        await categoriesApi.update(editing._id, payload);
      } else {
        await categoriesApi.create(payload);
      }
      setModalOpen(false);
      notify('Category saved');
      loadCategories();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save category', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoriesApi.remove(id);
      notify('Category deleted');
      loadCategories();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete category', 'error');
    }
  };

  const parentOptions = categories.filter((category) => !editing || category._id !== editing._id);

  if (isLoading) return <Spinner label="Loading categories..." />;

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Organize and manage product categories"
        action={
          <PrimaryButton onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add Category
          </PrimaryButton>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className={`${inputClass} pl-9`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${inputClass} md:w-48`}
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12">
          <EmptyState message="No categories found. Add your first category!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((category) => (
            <div key={category._id} className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                {category.image ? (
                  <img src={category.image} alt={category.name} className="h-14 w-14 object-cover rounded-lg shrink-0" />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-emerald-50 text-[#15803D] flex items-center justify-center font-bold text-lg shrink-0">
                    {(category.name || '?').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#0F3020] truncate">{category.name}</h3>
                  <p className="text-xs text-stone-400">Parent: {getParentName(category)}</p>
                </div>
                <span
                  className={`ml-auto shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${
                    category.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {category.description && (
                <p className="px-4 pb-3 text-sm text-stone-600 line-clamp-2">{category.description}</p>
              )}
              <div className="px-4 pb-4 flex justify-end gap-2">
                <GhostEditButton onClick={() => openEdit(category)}>
                  <Pencil className="w-3 h-3" /> Edit
                </GhostEditButton>
                <DangerButton onClick={() => handleDelete(category._id!)}>
                  <Trash2 className="w-3 h-3" />
                </DangerButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Update Category' : 'Create New Category'}
        footer={
          <>
            <OutlineButton onClick={() => setModalOpen(false)}>Cancel</OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Name" required>
            <TextInput value={form.name} onChange={(e) => setField('name', e.target.value)} />
          </Field>
          <Field label="Description">
            <TextArea rows={3} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
          </Field>
          <Field label="Parent Category">
            <select
              value={typeof form.parent === 'object' && form.parent ? (form.parent as any)._id || '' : (form.parent as string) || ''}
              onChange={(e) => {
                const selected = parentOptions.find((c) => c._id === e.target.value);
                setField('parent', selected ? selected._id : null);
              }}
              className={inputClass}
            >
              <option value="">None (top level)</option>
              {parentOptions.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Image">
            <ImageUploader value={form.image || ''} onChange={(url) => setField('image', url)} label="Category Image" />
          </Field>
          <Checkbox label="Active" checked={form.isActive ?? true} onChange={(checked) => setField('isActive', checked)} />
        </div>
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
