import React, { useState, useEffect, useCallback } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Clock,
  Search,
  ExternalLink,
  RefreshCw,
  Eye,
  Inbox,
} from 'lucide-react';
import { ContactMessage } from '../../types';
import { contactApi } from '../../services/cms';
import {
  Spinner,
  PageHeader,
  Card,
  PrimaryButton,
  OutlineButton,
  DangerButton,
  EmptyState,
  Toast,
} from '../../components/admin/AdminUI';

export const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isUpdating, setIsUpdating] = useState(false);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await contactApi.getAll();
      setMessages(data || []);
      if (selectedMessage) {
        const updated = data.find((m) => (m._id || m.id) === (selectedMessage._id || selectedMessage.id));
        if (updated) setSelectedMessage(updated);
      }
    } catch (err) {
      console.error('Failed to load contact messages:', err);
      notify('Failed to load inquiries', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedMessage]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleStatusChange = async (message: ContactMessage, newStatus: 'unread' | 'read' | 'replied') => {
    const id = message._id || message.id;
    if (!id) return;
    setIsUpdating(true);
    try {
      await contactApi.updateStatus(id, newStatus);
      setMessages((prev) =>
        prev.map((m) => ((m._id || m.id) === id ? { ...m, status: newStatus } : m))
      );
      if ((selectedMessage?._id || selectedMessage?.id) === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      notify(`Inquiry marked as ${newStatus}`);
    } catch (err) {
      console.error('Failed to update message status:', err);
      notify('Could not update status', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (message: ContactMessage) => {
    const id = message._id || message.id;
    if (!id) return;
    if (!window.confirm(`Delete message from ${message.name}?`)) return;

    try {
      await contactApi.remove(id);
      setMessages((prev) => prev.filter((m) => (m._id || m.id) !== id));
      if ((selectedMessage?._id || selectedMessage?.id) === id) {
        setSelectedMessage(null);
      }
      notify('Message removed successfully');
    } catch (err) {
      console.error('Failed to delete message:', err);
      notify('Could not delete message', 'error');
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter = filter === 'all' || (m.status || 'unread') === filter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      m.name?.toLowerCase().includes(query) ||
      m.email?.toLowerCase().includes(query) ||
      m.phone?.toLowerCase().includes(query) ||
      m.subject?.toLowerCase().includes(query) ||
      m.message?.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.status || m.status === 'unread').length;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Just now';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-KE', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getCleanPhone = (phone?: string) => {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
  };

  const getWhatsAppNumber = (phone?: string) => {
    const clean = getCleanPhone(phone);
    if (!clean) return '';
    return clean.replace('+', '');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Inquiries"
        description="View and respond to inquiries and messages submitted via the website contact form."
        action={
          <OutlineButton onClick={loadMessages} disabled={isLoading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </OutlineButton>
        }
      />

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Total Inquiries</p>
            <p className="text-2xl font-bold text-[#0F3020] mt-1">{messages.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#15803D] flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Pending / Unread</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{unreadCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Replied</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {messages.filter((m) => m.status === 'replied').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'unread', 'read', 'replied'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === st
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'unread' ? `Unread (${unreadCount})` : st}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Split Layout: Message List + Detail View */}
      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <EmptyState
          title="No inquiries found"
          description={
            searchQuery || filter !== 'all'
              ? 'Try adjusting your search query or filter.'
              : 'Messages submitted through your website contact page will appear here.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Message List Column */}
          <div className="lg:col-span-5 space-y-3">
            {filteredMessages.map((msg) => {
              const isSelected = (selectedMessage?._id || selectedMessage?.id) === (msg._id || msg.id);
              const isUnread = !msg.status || msg.status === 'unread';

              return (
                <div
                  key={msg._id || msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (isUnread) handleStatusChange(msg, 'read');
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#15803D] bg-emerald-50/40 shadow-xs'
                      : isUnread
                      ? 'border-emerald-200 bg-white hover:border-emerald-300'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      )}
                      <h4 className="font-semibold text-sm text-[#0F3020] truncate">
                        {msg.name}
                      </h4>
                    </div>
                    <span className="text-[11px] text-stone-400 shrink-0">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-stone-700 mt-1 truncate">
                    {msg.subject || 'General Inquiry'}
                  </p>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {msg.message}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 text-[11px]">
                    <span className="text-stone-400 truncate max-w-[160px]">
                      {msg.email}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-medium capitalize text-[10px] ${
                        msg.status === 'replied'
                          ? 'bg-blue-100 text-blue-700'
                          : msg.status === 'read'
                          ? 'bg-stone-100 text-stone-600'
                          : 'bg-emerald-100 text-emerald-700 font-semibold'
                      }`}
                    >
                      {msg.status || 'unread'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Detail View Column */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <Card className="p-6 sticky top-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-stone-200 gap-4">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize mb-2 ${
                        selectedMessage.status === 'replied'
                          ? 'bg-blue-100 text-blue-700'
                          : selectedMessage.status === 'read'
                          ? 'bg-stone-100 text-stone-600'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {selectedMessage.status || 'unread'}
                    </span>
                    <h3 className="text-xl font-bold text-[#0F3020] font-serif-heading">
                      {selectedMessage.subject || 'Customer Inquiry'}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Received on {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <DangerButton
                      onClick={() => handleDelete(selectedMessage)}
                      className="px-3 py-1.5 text-xs gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </DangerButton>
                  </div>
                </div>

                {/* Sender Information Card */}
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                        Full Name
                      </p>
                      <p className="text-sm font-semibold text-stone-900 mt-0.5">
                        {selectedMessage.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                        Email Address
                      </p>
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                          selectedMessage.subject || 'Your Inquiry'
                        )}`}
                        className="text-sm font-medium text-[#15803D] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        {selectedMessage.email}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {selectedMessage.phone && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                          Phone Number
                        </p>
                        <a
                          href={`tel:${getCleanPhone(selectedMessage.phone)}`}
                          className="text-sm font-medium text-stone-800 hover:text-[#15803D] flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3 text-stone-400" />
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Inquiry Message
                  </h5>
                  <div className="p-4 rounded-xl bg-white border border-stone-200 text-stone-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Quick Actions & Status Updating */}
                <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-2.5 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedMessage.phone && (
                      <a
                        href={`https://wa.me/${getWhatsAppNumber(selectedMessage.phone)}?text=Hello%20${encodeURIComponent(
                          selectedMessage.name
                        )},%20thank%20you%20for%20reaching%20out%20to%20Moo-More%20Dairy.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Reply via WhatsApp
                      </a>
                    )}

                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject || 'Your Inquiry to Moo-More Dairy'
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Reply via Email
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedMessage.status !== 'replied' && (
                      <button
                        onClick={() => handleStatusChange(selectedMessage, 'replied')}
                        disabled={isUpdating}
                        className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Mark as Replied
                      </button>
                    )}
                    {selectedMessage.status === 'unread' ? (
                      <button
                        onClick={() => handleStatusChange(selectedMessage, 'read')}
                        disabled={isUpdating}
                        className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                      >
                        Mark as Read
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(selectedMessage, 'unread')}
                        disabled={isUpdating}
                        className="px-3 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700 transition-colors"
                      >
                        Mark Unread
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center text-stone-400 border-dashed border-2 border-stone-200">
                <Eye className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                <p className="font-semibold text-sm text-stone-600">No inquiry selected</p>
                <p className="text-xs text-stone-400 mt-1">
                  Click on an inquiry from the list on the left to read and respond.
                </p>
              </Card>
            )}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} type={toastType} />}
    </div>
  );
};
