import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavPage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { getTenantId } from '../../services/api';
import { BrandLogo } from '../BrandLogo';
import {
  LayoutDashboard,
  Home,
  Info,
  Tractor,
  Images,
  Newspaper,
  Users,
  Package,
  Tags,
  ShoppingCart,
  MessageSquare,
  Settings,
  Star,
  LogOut,
  Globe,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

interface AdminLayoutProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  children: React.ReactNode;
}

const sections: { page: NavPage; label: string; icon: React.ReactNode }[] = [
  { page: 'admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { page: 'admin/home-content', label: 'Home Content', icon: <Home className="w-4 h-4" /> },
  { page: 'admin/about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  { page: 'admin/farm-services', label: 'Farm Services', icon: <Tractor className="w-4 h-4" /> },
  { page: 'admin/gallery', label: 'Gallery', icon: <Images className="w-4 h-4" /> },
  { page: 'admin/blogs', label: 'Blog Posts', icon: <Newspaper className="w-4 h-4" /> },
  { page: 'admin/team', label: 'Team Members', icon: <Users className="w-4 h-4" /> },
  { page: 'admin/products', label: 'Products', icon: <Package className="w-4 h-4" /> },
  { page: 'admin/categories', label: 'Categories', icon: <Tags className="w-4 h-4" /> },
  { page: 'admin/orders', label: 'Orders', icon: <ShoppingCart className="w-4 h-4" /> },
  { page: 'admin/reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
  { page: 'admin/messages', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
  { page: 'admin/settings', label: 'Farm Settings', icon: <Settings className="w-4 h-4" /> },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPage,
  onNavigate,
  children,
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-4 py-5 border-b border-emerald-900/40">
        <button onClick={() => onNavigate('home')}>
          <BrandLogo size="sm" variant="dark" showTagline={false} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {sections.map((section) => {
          const isActive = currentPage === section.page;
          return (
            <button
              key={section.page}
              onClick={() => {
                onNavigate(section.page);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-[#15803D]'
                  : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
              }`}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-emerald-900/40 space-y-1">
        <button
          onClick={() => onNavigate('home')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span>View Website</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex">
      {/* Desktop sidebar - Fixed to left viewport edge */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-[#0F3020] z-40">
        {sidebar}
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0F3020] lg:hidden"
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Topbar */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-sm font-bold text-[#0F3020]">
                  {sections.find((s) => s.page === currentPage)?.label ?? 'Admin'}
                </h1>
                <p className="text-xs text-stone-400 hidden sm:block">
                  Moo & More Dairy Farm content management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tenant: <strong className="font-semibold">{user?.tenantId || getTenantId()}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center text-xs font-bold uppercase">
                  {user?.email?.charAt(0) ?? 'A'}
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-stone-800">{user?.email}</p>
                  <p className="text-[10px] uppercase tracking-wide text-[#15803D] font-bold">
                    {user?.role ?? 'admin'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
