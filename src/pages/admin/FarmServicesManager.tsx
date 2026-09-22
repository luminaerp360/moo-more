import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { FarmServiceRecord } from '../../types';
import { farmServicesApi } from '../../services/cms';
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
  TagInput,
  Toast,
} from '../../components/admin/AdminUI';

const emptyService: FarmServiceRecord = {
  title: '',
  description: '',
  icon: 'fas fa-store',
  image: '',
  features: [],
};

export const FarmServicesManager: React.FC = () => {
  const [services, setServices] = useState<FarmServiceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FarmServiceRecord | null>(null);
  const [form, setForm] = useState<FarmServiceRecord>(emptyService);
  const [saving, setSaving] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await farmServicesApi.getAll();
      setServices(data || []);
    } catch (err) {
      console.error('Error loading farm services:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyService);
    setModalOpen(true);
  };

  const openEdit = (service: FarmServiceRecord) => {
    setEditing(service);
    setForm({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || '',
      image: service.image || '',
      features: service.features || [],
    });
    setModalOpen(true);
  };

  const setField = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?._id) {
        await farmServicesApi.update(editing._id, form);
      } else {
        await farmServicesApi.create(form);
      }
      setModalOpen(false);
      notify('Service saved successfully');
      loadServices();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save service', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await farmServicesApi.remove(id);
      notify('Service deleted');
      loadServices();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete service', 'error');
    }
  };

  if (isLoading) return <Spinner label="Loading farm services..." />;

  return (
    <div>
      <PageHeader
        title="Farm Services"
        subtitle="Manage the services your farm offers"
        action={
          <PrimaryButton onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add New Service
          </PrimaryButton>
        }
      />

      {services.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12">
          <EmptyState message="No farm services available. Add your first service!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <img
                src={service.image || '/logo.svg'}
                alt={service.title}
                className="w-full h-44 object-cover bg-stone-100"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className={`${service.icon} text-[#15803D]`} />
                  <h3 className="text-lg font-semibold text-[#0F3020]">{service.title}</h3>
                </div>
                <p className="text-sm text-stone-600 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(service.features || []).map((feature) => (
                    <span key={feature} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <GhostEditButton onClick={() => openEdit(service)}>
                    <Pencil className="w-3 h-3" /> Edit
                  </GhostEditButton>
                  <DangerButton onClick={() => handleDelete(service._id!)}>
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
        title={editing ? 'Update Farm Service' : 'Create New Farm Service'}
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
          <Field label="Title" required>
            <TextInput value={form.title} onChange={(e) => setField('title', e.target.value)} />
          </Field>
          <Field label="Description" required>
            <TextArea rows={4} value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </Field>
          <Field label="Icon Class" required hint="e.g., fas fa-store, fas fa-truck">
            <TextInput value={form.icon} onChange={(e) => setField('icon', e.target.value)} />
          </Field>
          <Field label="Features">
            <TagInput
              tags={form.features || []}
              onChange={(tags) => setField('features', tags)}
              placeholder="Add feature (press Enter)"
            />
          </Field>
          <Field label="Service Image">
            <ImageUploader value={form.image || ''} onChange={(url) => setField('image', url)} label="Service Image" />
          </Field>
        </div>
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
