import React, { createContext, useContext, useEffect, useState } from 'react';
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
} from '../types';
import { homeContentApi, aboutApi, farmServicesApi, teamApi, galleryApi, blogsApi, productsApi } from '../services/cms';
import { mapProducts, mapServices, mapBlogs, mapGallery, mapTeam } from '../services/contentMaps';
import { PRODUCTS, SERVICES, BLOG_POSTS, GALLERY_ITEMS, TEAM_MEMBERS } from '../data/farmData';

interface SiteContentValue {
  loading: boolean;
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
  // Mapped collections (fall back to static site data when the API has none)
  productItems: ProductItem[];
  serviceItems: ServiceItem[];
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
  teamItems: TeamMember[];
}

const SiteContentContext = createContext<SiteContentValue | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    let cancelled = false;

    const settle = <T,>(p: PromiseSettledResult<T>): T | null =>
      p.status === 'fulfilled' ? p.value : null;

    Promise.allSettled([
      homeContentApi.getHeroSection(),
      homeContentApi.getSpecialOffers(),
      homeContentApi.getStatsCounters(),
      homeContentApi.getNewsletterSection(),
      aboutApi.getAboutHero(),
      aboutApi.getCompanyStats(),
      aboutApi.getCompanyValues(),
      aboutApi.getMilestones(),
      aboutApi.getCompanyMission(),
      farmServicesApi.getAll(),
      teamApi.getAll(),
      galleryApi.findAll(),
      blogsApi.getAll(),
      productsApi.getAll(),
    ])
      .then(([h, o, c, n, ah, as, av, am, mi, fs, tm, ga, bl, pr]) => {
        if (cancelled) return;
        setHero(settle(h));
        setSpecialOffers(settle(o) || []);
        setStatsCounters(settle(c) || []);
        setNewsletter(settle(n));
        setAboutHero(settle(ah));
        setCompanyStats(settle(as) || []);
        setCompanyValues(settle(av) || []);
        setMilestones(settle(am) || []);
        setMission(settle(mi));
        setFarmServices(settle(fs) || []);
        setTeamMembers(settle(tm) || []);
        setGallery(settle(ga) || []);
        setBlogs(settle(bl) || []);
        setProducts(settle(pr) || []);
      })
      .catch((err) => console.error('Failed to load site content from API:', err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const productItems = mapProducts(products);
  const serviceItems = mapServices(farmServices);
  const blogPosts = mapBlogs(blogs);
  const galleryItems = mapGallery(gallery);
  const teamItems = mapTeam(teamMembers);

  const value: SiteContentValue = {
    loading,
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
    productItems: productItems.length > 0 ? productItems : PRODUCTS,
    serviceItems: serviceItems.length > 0 ? serviceItems : SERVICES,
    blogPosts: blogPosts.length > 0 ? blogPosts : BLOG_POSTS,
    galleryItems: galleryItems.length > 0 ? galleryItems : GALLERY_ITEMS,
    teamItems: teamItems.length > 0 ? teamItems : TEAM_MEMBERS,
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
