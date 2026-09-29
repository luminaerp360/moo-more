import React from 'react';
import { NavPage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  Info,
  Tractor,
  Images,
  Newspaper,
  Package,
  Tags,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  Star,
  ChevronRight,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: NavPage) => void;
}

interface DashboardSection {
  title: string;
  description: string;
  page: NavPage;
  icon: React.ReactNode;
  bgClass: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const adminSections: DashboardSection[] = [
    {
      title: 'Home Content',
      description: 'Edit homepage hero, offers, stats and newsletter',
      page: 'admin/home-content',
      icon: <Home className="w-6 h-6" />,
      bgClass: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'About Us',
      description: 'Update company information and about page',
      page: 'admin/about',
      icon: <Info className="w-6 h-6" />,
      bgClass: 'bg-teal-50 text-teal-600',
    },
    {
      title: 'Farm Services',
      description: 'Manage farm services and features',
      page: 'admin/farm-services',
      icon: <Tractor className="w-6 h-6" />,
      bgClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Gallery',
      description: 'Manage farm gallery images',
      page: 'admin/gallery',
      icon: <Images className="w-6 h-6" />,
      bgClass: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Blog Posts',
      description: 'Manage blog content and articles',
      page: 'admin/blogs',
      icon: <Newspaper className="w-6 h-6" />,
      bgClass: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Team Members',
      description: 'Manage team members and roles',
      page: 'admin/team',
      icon: <Users className="w-6 h-6" />,
      bgClass: 'bg-pink-50 text-pink-600',
    },
    {
      title: 'Products',
      description: 'Manage product catalog, pricing and inventory',
      page: 'admin/products',
      icon: <Package className="w-6 h-6" />,
      bgClass: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Categories',
      description: 'Organize and manage product categories',
      page: 'admin/categories',
      icon: <Tags className="w-6 h-6" />,
      bgClass: 'bg-green-50 text-green-700',
    },
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      page: 'admin/orders',
      icon: <ShoppingCart className="w-6 h-6" />,
      bgClass: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Customer Inquiries',
      description: 'Read and respond to contact form submissions',
      page: 'admin/messages',
      icon: <MessageSquare className="w-6 h-6" />,
      bgClass: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Customer Reviews',
      description: 'Review submissions, verify/approve and manage testimonials',
      page: 'admin/reviews',
      icon: <Star className="w-6 h-6" />,
      bgClass: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Farm Settings',
      description: 'Edit phone, email, WhatsApp, address and socials',
      page: 'admin/settings',
      icon: <Settings className="w-6 h-6" />,
      bgClass: 'bg-indigo-50 text-indigo-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F3020] font-serif-heading">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''} 👋
        </h1>
        <p className="text-stone-500 mt-1">
          Manage your farm's website content and operations from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {adminSections.map((section) => (
          <button
            key={section.page}
            onClick={() => onNavigate(section.page)}
            className="group bg-white rounded-xl border border-stone-200 shadow-xs p-5 text-left hover:shadow-md hover:border-[#15803D]/40 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className={`${section.bgClass} p-3 rounded-xl`}>{section.icon}</div>
              <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#15803D] group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#0F3020]">{section.title}</h3>
            <p className="text-sm text-stone-500 mt-1">{section.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
