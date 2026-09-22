import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { HeroSection, SpecialOffer, StatsCounter, NewsletterSection } from '../../types';
import { homeContentApi } from '../../services/cms';
import { AdminModal } from '../../components/admin/AdminModal';
import {
  Spinner,
  PageHeader,
  Card,
  PrimaryButton,
  OutlineButton,
  DangerButton,
  GhostEditButton,
  EmptyState,
  Field,
  TextInput,
  TextArea,
  NumberInput,
  ImageUploader,
  Toast,
} from '../../components/admin/AdminUI';

type SectionKind = 'hero' | 'specialOffer' | 'statsCounter' | 'newsletter';

const emptySpecialOffer: SpecialOffer = {
  title: '',
  description: '',
  imageUrl: '',
  buttonText: '',
  order: 0,
};

const emptyStatsCounter: StatsCounter = {
  title: '',
  value: 0,
  subtitle: '',
  icon: 'fas fa-chart-line',
  order: 0,
};

export const HomeContentManager: React.FC = () => {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [counters, setCounters] = useState<StatsCounter[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Modal state
  const [modal, setModal] = useState<{ section: SectionKind; data: any } | null>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const [heroData, offersData, countersData, newsletterData] = await Promise.allSettled([
        homeContentApi.getHeroSection(),
        homeContentApi.getSpecialOffers(),
        homeContentApi.getStatsCounters(),
        homeContentApi.getNewsletterSection(),
      ]);
      if (heroData.status === 'fulfilled') setHero(heroData.value);
      if (offersData.status === 'fulfilled') setOffers(offersData.value || []);
      if (countersData.status === 'fulfilled') setCounters(countersData.value || []);
      if (newsletterData.status === 'fulfilled') setNewsletter(newsletterData.value);
    } catch (err) {
      console.error('Error loading home content:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const openEdit = (section: SectionKind, data: any) => {
    setForm({ ...data });
    setModal({ section, data });
  };

  const handleSave = async () => {
    if (!modal) return;
    setSaving(true);
    try {
      switch (modal.section) {
        case 'hero':
          await homeContentApi.updateHeroSection(form);
          break;
        case 'specialOffer':
          if (modal.data?._id) {
            await homeContentApi.updateSpecialOffer(modal.data._id, form);
          } else {
            await homeContentApi.createSpecialOffer(form);
          }
          break;
        case 'statsCounter':
          if (modal.data?._id) {
            await homeContentApi.updateStatsCounter(modal.data._id, form);
          } else {
            await homeContentApi.createStatsCounter(form);
          }
          break;
        case 'newsletter':
          await homeContentApi.updateNewsletterSection(form);
          break;
      }
      setModal(null);
      notify('Changes saved successfully');
      loadContent();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (section: 'specialOffer' | 'statsCounter', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      if (section === 'specialOffer') {
        await homeContentApi.deleteSpecialOffer(id);
      } else {
        await homeContentApi.deleteStatsCounter(id);
      }
      notify('Deleted successfully');
      loadContent();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete', 'error');
    }
  };

  const setField = (key: string, value: unknown) => setForm((f: any) => ({ ...f, [key]: value }));

  const renderFormFields = () => {
    if (!modal) return null;
    switch (modal.section) {
      case 'hero':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <Field label="Image" required>
              <ImageUploader value={form.imageUrl || ''} onChange={(url) => setField('imageUrl', url)} label="Hero Image" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Primary Button Text" required>
                <TextInput value={form.primaryButtonText || ''} onChange={(e) => setField('primaryButtonText', e.target.value)} />
              </Field>
              <Field label="Secondary Button Text" required>
                <TextInput value={form.secondaryButtonText || ''} onChange={(e) => setField('secondaryButtonText', e.target.value)} />
              </Field>
            </div>
          </div>
        );
      case 'specialOffer':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <Field label="Image" required>
              <ImageUploader value={form.imageUrl || ''} onChange={(url) => setField('imageUrl', url)} label="Offer Image" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button Text" required>
                <TextInput value={form.buttonText || ''} onChange={(e) => setField('buttonText', e.target.value)} />
              </Field>
              <Field label="Order" required>
                <NumberInput value={form.order ?? 0} onChange={(e) => setField('order', Number(e.target.value))} />
              </Field>
            </div>
          </div>
        );
      case 'statsCounter':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Value" required>
                <NumberInput value={form.value ?? 0} onChange={(e) => setField('value', Number(e.target.value))} />
              </Field>
              <Field label="Order" required>
                <NumberInput value={form.order ?? 0} onChange={(e) => setField('order', Number(e.target.value))} />
              </Field>
            </div>
            <Field label="Subtitle" required>
              <TextInput value={form.subtitle || ''} onChange={(e) => setField('subtitle', e.target.value)} />
            </Field>
            <Field label="Icon" required hint="e.g., fas fa-users, fas fa-flask">
              <TextInput value={form.icon || ''} onChange={(e) => setField('icon', e.target.value)} />
            </Field>
          </div>
        );
      case 'newsletter':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button Text" required>
                <TextInput value={form.buttonText || ''} onChange={(e) => setField('buttonText', e.target.value)} />
              </Field>
              <Field label="Placeholder Text" required>
                <TextInput value={form.placeholderText || ''} onChange={(e) => setField('placeholderText', e.target.value)} />
              </Field>
            </div>
          </div>
        );
    }
  };

  if (isLoading) return <Spinner label="Loading home content..." />;

  return (
    <div>
      <PageHeader
        title="Manage Home Content"
        subtitle="Edit the content shown on the homepage of your website"
      />

      <div className="space-y-6">
        {/* Hero Section */}
        <Card
          title="Hero Section"
          action={
            <PrimaryButton onClick={() => openEdit('hero', hero)}>
              Edit Hero Section
            </PrimaryButton>
          }
        >
          {hero ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <img src={hero.imageUrl} alt="Hero" className="w-full h-48 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-[#0F3020]">{hero.title}</h3>
                <p className="text-sm text-stone-600 mt-2">{hero.description}</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded">Primary: {hero.primaryButtonText}</span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded">Secondary: {hero.secondaryButtonText}</span>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState message="No hero section data found." />
          )}
        </Card>

        {/* Special Offers */}
        <Card
          title="Special Offers"
          action={
            <PrimaryButton onClick={() => openEdit('specialOffer', emptySpecialOffer)}>
              <Plus className="w-4 h-4" /> Add Offer
            </PrimaryButton>
          }
        >
          {offers.length === 0 ? (
            <EmptyState message="No special offers found." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {offers.map((offer) => (
                <div key={offer._id} className="border border-stone-200 rounded-lg p-4 bg-stone-50">
                  <img src={offer.imageUrl} alt={offer.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                  <h3 className="font-semibold text-stone-800">{offer.title}</h3>
                  <p className="text-sm text-stone-600 mt-1">{offer.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                      Button: {offer.buttonText}
                    </span>
                    <div className="flex gap-2">
                      <GhostEditButton onClick={() => openEdit('specialOffer', offer)}>
                        <Pencil className="w-3 h-3" /> Edit
                      </GhostEditButton>
                      <DangerButton onClick={() => handleDelete('specialOffer', offer._id!)}>
                        <Trash2 className="w-3 h-3" /> Delete
                      </DangerButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Stats Counters */}
        <Card
          title="Stats Counters"
          action={
            <PrimaryButton onClick={() => openEdit('statsCounter', emptyStatsCounter)}>
              <Plus className="w-4 h-4" /> Add Counter
            </PrimaryButton>
          }
        >
          {counters.length === 0 ? (
            <EmptyState message="No stats counters found." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {counters.map((stat) => (
                <div key={stat._id} className="border border-stone-200 rounded-lg p-4 text-center bg-stone-50">
                  <i className={`${stat.icon} text-2xl text-[#15803D]`} />
                  <h3 className="font-bold text-2xl text-stone-800 mt-2">{stat.value}+</h3>
                  <p className="text-sm font-semibold text-stone-700 mt-0.5">{stat.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{stat.subtitle}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    <GhostEditButton onClick={() => openEdit('statsCounter', stat)}>
                      <Pencil className="w-3 h-3" />
                    </GhostEditButton>
                    <DangerButton onClick={() => handleDelete('statsCounter', stat._id!)}>
                      <Trash2 className="w-3 h-3" />
                    </DangerButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Newsletter Section */}
        <Card
          title="Newsletter Section"
          action={
            <PrimaryButton onClick={() => openEdit('newsletter', newsletter)}>
              Edit Newsletter
            </PrimaryButton>
          }
        >
          {newsletter ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase">Title</span>
                <p className="text-stone-800">{newsletter.title || '—'}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase">Description</span>
                <p className="text-stone-800">{newsletter.description || '—'}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase">Placeholder</span>
                <p className="text-stone-800">{newsletter.placeholderText || '—'}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase">Button</span>
                <p className="text-stone-800">{newsletter.buttonText || '—'}</p>
              </div>
            </div>
          ) : (
            <EmptyState message="No newsletter data found." />
          )}
        </Card>
      </div>

      <AdminModal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={`${modal?.data?._id ? 'Edit' : modal?.section === 'hero' || modal?.section === 'newsletter' ? 'Edit' : 'Add'} ${modal?.section ?? ''} content`}
        footer={
          <>
            <OutlineButton onClick={() => setModal(null)}>Cancel</OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </PrimaryButton>
          </>
        }
      >
        {renderFormFields()}
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
