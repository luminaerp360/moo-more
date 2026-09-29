import { api } from './api';
import {
  HeroSection,
  SpecialOffer,
  StatsCounter,
  NewsletterSection,
  AboutHero,
  CompanyStat,
  CompanyValue,
  Milestone,
  CompanyMission,
  FarmServiceRecord,
  GalleryRecord,
  BlogRecord,
  TeamMemberRecord,
  ProductRecord,
  CategoryRecord,
  OrderRecord,
  ContactMessage,
  StoreSettings,
  ReviewRecord,
} from '../types';

// ---------------------------------------------------------------------------
// Home content  (/home-content)
// ---------------------------------------------------------------------------
export const homeContentApi = {
  getHeroSection: () => api.get<HeroSection>('/home-content/hero-section'),
  updateHeroSection: (data: HeroSection) =>
    api.put<HeroSection>('/home-content/hero-section', data),

  getSpecialOffers: () =>
    api.get<SpecialOffer[]>('/home-content/special-offers'),
  createSpecialOffer: (data: SpecialOffer) =>
    api.post<SpecialOffer>('/home-content/special-offers', data),
  updateSpecialOffer: (id: string, data: Partial<SpecialOffer>) =>
    api.put<SpecialOffer>(`/home-content/special-offers/${id}`, data),
  deleteSpecialOffer: (id: string) =>
    api.delete<void>(`/home-content/special-offers/${id}`),

  getStatsCounters: () =>
    api.get<StatsCounter[]>('/home-content/stats-counters'),
  createStatsCounter: (data: StatsCounter) =>
    api.post<StatsCounter>('/home-content/stats-counters', data),
  updateStatsCounter: (id: string, data: Partial<StatsCounter>) =>
    api.put<StatsCounter>(`/home-content/stats-counters/${id}`, data),
  deleteStatsCounter: (id: string) =>
    api.delete<void>(`/home-content/stats-counters/${id}`),

  getNewsletterSection: () =>
    api.get<NewsletterSection>('/home-content/newsletter-section'),
  updateNewsletterSection: (data: NewsletterSection) =>
    api.put<NewsletterSection>('/home-content/newsletter-section', data),
};

// ---------------------------------------------------------------------------
// About page  (/about)
// ---------------------------------------------------------------------------
export const aboutApi = {
  loadAboutContent: () =>
    api.get<{
      aboutHero: AboutHero;
      companyStats: CompanyStat[];
      companyValues: CompanyValue[];
      milestones: Milestone[];
      teamMembers: unknown[];
      companyMission: CompanyMission;
    }>('/about'),

  getAboutHero: () => api.get<AboutHero>('/about/hero'),
  updateAboutHero: (data: AboutHero) =>
    api.put<AboutHero>('/about/hero', data),

  getCompanyStats: () => api.get<CompanyStat[]>('/about/stats'),
  createCompanyStat: (data: CompanyStat) =>
    api.post<CompanyStat>('/about/stats', data),
  updateCompanyStat: (id: string, data: CompanyStat) =>
    api.put<CompanyStat>(`/about/stats/${id}`, data),
  deleteCompanyStat: (id: string) =>
    api.delete<void>(`/about/stats/${id}`),

  getCompanyValues: () => api.get<CompanyValue[]>('/about/values'),
  createCompanyValue: (data: CompanyValue) =>
    api.post<CompanyValue>('/about/values', data),
  updateCompanyValue: (id: string, data: CompanyValue) =>
    api.put<CompanyValue>(`/about/values/${id}`, data),
  deleteCompanyValue: (id: string) =>
    api.delete<void>(`/about/values/${id}`),

  getMilestones: () => api.get<Milestone[]>('/about/milestones'),
  createMilestone: (data: Milestone) =>
    api.post<Milestone>('/about/milestones', data),
  updateMilestone: (id: string, data: Milestone) =>
    api.put<Milestone>(`/about/milestones/${id}`, data),
  deleteMilestone: (id: string) =>
    api.delete<void>(`/about/milestones/${id}`),

  getCompanyMission: () => api.get<CompanyMission>('/about/mission'),
  updateCompanyMission: (data: CompanyMission) =>
    api.put<CompanyMission>('/about/mission', data),
};

// ---------------------------------------------------------------------------
// Farm services  (/farm-services)
// ---------------------------------------------------------------------------
export const farmServicesApi = {
  getAll: async () => {
    const response = await api.get<FarmServiceRecord[] | { value: FarmServiceRecord[]; Count?: number }>('/farm-services');
    return Array.isArray(response) ? response : (response?.value || []);
  },
  getById: (id: string) => api.get<FarmServiceRecord>(`/farm-services/${id}`),
  create: (data: FarmServiceRecord) =>
    api.post<FarmServiceRecord>('/farm-services', data),
  update: (id: string, data: Partial<FarmServiceRecord>) =>
    api.put<FarmServiceRecord>(`/farm-services/${id}`, data),
  remove: (id: string) => api.delete<void>(`/farm-services/${id}`),
};

// ---------------------------------------------------------------------------
// Gallery  (/gallery)
// ---------------------------------------------------------------------------
export const galleryApi = {
  findAll: async () => {
    const response = await api.get<GalleryRecord[] | { value: GalleryRecord[]; Count?: number }>('/gallery');
    return Array.isArray(response) ? response : (response?.value || []);
  },
  create: (data: GalleryRecord) => api.post<GalleryRecord>('/gallery', data),
  update: (id: string, data: Partial<GalleryRecord>) =>
    api.patch<GalleryRecord>(`/gallery/${id}`, data),
  remove: (id: string) => api.delete<void>(`/gallery/${id}`),
};

// ---------------------------------------------------------------------------
// Blogs  (/blogs)
// ---------------------------------------------------------------------------
export const blogsApi = {
  getAll: () => api.get<BlogRecord[]>('/blogs'),
  create: (data: BlogRecord) => api.post<BlogRecord>('/blogs', data),
  update: (id: string, data: Partial<BlogRecord>) =>
    api.put<BlogRecord>(`/blogs/${id}`, data),
  remove: (id: string) => api.delete<void>(`/blogs/${id}`),
};

// ---------------------------------------------------------------------------
// Team members  (/team-members)
// ---------------------------------------------------------------------------
export const teamApi = {
  getAll: async () => {
    const response = await api.get<TeamMemberRecord[] | { value: TeamMemberRecord[]; Count?: number }>('/team-members');
    return Array.isArray(response) ? response : (response?.value || []);
  },
  getActive: async () => {
    const response = await api.get<TeamMemberRecord[] | { value: TeamMemberRecord[]; Count?: number }>('/team-members/active');
    return Array.isArray(response) ? response : (response?.value || []);
  },
  create: (data: TeamMemberRecord) =>
    api.post<TeamMemberRecord>('/team-members', data),
  update: (id: string, data: Partial<TeamMemberRecord>) =>
    api.put<TeamMemberRecord>(`/team-members/${id}`, data),
  remove: (id: string) => api.delete<void>(`/team-members/${id}`),
  toggleStatus: (id: string, isActive: boolean) =>
    api.patch<TeamMemberRecord>(`/team-members/${id}/toggle-status`, {
      isActive,
    }),
};

// ---------------------------------------------------------------------------
// Products  (/products)
// ---------------------------------------------------------------------------
export const productsApi = {
  getAll: () => api.get<ProductRecord[]>('/products'),
  create: (data: ProductRecord) => api.post<ProductRecord>('/products', data),
  update: (id: string, data: Partial<ProductRecord>) =>
    api.put<ProductRecord>(`/products/${id}`, data),
  remove: (id: string) => api.delete<void>(`/products/${id}`),
};

// ---------------------------------------------------------------------------
// Categories  (/categories)
// ---------------------------------------------------------------------------
export const categoriesApi = {
  getAll: () => api.get<CategoryRecord[]>('/categories'),
  create: (data: CategoryRecord) =>
    api.post<CategoryRecord>('/categories', data),
  update: (id: string, data: Partial<CategoryRecord>) =>
    api.put<CategoryRecord>(`/categories/${id}`, data),
  remove: (id: string) => api.delete<void>(`/categories/${id}`),
};

// ---------------------------------------------------------------------------
// Orders  (/orders)
// ---------------------------------------------------------------------------
export interface CreateOrderPayload {
  items: {
    productId: string;
    quantity: number;
    price: number;
    notes?: string;
    pricingTier?: string;
  }[];
  customerType?: string;
  businessName?: string;
  shippingAddress: string;
  paymentMethod: string;
}

export const ordersApi = {
  create: (data: CreateOrderPayload) => api.post<OrderRecord>('/orders', data),
  getAll: () => api.get<OrderRecord[]>('/orders'),
  updateStatus: (id: string, status: string) =>
    api.put<OrderRecord>(`/orders/${id}/status`, { status }),
  cancel: (id: string) =>
    api.put<OrderRecord>(`/orders/${id}/cancel`, {}),
};

// ---------------------------------------------------------------------------
// Contact Messages  (/contact)
// ---------------------------------------------------------------------------
export const contactApi = {
  submit: (data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    inquiryType?: string;
    message: string;
  }) => api.post<ContactMessage>('/contact', data),
  getAll: async () => {
    const response = await api.get<ContactMessage[] | { value: ContactMessage[]; Count?: number }>('/contact');
    return Array.isArray(response) ? response : (response?.value || []);
  },
  updateStatus: (id: string, status: string) =>
    api.patch<ContactMessage>(`/contact/${id}`, { status }),
  remove: (id: string) => api.delete<void>(`/contact/${id}`),
};

// ---------------------------------------------------------------------------
// Store / Farm Settings  (/settings)
// ---------------------------------------------------------------------------
export const settingsApi = {
  get: () => api.get<StoreSettings>('/settings'),
  update: (data: Partial<StoreSettings>) =>
    api.put<StoreSettings>('/settings', data),
};

// ---------------------------------------------------------------------------
// Customer Reviews  (/reviews)
// ---------------------------------------------------------------------------
export const reviewsApi = {
  getVerified: async () => {
    const res = await api.get<ReviewRecord[] | { value: ReviewRecord[] }>('/reviews');
    return Array.isArray(res) ? res : (res?.value || []);
  },
  getAllAdmin: async (status?: string) => {
    const query = status && status !== 'all' ? `?status=${status}` : '?all=true';
    const res = await api.get<ReviewRecord[] | { value: ReviewRecord[] }>(`/reviews${query}`);
    return Array.isArray(res) ? res : (res?.value || []);
  },
  submit: (data: {
    name: string;
    email?: string;
    role?: string;
    location?: string;
    rating: number;
    comment: string;
    category?: string;
    avatar?: string;
    product?: string;
  }) => api.post<ReviewRecord>('/reviews', data),
  updateStatus: (id: string, isVerified: boolean, status?: 'pending' | 'approved' | 'rejected') =>
    api.patch<ReviewRecord>(`/reviews/${id}/verify`, { isVerified, status }),
  remove: (id: string) => api.delete<{ success: boolean }>(`/reviews/${id}`),
};

