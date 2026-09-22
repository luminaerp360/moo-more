import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { BlogRecord } from '../../types';
import { blogsApi } from '../../services/cms';
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
  Checkbox,
  Toast,
} from '../../components/admin/AdminUI';

const emptyBlog: BlogRecord = {
  title: '',
  content: '',
  author: '',
  tags: [],
  published: false,
  featuredImage: '',
};

export const BlogsManager: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogRecord | null>(null);
  const [form, setForm] = useState<BlogRecord>(emptyBlog);
  const [saving, setSaving] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await blogsApi.getAll();
      setBlogs(data || []);
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyBlog);
    setModalOpen(true);
  };

  const openEdit = (blog: BlogRecord) => {
    setEditing(blog);
    setForm({
      title: blog.title || '',
      content: blog.content || '',
      author: blog.author || '',
      tags: blog.tags || [],
      published: blog.published || false,
      featuredImage: blog.featuredImage || '',
    });
    setModalOpen(true);
  };

  const setField = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?._id) {
        await blogsApi.update(editing._id, form);
      } else {
        await blogsApi.create(form);
      }
      setModalOpen(false);
      notify('Blog post saved');
      loadBlogs();
    } catch (err) {
      console.error('Save failed:', err);
      notify(err instanceof Error ? err.message : 'Failed to save blog post', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await blogsApi.remove(id);
      notify('Blog post deleted');
      loadBlogs();
    } catch (err) {
      console.error('Delete failed:', err);
      notify('Failed to delete blog post', 'error');
    }
  };

  if (isLoading) return <Spinner label="Loading blog posts..." />;

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        subtitle="Manage blog content and articles"
        action={
          <PrimaryButton onClick={openAdd}>
            <Plus className="w-4 h-4" /> Add New Post
          </PrimaryButton>
        }
      />

      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12">
          <EmptyState message="No blog posts yet. Write your first article!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <img
                src={blog.featuredImage || '/logo.svg'}
                alt={blog.title}
                className="w-full h-44 object-cover bg-stone-100"
              />
              <div className="p-5">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h2 className="text-lg font-semibold text-[#0F3020] line-clamp-2">{blog.title}</h2>
                  <span
                    className={`shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${
                      blog.published ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-stone-600 line-clamp-3 mb-4">{blog.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(blog.tags || []).map((tag) => (
                    <span key={tag} className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500 font-medium">{blog.author || 'Unknown author'}</span>
                  <div className="flex gap-2">
                    <GhostEditButton onClick={() => openEdit(blog)}>
                      <Pencil className="w-3 h-3" />
                    </GhostEditButton>
                    <DangerButton onClick={() => handleDelete(blog._id!)}>
                      <Trash2 className="w-3 h-3" />
                    </DangerButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Update Blog Post' : 'Create New Blog Post'}
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
        <div className="space-y-4">
          <Field label="Title" required>
            <TextInput value={form.title} onChange={(e) => setField('title', e.target.value)} />
          </Field>
          <Field label="Content" required>
            <TextArea rows={8} value={form.content} onChange={(e) => setField('content', e.target.value)} />
          </Field>
          <Field label="Tags">
            <TagInput tags={form.tags || []} onChange={(tags) => setField('tags', tags)} placeholder="Add tags (press Enter)" />
          </Field>
          <Field label="Featured Image">
            <ImageUploader value={form.featuredImage || ''} onChange={(url) => setField('featuredImage', url)} label="Featured Image" />
          </Field>
          <Field label="Author" required>
            <TextInput value={form.author} onChange={(e) => setField('author', e.target.value)} />
          </Field>
          <Checkbox label="Publish immediately" checked={!!form.published} onChange={(checked) => setField('published', checked)} />
        </div>
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
