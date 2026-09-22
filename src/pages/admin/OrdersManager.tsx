import React, { useState, useEffect, useCallback } from 'react';
import { Eye, Download, Search } from 'lucide-react';
import { OrderRecord } from '../../types';
import { ordersApi } from '../../services/cms';
import { AdminModal } from '../../components/admin/AdminModal';
import {
  Spinner,
  PageHeader,
  EmptyState,
  OutlineButton,
  Toast,
  inputClass,
} from '../../components/admin/AdminUI';

const ORDER_STATUSES = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['all', 'pending', 'paid', 'failed'];

const statusBadge: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentBadge: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-red-100 text-red-800',
};

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast(message);
    setToastType(type);
    setTimeout(() => setToast(null), 3000);
  };

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ordersApi.getAll();
      setOrders(data || []);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filtered = orders
    .filter((order) => {
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        (order._id || '').toLowerCase().includes(query) ||
        (order.shippingAddress || '').toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      switch (sortBy) {
        case 'oldest':
          return dateA - dateB;
        case 'highest':
          return b.totalAmount - a.totalAmount;
        case 'lowest':
          return a.totalAmount - b.totalAmount;
        default:
          return dateB - dateA;
      }
    });

  const updateOrderStatus = async (orderId: string | undefined, newStatus: string) => {
    if (!orderId) return;
    try {
      await ordersApi.updateStatus(orderId, newStatus);
      notify('Order status updated');
      loadOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      notify('Failed to update order status', 'error');
    }
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price || 0);

  const exportOrders = () => {
    if (filtered.length === 0) {
      notify('No orders to export', 'error');
      return;
    }
    const headers = ['Order ID', 'Date', 'Customer', 'Status', 'Payment Method', 'Payment Status', 'Amount (KSh)'];
    const rows = filtered.map((order) => [
      order._id,
      formatDate(order.createdAt),
      (order.shippingAddress || '').split('\n')[0],
      order.status,
      order.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery',
      order.paymentStatus,
      order.totalAmount.toString(),
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `orders-export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <Spinner label="Loading orders..." />;

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="View and manage customer orders"
        action={
          <OutlineButton onClick={exportOrders}>
            <Download className="w-4 h-4" /> Export CSV
          </OutlineButton>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className={`${inputClass} pl-9`}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass}>
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className={inputClass}>
          {PAYMENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Payments' : `Payment: ${status.charAt(0).toUpperCase() + status.slice(1)}`}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputClass}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState message="No orders found matching your filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-stone-600">
                      {order._id ? order._id.slice(-8) : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-stone-900">
                      <p className="line-clamp-1 max-w-xs">{(order.shippingAddress || '').split('\n')[0] || '—'}</p>
                      <p className="text-xs text-stone-400">{order.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-stone-900">
                      KSh {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentBadge[order.paymentStatus] || 'bg-stone-100 text-stone-800'}`}>
                        {order.paymentStatus || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status || 'pending'}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`${statusBadge[order.status] || 'bg-stone-100 text-stone-800'} text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#15803D]/40`}
                      >
                        {ORDER_STATUSES.filter((s) => s !== 'all').map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#15803D] border border-[#15803D]/40 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-3 h-3" /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AdminModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Details"
        footer={<OutlineButton onClick={() => setSelectedOrder(null)}>Close</OutlineButton>}
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase">Order ID</p>
                <p className="font-mono text-stone-800">{selectedOrder._id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase">Date</p>
                <p className="text-stone-800">{formatDate(selectedOrder.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase">Status</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge[selectedOrder.status] || 'bg-stone-100 text-stone-800'}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase">Payment</p>
                <p className="text-stone-800">
                  {selectedOrder.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery'} · {selectedOrder.paymentStatus}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase mb-2">Delivery Address</p>
              <div className="bg-stone-50 rounded-lg p-4 text-sm whitespace-pre-line text-stone-800">
                {selectedOrder.shippingAddress || '—'}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase mb-2">Items</p>
              <div className="border border-stone-200 rounded-lg divide-y divide-stone-200">
                {(selectedOrder.items || []).map((item, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium text-stone-800">{item.productId}</p>
                      {item.notes && <p className="text-xs text-stone-400">{item.notes}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-stone-800">× {item.quantity}</p>
                      <p className="text-stone-500">KSh {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-stone-200">
              <p className="font-semibold text-[#0F3020]">Total Amount</p>
              <p className="text-xl font-bold text-[#15803D]">KSh {formatPrice(selectedOrder.totalAmount)}</p>
            </div>

            {selectedOrder.trackingNumber && (
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase">Tracking Number</p>
                <p className="text-stone-800">{selectedOrder.trackingNumber}</p>
              </div>
            )}
          </div>
        )}
      </AdminModal>

      <Toast message={toast} type={toastType} />
    </div>
  );
};
