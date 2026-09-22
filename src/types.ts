export type NavPage = 
  | 'home' 
  | 'shop'
  | 'products'
  | 'about' 
  | 'farm'
  | 'blog' 
  | 'gallery'
  | 'contact'
  | 'services' 
  | 'livestock' 
  | 'community' 
  | 'booking' 
  | 'privacy' 
  | 'terms'
  | 'login'
  | 'admin'
  | 'admin/home-content'
  | 'admin/about'
  | 'admin/farm-services'
  | 'admin/gallery'
  | 'admin/blogs'
  | 'admin/team'
  | 'admin/products'
  | 'admin/categories'
  | 'admin/orders';

export const ADMIN_PAGES: NavPage[] = [
  'admin',
  'admin/home-content',
  'admin/about',
  'admin/farm-services',
  'admin/gallery',
  'admin/blogs',
  'admin/team',
  'admin/products',
  'admin/categories',
  'admin/orders',
];

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedSize: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'herd' | 'milk' | 'pasture' | 'tours' | 'products';
  categoryLabel: string;
  image: string;
  caption: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  category: 'distributor' | 'farmer' | 'business' | 'consumer' | 'hospitality';
  avatar?: string;
  date?: string;
  product?: string;
  verified?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: 'milk' | 'yoghurt' | 'mala' | 'feed' | 'artisan';
  sizes: string[];
  unitNote: string;
  features: string[];
  image: string;
  badge?: string;
  price?: number;
  priceNote?: string;
  inStock?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  ctaText: string;
  ctaAction: 'booking' | 'contact' | 'order';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  tags: string[];
  readTime: string;
  summary: string;
  content: string[];
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  image?: string;
}

export interface TourBookingForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  groupType: 'Family' | 'School' | 'Corporate' | 'Individual' | 'Farmers Cooperative';
  groupSize: string;
  preferredTime: 'Morning (9:00 AM)' | 'Afternoon (2:00 PM)';
  notes: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: 'General Inquiry' | 'Product Inquiry' | 'Farm Visit' | 'Wholesale' | 'Livestock & AI' | 'Support & Feedback';
  subject: string;
  message: string;
  consent: boolean;
}

// ---------------------------------------------------------------------------
// Admin / API models (mirrors the live API at the old more-moreDairyLimited app)
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  permissions: string[];
}

export interface HeroSection {
  title: string;
  description: string;
  imageUrl: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface SpecialOffer {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  order: number;
}

export interface StatsCounter {
  _id?: string;
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  order: number;
}

export interface NewsletterSection {
  title: string;
  description: string;
  buttonText: string;
  placeholderText: string;
}

export interface AboutHero {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export interface CompanyStat {
  _id?: string;
  label: string;
  value: string;
  icon: string;
  description: string;
  order: number;
}

export interface CompanyValue {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Milestone {
  _id?: string;
  year: number;
  title: string;
  description: string;
  order: number;
}

export interface CompanyMission {
  title: string;
  description: string;
  imageUrl: string;
}

export interface FarmServiceRecord {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
}

export interface GalleryRecord {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  altText?: string;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
}

export interface BlogRecord {
  _id?: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  published?: boolean;
  featuredImage?: string;
  createdAt?: string;
}

export interface TeamMemberRecord {
  _id?: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  email: string;
  phone?: string;
  isActive?: boolean;
}

export interface ProductVariant {
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  attributes?: Record<string, string>;
}

export interface ProductRecord {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  categories: string[];
  images?: string[];
  variants?: ProductVariant[];
  isActive?: boolean;
  brand?: string;
  specifications?: Record<string, string>;
  isFresh?: boolean;
  isNew?: boolean;
}

export interface CategoryRecord {
  _id?: string;
  name: string;
  description?: string;
  parent?: { _id?: string; id?: string; name?: string } | string | null;
  image?: string;
  isActive?: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface OrderRecord {
  _id?: string;
  userId?: string;
  totalAmount: number;
  items: OrderItem[];
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  trackingNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}
