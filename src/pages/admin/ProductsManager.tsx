import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, X, Upload } from 'lucide-react';
import { ProductRecord, ProductVariant } from '../../types';
import { productsApi } from '../../services/cms';
import { uploadMultipleImages } from '../../services/cloudinary';
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
  NumberInput,
  Checkbox,
  Toast,
  inputClass,
} from '../../components/admin/AdminUI';

const AVAILABLE_CATEGORIES = [
  'Fresh Milk',
  'Yogurt',
  'Cheese',
  'Butter',
  'Cream',
  'Organic Products',
];

const emptyProduct: ProductRecord = {
  name: '',
  description: '',
  price: 0,
  categories: [],
  images: [],
  variants: [],
  isActive: true,
  brand: '',
  specifications: {},
};

const emptyVariant: ProductVariant = { name: '', sku: '', price: 0, stockQuantity: 0 };

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRecord | null>(null);
  const [form, setForm] = useState<ProductRecord>(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await productsApi.getAll();
      setProducts(data || []);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filtered = products.filter((product) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      (product.name || '').toLowerCase().includes(query) ||
      (product.description || '').toLowerCase().includes(query) ||
      (product.brand || '').toLowerCase().includes(query);
    const matchesCategory = !categoryFilter || (product.categories || []).includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyProduct });
    setModalOpen(true);
  };

  const openEdit = (product: ProductRecord) => {
    setEditing(product);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      categories: product.categories || [],
      images: product.images || [],
      variants: product.variants || [],
      isActive: product.isActive ?? true,
      brand: product.brand || '',
      specifications: product.specifications || {},
    });
    setModalOpen(true);
  };

  const setField = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const toggleCategory = (category: string) => {
    const current = form.categories || [];
    setField('categories', current.includes(category) ? current.filter((c) => c !== category) : [...current, category]);
  };

  const handleImagesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    try {
      const urls = await uploadMultipleImages(Array.from(files));
      setField('images', [...(form.images || []), ...urls]);
    } catch (err) {
      console.error('Image upload failed:', err);
      notify('Image upload failed', 'error');
    } finally {
      setUploadingImages(false);
    }
  };

  const updateVariant = (index: number, key: string, value: unknown) => {
    const variants = [...(form.variants || [])];
    variants[index] = { ...variants[index], [key]: value };
    setField('variants', variants);
  };

  const updateSpec = (key: string, value: string) => {
    const specs = { ...(form.specifications || {}) };
    if (value === '') delete specs[key];
    else specs[key] = value;
    setField('specifications', specs);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const id = editing?._id || editing?.id;
      if (id) {
        await productsApi.update(id, form);
      } else {
        await productsApi.create(form);
      }
      setModalOpen(false);
      notify('Product saved');
      loadProducts();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save product', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: ProductRecord) => {
    const id = product._id || product.id;
    if (!id || !confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsApi.remove(id);
      notify('Product deleted');
      loadProducts();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete product', 'error');
    }
  };

  const formatPrice = (price: number) => `KSh ${Number(price || 0).toLocaleString('en-KE')}`;

  if (isLoading) return <Spinner label="Loading products..." />;

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage product catalog, pricing and inventory"
        action={
          <PrimaryButton onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add Product
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
            placeholder="Search products..."
            className={`${inputClass} pl-9`}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${inputClass} md:w-52`}
        >
          <option value="">All Categories</option>
          {AVAILABLE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12">
          <EmptyState message="No products found. Add your first product!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <div key={product._id || product.id} className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <img
                src={(product.images && product.images[0]) || '/logo.svg'}
                alt={product.name}
                className="w-full h-44 object-cover bg-stone-100"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#0F3020] line-clamp-1">{product.name}</h3>
                  <span
                    className={`shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${
                      product.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-stone-600 mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#15803D]">{formatPrice(product.price)}</p>
                    <p className="text-xs text-stone-400">{product.brand}</p>
                  </div>
                  <div className="flex gap-2">
                    <GhostEditButton onClick={() => openEdit(product)}>
                      <Pencil className="w-3 h-3" /> Edit
                    </GhostEditButton>
                    <DangerButton onClick={() => handleDelete(product)}>
                      <Trash2 className="w-3 h-3" />
                    </DangerButton>
                  </div>
                </div>
                {(product.categories || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.categories.map((category) => (
                      <span key={category} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Update Product' : 'Create New Product'}
        maxWidth="max-w-3xl"
        footer={
          <>
            <OutlineButton onClick={() => setModalOpen(false)}>Cancel</OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" required>
              <TextInput value={form.name} onChange={(e) => setField('name', e.target.value)} />
            </Field>
            <Field label="Brand" required>
              <TextInput value={form.brand || ''} onChange={(e) => setField('brand', e.target.value)} />
            </Field>
          </div>
          <Field label="Description" required>
            <TextArea rows={3} value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </Field>
          <Field label="Price (KSh)" required>
            <NumberInput value={form.price} onChange={(e) => setField('price', Number(e.target.value))} />
          </Field>

          <Field label="Categories" required hint="Select one or more categories">
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CATEGORIES.map((category) => {
                const active = (form.categories || []).includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-[#15803D] text-white border-[#15803D]'
                        : 'bg-white text-stone-600 border-stone-300 hover:border-[#15803D]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Images">
            <div className="flex flex-wrap gap-3 items-center">
              {(form.images || []).map((url) => (
                <div key={url} className="relative">
                  <img src={url} alt="Product" className="h-20 w-20 object-cover rounded-lg border border-stone-200" />
                  <button
                    type="button"
                    onClick={() => setField('images', (form.images || []).filter((u) => u !== url))}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploadingImages}
                className="h-20 w-20 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center gap-1 text-stone-400 hover:border-[#15803D] hover:text-[#15803D] transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span className="text-[10px] font-medium">{uploadingImages ? 'Uploading...' : 'Add'}</span>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImagesSelected(e.target.files)}
              />
            </div>
          </Field>

          <Field label="Variants" hint="Optional size/packaging variants">
            <div className="space-y-3">
              {(form.variants || []).map((variant, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center">
                  <TextInput
                    placeholder="Name (e.g. 500ml)"
                    value={variant.name}
                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                    className="md:col-span-2"
                  />
                  <TextInput
                    placeholder="SKU"
                    value={variant.sku}
                    onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                  />
                  <NumberInput
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => updateVariant(index, 'price', Number(e.target.value))}
                  />
                  <div className="flex items-center gap-2">
                    <NumberInput
                      placeholder="Stock"
                      value={variant.stockQuantity}
                      onChange={(e) => updateVariant(index, 'stockQuantity', Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => setField('variants', (form.variants || []).filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <OutlineButton type="button" onClick={() => setField('variants', [...(form.variants || []), { ...emptyVariant }])}>
                <Plus className="w-4 h-4" /> Add Variant
              </OutlineButton>
            </div>
          </Field>

          <Checkbox label="Active (visible on store)" checked={form.isActive ?? true} onChange={(checked) => setField('isActive', checked)} />

          <Field label="Specifications" hint="Optional key-value pairs, e.g. Butterfat: 3.5%">
            <div className="space-y-2">
              {Object.entries(form.specifications || {}).map(([key, value], index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <TextInput
                    value={key}
                    onChange={(e) => {
                      const specs = { ...(form.specifications || {}) };
                      delete specs[key];
                      specs[e.target.value] = value;
                      setField('specifications', specs);
                    }}
                    placeholder="Key"
                  />
                  <div className="flex items-center gap-2">
                    <TextInput value={value} onChange={(e) => updateSpec(key, e.target.value)} placeholder="Value" />
                    <button
                      type="button"
                      onClick={() => {
                        const specs = { ...(form.specifications || {}) };
                        delete specs[key];
                        setField('specifications', specs);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <OutlineButton
                type="button"
                onClick={() => {
                  const specs = { ...(form.specifications || {}) };
                  specs['New Key'] = '';
                  setField('specifications', specs);
                }}
              >
                <Plus className="w-4 h-4" /> Add Specification
              </OutlineButton>
            </div>
          </Field>
        </div>
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
