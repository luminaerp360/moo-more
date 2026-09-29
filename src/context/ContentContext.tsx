import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  TeamMemberRecord,
  GalleryRecord,
  BlogRecord,
  ProductRecord,
  ProductItem,
  ServiceItem,
  BlogPost,
  GalleryItem,
  TeamMember,
  StoreSettings,
  ReviewRecord,
  Testimonial,
} from '../types';
import { homeContentApi, aboutApi, farmServicesApi, teamApi, galleryApi, blogsApi, productsApi, settingsApi, reviewsApi } from '../services/cms';
import { mapProducts, mapServices, mapBlogs, mapGallery, mapTeam } from '../services/contentMaps';
import { PRODUCTS, SERVICES, BLOG_POSTS, GALLERY_ITEMS, TEAM_MEMBERS, TESTIMONIALS } from '../data/farmData';
import { getTenantId } from '../services/api';

interface SiteContentValue {
  loading: boolean;
  initialLoading: boolean;
  currentTenantId: string;
  refetchContent: () => Promise<void>;
  refreshContent: () => Promise<void>;
  hero: HeroSection | null;
  specialOffers: SpecialOffer[];
  statsCounters: StatsCounter[];
  newsletter: NewsletterSection | null;
  aboutHero: AboutHero | null;
  companyStats: CompanyStat[];
  companyValues: CompanyValue[];
  milestones: Milestone[];
  mission: CompanyMission | null;
  farmServices: FarmServiceRecord[];
  teamMembers: TeamMemberRecord[];
  gallery: GalleryRecord[];
  blogs: BlogRecord[];
  products: ProductRecord[];
  settings: StoreSettings | null;
  reviews: ReviewRecord[];
  // Mapped collections (fall back to static site data when the API has none)
  productItems: ProductItem[];
  serviceItems: ServiceItem[];
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
  teamItems: TeamMember[];
  testimonialItems: Testimonial[];
}

const SiteContentContext = createContext<SiteContentValue | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentTenantId, setCurrentTenantId] = useState<string>(() => getTenantId());
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [statsCounters, setStatsCounters] = useState<StatsCounter[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterSection | null>(null);
  const [aboutHero, setAboutHero] = useState<AboutHero | null>(null);
  const [companyStats, setCompanyStats] = useState<CompanyStat[]>([]);
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [mission, setMission] = useState<CompanyMission | null>(null);
  const [farmServices, setFarmServices] = useState<FarmServiceRecord[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberRecord[]>([]);
  const [gallery, setGallery] = useState<GalleryRecord[]>([]);
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);

  const loadContent = useCallback(async () => {
    setLoading(true);
    const activeTenant = getTenantId();
    setCurrentTenantId(activeTenant);

    const settle = <T,>(p: PromiseSettledResult<T>): T | null =>
      p.status === 'fulfilled' ? p.value : null;

    try {
      const [h, o, c, n, aboutRes, fs, tm, ga, bl, pr, st, revs] = await Promise.allSettled([
        homeContentApi.getHeroSection(),
        homeContentApi.getSpecialOffers(),
        homeContentApi.getStatsCounters(),
        homeContentApi.getNewsletterSection(),
        aboutApi.loadAboutContent(),
        farmServicesApi.getAll(),
        teamApi.getAll(),
        galleryApi.findAll(),
        blogsApi.getAll(),
        productsApi.getAll(),
        settingsApi.get(),
        reviewsApi.getVerified(),
      ]);

      setHero(settle(h));
      setSpecialOffers(settle(o) || []);
      setStatsCounters(settle(c) || []);
      setNewsletter(settle(n));

      const about = settle(aboutRes);
      if (about) {
        if (about.aboutHero) setAboutHero(about.aboutHero);
        if (Array.isArray(about.companyStats)) setCompanyStats(about.companyStats);
        if (Array.isArray(about.companyValues)) setCompanyValues(about.companyValues);
        if (Array.isArray(about.milestones)) setMilestones(about.milestones);
        if (about.companyMission) setMission(about.companyMission);
        if (Array.isArray(about.teamMembers) && about.teamMembers.length > 0) {
          setTeamMembers(about.teamMembers as TeamMemberRecord[]);
        }
      }

      const rawFs = settle(fs);
      const fsList = Array.isArray(rawFs)
        ? rawFs
        : (rawFs as any)?.value && Array.isArray((rawFs as any).value)
        ? (rawFs as any).value
        : [];
      setFarmServices(fsList);

      const rawTm = settle(tm);
      if (Array.isArray(rawTm) && rawTm.length > 0) {
        setTeamMembers(rawTm);
      }

      setGallery(settle(ga) || []);
      setBlogs(settle(bl) || []);
      setProducts(settle(pr) || []);
      setSettings(settle(st) || null);
      setReviews(settle(revs) || []);
    } catch (err) {
      console.error(`Failed to load site content from API for tenant ${activeTenant}:`, err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();

    const handleTenantChange = () => {
      loadContent();
    };

    window.addEventListener('tenant-change', handleTenantChange);
    window.addEventListener('storage', handleTenantChange);

    return () => {
      window.removeEventListener('tenant-change', handleTenantChange);
      window.removeEventListener('storage', handleTenantChange);
    };
  }, [loadContent]);

  const productItems = mapProducts(products);
  const serviceItems = mapServices(farmServices);
  const blogPosts = mapBlogs(blogs);
  const galleryItems = mapGallery(gallery);
  const teamItems = mapTeam(teamMembers);

  const dynamicTestimonials: Testimonial[] = reviews.map((r, idx) => ({
    id: r._id || r.id || `dyn-rev-${idx}`,
    name: r.name,
    role: r.role || 'Verified Customer',
    location: r.location || 'Kenya',
    rating: r.rating || 5,
    quote: r.comment,
    category: (r.category as any) || 'consumer',
    avatar: r.avatar,
    date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' }) : undefined,
    product: r.product,
    verified: true,
  }));

  const dynamicNames = new Set(dynamicTestimonials.map((d) => d.name.toLowerCase().trim()));
  const extraStatic = TESTIMONIALS.filter(
    (t) => !dynamicNames.has(t.name.toLowerCase().trim()),
  );
  const testimonialItems =
    dynamicTestimonials.length > 0
      ? [...dynamicTestimonials, ...extraStatic]
      : TESTIMONIALS;

  const value: SiteContentValue = {
    loading,
    initialLoading,
    currentTenantId,
    refetchContent: loadContent,
    refreshContent: loadContent,
    hero,
    specialOffers,
    statsCounters,
    newsletter,
    aboutHero,
    companyStats,
    companyValues,
    milestones,
    mission,
    farmServices,
    teamMembers,
    gallery,
    blogs,
    products,
    settings,
    reviews,
    productItems: productItems.length > 0 ? productItems : PRODUCTS,
    serviceItems: serviceItems.length > 0 ? serviceItems : SERVICES,
    blogPosts: blogPosts.length > 0 ? blogPosts : BLOG_POSTS,
    galleryItems: galleryItems.length > 0 ? galleryItems : GALLERY_ITEMS,
    teamItems: teamItems.length > 0 ? teamItems : TEAM_MEMBERS,
    testimonialItems,
  };

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export function useSiteContent(): SiteContentValue {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
