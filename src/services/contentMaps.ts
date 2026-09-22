import {
  ProductItem,
  ServiceItem,
  BlogPost,
  GalleryItem,
  TeamMember,
  ProductRecord,
  FarmServiceRecord,
  BlogRecord,
  GalleryRecord,
  TeamMemberRecord,
} from '../types';

const FALLBACK_IMAGES = {
  product:
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
  service:
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
  blog: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
  // Intentionally empty: team members default to an icon placeholder (no human faces).
  team: '',
};

function inferProductCategory(categories: string[] | undefined): ProductItem['category'] {
  const joined = (categories || []).join(' ').toLowerCase();
  if (joined.includes('milk')) return 'milk';
  if (joined.includes('yogur')) return 'yoghurt';
  if (joined.includes('mala') || joined.includes('cultured')) return 'mala';
  if (joined.includes('feed') || joined.includes('meal')) return 'feed';
  return 'artisan';
}

export function mapProducts(records: ProductRecord[] | null | undefined): ProductItem[] {
  if (!records || records.length === 0) return [];
  return records.map((p, index) => {
    const variants = p.variants || [];
    return {
      id: p._id || p.id || `api-product-${index}`,
      name: p.name || 'Fresh Dairy Product',
      shortDesc: (p.description || '').slice(0, 120),
      fullDesc: p.description || '',
      category: inferProductCategory(p.categories),
      sizes: variants.map((v) => v.name).filter(Boolean),
      unitNote: (p.categories || []).join(' • '),
      features:
        variants.length > 0
          ? variants.map((v) => `${v.name} — KSh ${v.price}`)
          : ['Farm-fresh and quality tested daily'],
      image:
        p.images && p.images.length > 0 ? p.images[0] : FALLBACK_IMAGES.product,
      badge: p.isFresh ? 'Farm Fresh' : p.isNew ? 'New' : undefined,
      price: p.price,
      priceNote: p.price != null ? `KSh ${p.price}` : undefined,
      inStock: p.isActive !== false,
    };
  });
}

export function mapServices(records: FarmServiceRecord[] | null | undefined): ServiceItem[] {
  if (!records || records.length === 0) return [];
  return records.map((s, index) => ({
    id: s._id || `api-service-${index}`,
    title: s.title || 'Farm Service',
    shortDesc: (s.description || '').slice(0, 120),
    fullDesc: s.description || '',
    features: s.features || [],
    image: s.image || FALLBACK_IMAGES.service,
    ctaText: 'Book This Service',
    ctaAction: 'booking' as const,
  }));
}

export function mapBlogs(records: BlogRecord[] | null | undefined): BlogPost[] {
  if (!records || records.length === 0) return [];
  return records.map((b, index) => {
    const paragraphs = (b.content || '').split(/\n+/).filter((p) => p.trim());
    const summary = paragraphs.join(' ').slice(0, 160);
    return {
      id: b._id || `api-blog-${index}`,
      slug: b._id || `api-blog-${index}`,
      title: b.title || 'Farm Story',
      author: b.author || 'Moo & More Team',
      authorRole: 'Moo & More Dairy Farm',
      date: b.createdAt || new Date().toISOString(),
      tags: b.tags || [],
      readTime: `${Math.max(1, Math.ceil((b.content || '').length / 1200))} min read`,
      summary,
      content: paragraphs.length > 0 ? paragraphs : ['Coming soon...'],
      image: b.featuredImage || FALLBACK_IMAGES.blog,
    };
  });
}

const GALLERY_CATEGORIES: Record<string, { key: GalleryItem['category']; label: string }> = {
  herd: { key: 'herd', label: 'Our Herd' },
  cow: { key: 'herd', label: 'Our Herd' },
  cattle: { key: 'herd', label: 'Our Herd' },
  milk: { key: 'milk', label: 'Fresh Milk' },
  milking: { key: 'milk', label: 'Fresh Milk' },
  pasture: { key: 'pasture', label: 'Green Pastures' },
  grass: { key: 'pasture', label: 'Green Pastures' },
  tour: { key: 'tours', label: 'Farm Tours' },
  visit: { key: 'tours', label: 'Farm Tours' },
  product: { key: 'products', label: 'Our Products' },
  yoghurt: { key: 'products', label: 'Our Products' },
};

export function mapGallery(records: GalleryRecord[] | null | undefined): GalleryItem[] {
  if (!records || records.length === 0) return [];
  return records.map((g, index) => {
    const tags = (g.tags || []).map((t) => t.toLowerCase());
    let category: GalleryItem['category'] = 'all';
    let categoryLabel = 'The Farm';
    for (const tag of tags) {
      const match = GALLERY_CATEGORIES[tag];
      if (match) {
        category = match.key;
        categoryLabel = match.label;
        break;
      }
    }
    return {
      id: g._id || `api-gallery-${index}`,
      title: g.title || 'Farm Moment',
      category,
      categoryLabel,
      image: g.imageUrl || FALLBACK_IMAGES.service,
      caption: g.description || '',
      date: g.createdAt,
    };
  });
}

export function mapTeam(records: TeamMemberRecord[] | null | undefined): TeamMember[] {
  if (!records || records.length === 0) return [];
  return records.map((m, index) => ({
    id: m._id || `api-team-${index}`,
    name: m.name || 'Team Member',
    role: m.position || 'Farm Team',
    bio: m.bio || '',
    specialty: '',
    image: m.image || FALLBACK_IMAGES.team,
  }));
}
