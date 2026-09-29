import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Clock,
  Search,
  RefreshCw,
  Eye,
  Filter,
  Sparkles,
  MapPin,
  Tag,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';
import { ReviewRecord } from '../../types';
import { reviewsApi } from '../../services/cms';
import { useSiteContent } from '../../context/ContentContext';
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

export const ReviewsManager: React.FC = () => {
  const { refetchContent } = useSiteContent();
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await reviewsApi.getAllAdmin(statusFilter === 'all' ? undefined : statusFilter);
      setReviews(data || []);
    } catch (err) {
      console.error('Failed to load reviews:', err);
      notify('Failed to load customer reviews', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleUpdateStatus = async (
    review: ReviewRecord,
    newStatus: 'approved' | 'rejected' | 'pending'
  ) => {
    const id = review._id || review.id;
    if (!id) return;
    setProcessingId(id);
    try {
      const isVerified = newStatus === 'approved';
      await reviewsApi.updateStatus(id, isVerified, newStatus);
      setReviews((prev) =>
        prev.map((r) =>
          (r._id || r.id) === id ? { ...r, status: newStatus, isVerified } : r
        )
      );
      notify(
        newStatus === 'approved'
          ? 'Review verified and published live!'
          : newStatus === 'rejected'
          ? 'Review rejected and hidden from website'
          : 'Review marked as pending'
      );
      // Refresh global site content so the public website carousel reflects changes
      if (typeof refetchContent === 'function') {
        refetchContent();
      }
    } catch (err) {
      console.error('Failed to update review status:', err);
      notify('Failed to update review status', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (review: ReviewRecord) => {
    const id = review._id || review.id;
    if (!id) return;
    if (!window.confirm(`Delete review from "${review.name}"?`)) return;

    setProcessingId(id);
    try {
      await reviewsApi.remove(id);
      setReviews((prev) => prev.filter((r) => (r._id || r.id) !== id));
      notify('Review permanently deleted');
      if (typeof refetchContent === 'function') {
        refetchContent();
      }
    } catch (err) {
      console.error('Failed to delete review:', err);
      notify('Could not delete review', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      r.name?.toLowerCase().includes(query) ||
      r.comment?.toLowerCase().includes(query) ||
      r.role?.toLowerCase().includes(query) ||
      r.location?.toLowerCase().includes(query) ||
      r.product?.toLowerCase().includes(query)
    );
  });

  const pendingCount = reviews.filter((r) => r.status === 'pending' || (!r.status && !r.isVerified)).length;
  const approvedCount = reviews.filter((r) => r.status === 'approved' || r.isVerified).length;
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : '5.0';

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recent';
    try {
      return new Intl.DateTimeFormat('en-KE', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Reviews & Ratings"
        description="Review, verify, and publish customer feedback. Only verified reviews are shown on the public website."
        action={
          <OutlineButton onClick={loadReviews} disabled={isLoading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </OutlineButton>
        }
      />

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Total Reviews</p>
            <p className="text-2xl font-bold text-[#0F3020] mt-1">{reviews.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#15803D] flex items-center justify-center">
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-amber-600 font-semibold">Pending Verification</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Approved &amp; Live</p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">{approvedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Average Rating</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">{avgRating} ★</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors flex items-center gap-1.5 ${
                statusFilter === st
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{st === 'all' ? 'All Reviews' : st}</span>
              {st === 'pending' && pendingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by reviewer, text, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-transparent"
          />
        </div>
      </div>

      {/* Review List */}
      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <EmptyState
          title="No reviews found"
          description={
            statusFilter !== 'all' || searchQuery
              ? 'Try changing your filter or search query.'
              : 'Customer reviews submitted through your website will appear here for verification.'
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((r) => {
            const id = r._id || r.id || '';
            const isPending = r.status === 'pending' || (!r.status && !r.isVerified);
            const isApproved = r.status === 'approved' || r.isVerified;
            const isRejected = r.status === 'rejected';
            const isBusy = processingId === id;

            return (
              <div
                key={id}
                className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
                  isPending
                    ? 'border-amber-300 ring-2 ring-amber-100'
                    : isApproved
                    ? 'border-emerald-200'
                    : 'border-stone-200 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Author info, rating & text */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-base text-[#0F3020]">{r.name}</h4>
                      {r.role && (
                        <span className="text-xs text-stone-500 font-medium">• {r.role}</span>
                      )}
                      {r.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                          <MapPin className="w-3 h-3" />
                          {r.location}
                        </span>
                      )}
                      <span className="text-stone-300 text-xs">•</span>
                      <span className="text-xs text-stone-400">{formatDate(r.createdAt)}</span>
                    </div>

                    {/* Star Rating & Category */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (r.rating || 5)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>

                      {r.category && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 capitalize">
                          <Tag className="w-2.5 h-2.5" />
                          {r.category}
                        </span>
                      )}

                      {r.product && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800">
                          {r.product}
                        </span>
                      )}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-stone-700 leading-relaxed pt-1 whitespace-pre-wrap">
                      "{r.comment}"
                    </p>

                    {r.email && (
                      <p className="text-xs text-stone-400">
                        Email: <span className="text-stone-600">{r.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Right Column: Status Badge & Verification Buttons */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 shrink-0 pt-2 md:pt-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : isPending
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isApproved && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isPending && <Clock className="w-3.5 h-3.5 animate-pulse" />}
                      {isRejected && <XCircle className="w-3.5 h-3.5" />}
                      <span>
                        {isApproved
                          ? 'Verified & Live'
                          : isPending
                          ? 'Pending Verification'
                          : 'Rejected'}
                      </span>
                    </span>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {!isApproved && (
                        <button
                          onClick={() => handleUpdateStatus(r, 'approved')}
                          disabled={isBusy}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold transition-colors shadow-xs"
                          title="Approve and show on website"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve &amp; Show</span>
                        </button>
                      )}

                      {!isRejected && (
                        <button
                          onClick={() => handleUpdateStatus(r, 'rejected')}
                          disabled={isBusy}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 text-xs font-semibold transition-colors border border-stone-200"
                          title="Reject and hide from website"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      <DangerButton
                        onClick={() => handleDelete(r)}
                        disabled={isBusy}
                        className="px-2.5 py-1.5 text-xs"
                        title="Delete permanently"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </DangerButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && <Toast message={toast} type={toastType} />}
    </div>
  );
};
