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
  | 'terms';

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
  image: string;
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
