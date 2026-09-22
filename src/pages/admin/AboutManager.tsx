import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AboutHero, CompanyStat, CompanyValue, Milestone, CompanyMission } from '../../types';
import { aboutApi } from '../../services/cms';
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

type SectionKind = 'aboutHero' | 'companyStat' | 'companyValue' | 'milestone' | 'companyMission';

const emptyStat: CompanyStat = { label: '', value: '', icon: 'fas fa-chart-bar', description: '', order: 0 };
const emptyValue: CompanyValue = { title: '', description: '', icon: 'fas fa-leaf', order: 0 };
const emptyMilestone: Milestone = { year: new Date().getFullYear(), title: '', description: '', order: 0 };

export const AboutManager: React.FC = () => {
  const [hero, setHero] = useState<AboutHero | null>(null);
  const [mission, setMission] = useState<CompanyMission | null>(null);
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

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
      const [heroData, missionData, statsData, valuesData, milestonesData] = await Promise.allSettled([
        aboutApi.getAboutHero(),
        aboutApi.getCompanyMission(),
        aboutApi.getCompanyStats(),
        aboutApi.getCompanyValues(),
        aboutApi.getMilestones(),
      ]);
      if (heroData.status === 'fulfilled') setHero(heroData.value);
      if (missionData.status === 'fulfilled') setMission(missionData.value);
      if (statsData.status === 'fulfilled') setStats(statsData.value || []);
      if (valuesData.status === 'fulfilled') setValues(valuesData.value || []);
      if (milestonesData.status === 'fulfilled') setMilestones(milestonesData.value || []);
    } catch (err) {
      console.error('Error loading about content:', err);
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

  const setField = (key: string, value: unknown) => setForm((f: any) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    if (!modal) return;
    setSaving(true);
    try {
      switch (modal.section) {
        case 'aboutHero':
          await aboutApi.updateAboutHero(form);
          break;
        case 'companyMission':
          await aboutApi.updateCompanyMission(form);
          break;
        case 'companyStat':
          if (modal.data?._id) await aboutApi.updateCompanyStat(modal.data._id, form);
          else await aboutApi.createCompanyStat(form);
          break;
        case 'companyValue':
          if (modal.data?._id) await aboutApi.updateCompanyValue(modal.data._id, form);
          else await aboutApi.createCompanyValue(form);
          break;
        case 'milestone':
          if (modal.data?._id) await aboutApi.updateMilestone(modal.data._id, form);
          else await aboutApi.createMilestone(form);
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

  const handleDelete = async (section: 'companyStat' | 'companyValue' | 'milestone', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      if (section === 'companyStat') await aboutApi.deleteCompanyStat(id);
      else if (section === 'companyValue') await aboutApi.deleteCompanyValue(id);
      else await aboutApi.deleteMilestone(id);
      notify('Deleted successfully');
      loadContent();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete', 'error');
    }
  };

  const renderFormFields = () => {
    if (!modal) return null;
    switch (modal.section) {
      case 'aboutHero':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Subtitle" required>
              <TextInput value={form.subtitle || ''} onChange={(e) => setField('subtitle', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <Field label="Image" required>
              <ImageUploader value={form.imageUrl || ''} onChange={(url) => setField('imageUrl', url)} label="Hero Image" />
            </Field>
          </div>
        );
      case 'companyMission':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <Field label="Image" required>
              <ImageUploader value={form.imageUrl || ''} onChange={(url) => setField('imageUrl', url)} label="Mission Image" />
            </Field>
          </div>
        );
      case 'companyStat':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Label" required>
                <TextInput value={form.label || ''} onChange={(e) => setField('label', e.target.value)} />
              </Field>
              <Field label="Value" required>
                <TextInput value={form.value || ''} onChange={(e) => setField('value', e.target.value)} />
              </Field>
            </div>
            <Field label="Description" required>
              <TextInput value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Icon" required hint="e.g., fas fa-users">
                <TextInput value={form.icon || ''} onChange={(e) => setField('icon', e.target.value)} />
              </Field>
              <Field label="Order" required>
                <NumberInput value={form.order ?? 0} onChange={(e) => setField('order', Number(e.target.value))} />
              </Field>
            </div>
          </div>
        );
      case 'companyValue':
        return (
          <div className="space-y-4">
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Icon" required hint="e.g., fas fa-leaf">
                <TextInput value={form.icon || ''} onChange={(e) => setField('icon', e.target.value)} />
              </Field>
              <Field label="Order" required>
                <NumberInput value={form.order ?? 0} onChange={(e) => setField('order', Number(e.target.value))} />
              </Field>
            </div>
          </div>
        );
      case 'milestone':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Year" required>
                <NumberInput value={form.year ?? new Date().getFullYear()} onChange={(e) => setField('year', Number(e.target.value))} />
              </Field>
              <Field label="Order" required>
                <NumberInput value={form.order ?? 0} onChange={(e) => setField('order', Number(e.target.value))} />
              </Field>
            </div>
            <Field label="Title" required>
              <TextInput value={form.title || ''} onChange={(e) => setField('title', e.target.value)} />
            </Field>
            <Field label="Description" required>
              <TextArea rows={4} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
          </div>
        );
    }
  };

  if (isLoading) return <Spinner label="Loading about content..." />;

  return (
    <div>
      <PageHeader
        title="Manage About Page"
        subtitle="Update the company story, mission, values and milestones"
      />

      <div className="space-y-6">
        {/* Hero */}
        <Card
          title="Hero Section"
          action={
            <PrimaryButton onClick={() => openEdit('aboutHero', hero)}>
              Edit Hero Section
            </PrimaryButton>
          }
        >
          {hero ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <img src={hero.imageUrl} alt="About Hero" className="w-full h-48 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-[#0F3020]">{hero.title}</h3>
                <h4 className="text-stone-600 mt-1">{hero.subtitle}</h4>
                <p className="text-sm text-stone-600 mt-2">{hero.description}</p>
              </div>
            </div>
          ) : (
            <EmptyState message="No about hero data found." />
          )}
        </Card>

        {/* Mission */}
        <Card
          title="Mission & Vision"
          action={
            <PrimaryButton onClick={() => openEdit('companyMission', mission)}>
              Edit Mission
            </PrimaryButton>
          }
        >
          {mission ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <img src={mission.imageUrl} alt="Mission" className="w-full h-48 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-[#0F3020]">{mission.title}</h3>
                <p className="text-sm text-stone-600 mt-2">{mission.description}</p>
              </div>
            </div>
          ) : (
            <EmptyState message="No mission data found." />
          )}
        </Card>

        {/* Stats */}
        <Card
          title="Company Statistics"
          action={
            <PrimaryButton onClick={() => openEdit('companyStat', emptyStat)}>
              <Plus className="w-4 h-4" /> Add Statistic
            </PrimaryButton>
          }
        >
          {stats.length === 0 ? (
            <EmptyState message="No company statistics found." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat._id} className="border border-stone-200 rounded-lg p-4 text-center bg-stone-50">
                  <i className={`${stat.icon} text-2xl text-[#15803D]`} />
                  <h3 className="font-bold text-xl mt-2 text-stone-800">{stat.value}</h3>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-stone-500">{stat.description}</p>
                  <div className="mt-3 flex justify-center gap-2">
                    <GhostEditButton onClick={() => openEdit('companyStat', stat)}>
                      <Pencil className="w-3 h-3" />
                    </GhostEditButton>
                    <DangerButton onClick={() => handleDelete('companyStat', stat._id!)}>
                      <Trash2 className="w-3 h-3" />
                    </DangerButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Values */}
        <Card
          title="Company Values"
          action={
            <PrimaryButton onClick={() => openEdit('companyValue', emptyValue)}>
              <Plus className="w-4 h-4" /> Add Value
            </PrimaryButton>
          }
        >
          {values.length === 0 ? (
            <EmptyState message="No company values found." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value) => (
                <div key={value._id} className="border border-stone-200 rounded-lg p-4 bg-stone-50">
                  <div className="flex flex-col items-center text-center">
                    <i className={`${value.icon} text-3xl text-[#15803D] mb-2`} />
                    <h3 className="font-medium text-[#0F3020]">{value.title}</h3>
                    <p className="text-sm text-stone-600 mt-2">{value.description}</p>
                  </div>
                  <div className="mt-3 flex justify-center gap-2">
                    <GhostEditButton onClick={() => openEdit('companyValue', value)}>
                      <Pencil className="w-3 h-3" />
                    </GhostEditButton>
                    <DangerButton onClick={() => handleDelete('companyValue', value._id!)}>
                      <Trash2 className="w-3 h-3" />
                    </DangerButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Milestones */}
        <Card
          title="Company Milestones"
          action={
            <PrimaryButton onClick={() => openEdit('milestone', emptyMilestone)}>
              <Plus className="w-4 h-4" /> Add Milestone
            </PrimaryButton>
          }
        >
          {milestones.length === 0 ? (
            <EmptyState message="No milestones found." />
          ) : (
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone._id} className="border border-stone-200 rounded-lg p-4 bg-stone-50 flex items-start gap-4">
                  <div className="bg-emerald-100 text-emerald-800 font-bold py-2 px-4 rounded-lg shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#0F3020]">{milestone.title}</h3>
                    <p className="text-sm text-stone-600 mt-1">{milestone.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <GhostEditButton onClick={() => openEdit('milestone', milestone)}>
                      <Pencil className="w-3 h-3" />
                    </GhostEditButton>
                    <DangerButton onClick={() => handleDelete('milestone', milestone._id!)}>
                      <Trash2 className="w-3 h-3" />
                    </DangerButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <AdminModal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={`${modal?.data?._id ? 'Edit' : 'Add'} ${modal?.section ?? ''}`}
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
