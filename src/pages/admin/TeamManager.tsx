import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { TeamMemberRecord } from '../../types';
import { teamApi } from '../../services/cms';
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

const emptyMember: TeamMemberRecord = {
  name: '',
  position: '',
  bio: '',
  email: '',
  phone: '',
  image: '',
  isActive: true,
};

export const TeamManager: React.FC = () => {
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMemberRecord | null>(null);
  const [form, setForm] = useState<TeamMemberRecord>(emptyMember);
  const [saving, setSaving] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await teamApi.getAll();
      setMembers(data || []);
    } catch (err) {
      console.error('Error loading team members:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const filtered = members.filter((member) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      (member.name || '').toLowerCase().includes(query) ||
      (member.position || '').toLowerCase().includes(query) ||
      (member.email || '').toLowerCase().includes(query);
    const matchesStatus = statusFilter === '' || member.isActive === (statusFilter === 'true');
    return matchesSearch && matchesStatus;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyMember);
    setModalOpen(true);
  };

  const openEdit = (member: TeamMemberRecord) => {
    setEditing(member);
    setForm({
      name: member.name || '',
      position: member.position || '',
      bio: member.bio || '',
      email: member.email || '',
      phone: member.phone || '',
      image: member.image || '',
      isActive: member.isActive ?? true,
    });
    setModalOpen(true);
  };

  const setField = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?._id) {
        await teamApi.update(editing._id, form);
      } else {
        await teamApi.create(form);
      }
      setModalOpen(false);
      notify('Team member saved');
      loadMembers();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save team member', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await teamApi.remove(id);
      notify('Team member deleted');
      loadMembers();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete team member', 'error');
    }
  };

  if (isLoading) return <Spinner label="Loading team members..." />;

  return (
    <div>
      <PageHeader
        title="Team Members Management"
        subtitle="Manage the people behind Moo & More"
        action={
          <PrimaryButton onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add Team Member
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
            placeholder="Search team members..."
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState message="No team members found. Try adjusting your filters or add a new member." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {filtered.map((member) => (
                  <tr key={member._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold uppercase">
                            {(member.name || '?').charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-stone-900">{member.name}</div>
                          <div className="text-sm text-stone-500 line-clamp-1">{member.bio}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">{member.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-900">{member.email}</div>
                      <div className="text-sm text-stone-500">{member.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <GhostEditButton onClick={() => openEdit(member)}>
                          <Pencil className="w-3 h-3" />
                        </GhostEditButton>
                        <DangerButton onClick={() => handleDelete(member._id!)}>
                          <Trash2 className="w-3 h-3" />
                        </DangerButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Update Team Member' : 'Add New Team Member'}
        footer={
          <>
            <OutlineButton onClick={() => setModalOpen(false)}>Cancel</OutlineButton>
            <PrimaryButton onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Update Team Member' : 'Add Team Member'}
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Full Name" required>
            <TextInput value={form.name} onChange={(e) => setField('name', e.target.value)} />
          </Field>
          <Field label="Position" required>
            <TextInput value={form.position} onChange={(e) => setField('position', e.target.value)} />
          </Field>
          <Field label="Email" required>
            <TextInput type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          </Field>
          <Field label="Phone Number">
            <TextInput type="tel" value={form.phone || ''} onChange={(e) => setField('phone', e.target.value)} />
          </Field>
          <Field label="Bio">
            <TextArea rows={3} value={form.bio || ''} onChange={(e) => setField('bio', e.target.value)} placeholder="Brief description about the team member..." />
          </Field>
          <Field label="Profile Image">
            <ImageUploader value={form.image || ''} onChange={(url) => setField('image', url)} label="Profile Image" />
          </Field>
          <Checkbox label="Active Member" checked={form.isActive ?? true} onChange={(checked) => setField('isActive', checked)} />
        </div>
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
