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

function inferProductCategory(
  name: string,
  description: string,
  categories?: (string | { name?: string })[]
): ProductItem['category'] {
  const catNames = (categories || [])
    .map((c) => (typeof c === 'object' && c ? c.name || '' : String(c)))
    .join(' ')
    .toLowerCase();
  const text = `${name} ${description} ${catNames}`.toLowerCase();

  if (text.includes('yogur')) return 'yoghurt';
  if (text.includes('mala') || text.includes('fermented') || text.includes('cultured')) return 'mala';
  if (text.includes('butter') || text.includes('ghee') || text.includes('cream')) return 'artisan';
  if (text.includes('feed') || text.includes('meal') || text.includes('silage') || text.includes('fodder')) return 'feed';
  if (text.includes('milk')) return 'milk';
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
      category: inferProductCategory(p.name || '', p.description || '', p.categories),
      sizes: variants.map((v) => v.name).filter(Boolean),
      unitNote: (p.categories || []).filter((c) => typeof c === 'string' && c.length < 30).join(' • '),
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

function inferServiceImage(title: string, image?: string): string {
  if (image && (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:'))) {
    return image;
  }
  const t = (title || '').toLowerCase();
  if (t.includes('fresh milk') || t.includes('raw milk') || t.includes('milk supply')) {
    return 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80';
  }
  if (t.includes('yoghurt') || t.includes('dairy product') || t.includes('mala') || t.includes('butter')) {
    return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80';
  }
  if (t.includes('visit') || t.includes('tour') || t.includes('training') || t.includes('education')) {
    return 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80';
  }
  if (t.includes('wholesale') || t.includes('bulk') || t.includes('institution') || t.includes('commercial')) {
    return 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80';
  }
  return FALLBACK_IMAGES.service;
}

function inferServiceId(s: FarmServiceRecord, index: number): string {
  const t = (s.title || '').toLowerCase();
  if (t.includes('fresh milk') || t.includes('milk supply')) return 'fresh-milk-supply';
  if (t.includes('dairy product') || t.includes('yoghurt')) return 'dairy-products';
  if (t.includes('visit') || t.includes('tour')) return 'farm-visits';
  if (t.includes('wholesale') || t.includes('bulk')) return 'wholesale-supply';
  return s._id || `api-service-${index}`;
}

export function mapServices(records: FarmServiceRecord[] | null | undefined): ServiceItem[] {
  if (!records || records.length === 0) return [];
  return records.map((s, index) => ({
    id: inferServiceId(s, index),
    title: s.title || 'Farm Service',
    shortDesc: (s.description || '').slice(0, 120),
    fullDesc: s.description || '',
    features: s.features || [],
    image: inferServiceImage(s.title || '', s.image),
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
