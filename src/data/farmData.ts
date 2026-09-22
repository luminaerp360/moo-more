import { BlogPost, GalleryItem, ProductItem, ServiceItem, TeamMember, Testimonial } from '../types';

export const FARM_INFO = {
  name: 'Moo & More Dairy Farm',
  legalName: 'Moo & More Dairy Farm Limited',
  tagline: "It's all about quality",
  heroFraming: 'Welcome to Moo & More — Green Pastures, Countryside',
  founded: 2023,
  ownershipNote: 'Commercial Agricultural Enterprise',
  location: 'Dadira, 7km off Bumala Centre, on the Kisumu–Busia Highway, Kenya',
  shortLocation: 'Dadira, Bumala, Busia County, Kenya',
  phone: '+254 711 320959',
  phoneRaw: '+254711320959',
  whatsappUrl: 'https://wa.me/254711320959',
  email: 'mooandmoredairyfarmlimited@gmail.com',
  hours: 'Mon–Sat: 7:00 AM – 6:00 PM',
  googleMapsUrl: 'https://www.google.com/maps?q=moo+%26+more+dairy+farm',
  embedMapUrl: 'https://maps.google.com/maps?q=Bumala%20Centre%20Busia%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed',
  mission: 'To provide farm-fresh, natural dairy products to families across Kenya, while championing sustainable farming, animal welfare, and community development.',
  stats: {
    animals: '80+',
    animalsLabel: 'Animals in Herd',
    dailyProduction: '500L+',
    dailyProductionLabel: 'Daily Milk Production',
    productsCount: '15+',
    productsLabel: 'Fresh Dairy Products',
    customersCount: '1,200+',
    customersLabel: 'Customers Served',
    yearsInBusiness: '3+',
    yearsLabel: 'Years in Business'
  },
  values: [
    {
      id: 'quality',
      title: 'Quality',
      desc: 'Pure, unadulterated milk collected daily under strict hygiene protocols and chilled immediately below 4°C with zero chemical additives or preservatives.'
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      desc: 'Eco-conscious pasture rotation, zero-waste organic manure recycling into lush Napier grass and fodder, and water conservation practices.'
    },
    {
      id: 'animal-welfare',
      title: 'Animal Welfare',
      desc: 'Free-range exercise, scientifically balanced nutritional rations, continuous veterinary oversight, and gentle handling to ensure contented, thriving cattle.'
    },
    {
      id: 'community',
      title: 'Community',
      desc: 'Empowering local smallholders through practical training workshops, high-grade breeding genetics, fair partnerships, and local employment.'
    }
  ],
  timeline: [
    {
      year: '2023',
      title: 'Farm Established',
      desc: 'Moo & More Dairy Farm was established in Dadira with a handpicked foundation herd and an ambitious vision to deliver pure, farm-fresh milk to Kenyan families.'
    },
    {
      year: '2024',
      title: 'Expanded Product Range',
      desc: 'Invested in modern on-site processing to launch small-batch strawberry, vanilla, and plain yoghurts, traditional thick maziwa mala, and high-protein dairy meal.'
    },
    {
      year: '2025',
      title: 'Online Shop & Home Delivery',
      desc: 'Launched convenient digital order channels and reliable cold-chain delivery routes across western Kenya and expanding urban centers.'
    },
    {
      year: '2026',
      title: '1,200+ Milestone & B2B Expansion',
      desc: 'Celebrated serving over 1,200 happy homes, schools, cafes, and hotels with over 500 liters supplied every single morning.'
    }
  ]
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'fresh-milk',
    name: '100% Pure Fresh Cow Milk',
    shortDesc: 'Collected every morning from our free-range herd and delivered straight to your door.',
    fullDesc: 'Collected every morning from our free-range herd and delivered straight to your door. No preservatives, no additives — just honest, natural milk the way it should be. Chilled to below 4°C within minutes of milking.',
    category: 'milk',
    sizes: ['1 Litre Pouch / Bottle', '2 Litre Family Jug', '5 Litre Dispenser', 'Bulk 20L–50L Aluminum Cans'],
    unitNote: 'Fresh daily collection',
    features: ['Zero additives or artificial preservatives', 'Delivered within 12 hours of milking', 'Tested daily for density and purity', 'Cold-chain guaranteed'],
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    badge: 'Farm Best Seller',
    price: 110,
    priceNote: 'KSh 110 / Litre',
    inStock: true
  },
  {
    id: 'handcrafted-yoghurt',
    name: 'Handcrafted Probiotic Yoghurt',
    shortDesc: 'Small-batch artisanal yoghurt made with fresh farm milk and active live cultures.',
    fullDesc: 'Our yoghurt is made in small batches from fresh farm milk using live cultures (Lactobacillus bulgaricus & Streptococcus thermophilus). Naturally rich, thick, creamy, and wholesome.',
    category: 'yoghurt',
    sizes: ['250ml Grab & Go', '500ml Tub', '1 Litre Family Tub', '5 Litre Catering Tub'],
    unitNote: 'Flavours: Strawberry, Vanilla & Plain Natural',
    features: ['Active gut-friendly live probiotics', 'Real fruit purees and gentle sweetness', 'High in natural calcium & bio-available protein', 'No synthetic stabilizers or gelatin'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    badge: 'Customer Favorite',
    price: 135,
    priceNote: 'From KSh 135 (500ml)',
    inStock: true
  },
  {
    id: 'maziwa-mala',
    name: 'Traditional Maziwa Mala',
    shortDesc: 'Cultured sour milk fermented slowly for authentic countryside tang and velvet creaminess.',
    fullDesc: 'Crafted following time-honored Kenyan dairy traditions, our Maziwa Mala has the perfect refreshing tartness, velvety texture, and cooling probiotic nourishment.',
    category: 'mala',
    sizes: ['500ml Bottle', '1 Litre Jug', '2 Litre Family Size'],
    unitNote: 'Cultured naturally',
    features: ['Traditional slow-batch incubation', 'Ideal pairing with ugali and greens', 'Aids digestion and supports gut health', 'Pure whole cow milk base'],
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    badge: 'Kenyan Classic',
    price: 105,
    priceNote: 'From KSh 105 (500ml)',
    inStock: true
  },
  {
    id: 'dairy-meal',
    name: 'Moo & More High-Yield Dairy Meal',
    shortDesc: 'Scientifically balanced livestock feed formulation to optimize cow nutrition and milk output.',
    fullDesc: 'Formulated by our livestock nutritionists using premium grains, protein meals, vitamins, and trace minerals. Developed originally for our herd and now available to local farmers.',
    category: 'feed',
    sizes: ['10kg Sample Bag', '25kg Standard Bag', '50kg Commercial Sack', 'Ton Bulk Deliveries'],
    unitNote: 'Formulated for 16-18% Crude Protein',
    features: ['Enhances butterfat and protein content', 'Fortified with calcium, phosphorus and trace minerals', 'Improves rumen digestion efficiency', 'Strictly tested for zero aflatoxins'],
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    badge: 'Farmer Tested',
    price: 2450,
    priceNote: 'KSh 2,450 (50kg Bag)',
    inStock: true
  },
  {
    id: 'artisan-butter-cream',
    name: 'Artisan Farm Butter & Heavy Cream',
    shortDesc: 'Churched fresh from morning cream for pastry chefs, fine dining, and gourmet kitchens.',
    fullDesc: 'Rich yellow farm butter churned from sweet cream with no added colouring or water dilution, plus pasteurized heavy whipping cream for cafes and baking.',
    category: 'artisan',
    sizes: ['250g Salted / Unsalted Block', '500g Tub', '1L Fresh Cream Tub'],
    unitNote: 'Limited daily batch',
    features: ['High butterfat content (82%+)', 'Unmatched aroma and baking performance', 'Crafted for baristas and pastry chefs', 'No artificial colourants'],
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80',
    badge: 'Artisanal Batch',
    price: 480,
    priceNote: 'KSh 480 (500g Block)',
    inStock: true
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'fresh-milk-supply',
    title: 'Fresh Milk Supply',
    shortDesc: 'Daily delivery of farm-fresh cow milk to homes, schools, hotels, and businesses across the region.',
    fullDesc: 'We operate an unbroken cold-chain supply delivering pristine, wholesome cow milk collected every dawn. Whether you need a daily family litre or 200 litres for a boarding school or hotel, our dispatch schedule guarantees arrival before breakfast.',
    features: [
      'Same-day morning delivery available',
      'Continuous cold chain maintained below 4°C',
      'Flexible quantities (from 1 Litre to bulk 500L+)',
      'Convenient monthly subscription plans',
      'Lab quality tested daily for purity and fat content'
    ],
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Order Fresh Milk',
    ctaAction: 'order'
  },
  {
    id: 'dairy-products',
    title: 'Dairy Products',
    shortDesc: 'A wide range of fresh dairy products handcrafted from our farm’s milk — including yoghurt varieties and more.',
    fullDesc: 'From probiotic fruit-infused yoghurts to tart traditional maziwa mala and balanced cattle feeds, our value-added dairy line turns natural grass-fed milk into healthy, delicious everyday staples.',
    features: [
      'Strawberry yoghurt (real fruit puree & live cultures)',
      'Vanilla yoghurt (smooth, gently sweet breakfast treat)',
      'Plain natural yoghurt (zero added sugar, keto-friendly)',
      'Traditional maziwa mala (thick, refreshing probiotic sour milk)',
      'Nutritious dairy meal for high milk yields'
    ],
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Explore Products',
    ctaAction: 'order'
  },
  {
    id: 'farm-visits',
    title: 'Farm Visits & Educational Tours',
    shortDesc: 'Book a guided tour of our farm! See our happy cows, learn the science of dairy farming, and enjoy a hands-on experience.',
    fullDesc: 'Step into our green pastures in Dadira. Walk alongside our livestock specialists, witness our morning milking routines, feed the friendly calves, taste fresh chilled dairy, and gain practical insights into modern agricultural best practices.',
    features: [
      'Guided farm tours led by experienced herd managers',
      'Interactive cow and calf feeding experience',
      'Fresh milk and artisanal yoghurt tasting session',
      'Educational sessions on herd health & fodder silage',
      'Custom itineraries for schools, agricultural students & families',
      'Corporate team building retreats in countryside serenity'
    ],
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Book a Farm Tour',
    ctaAction: 'booking'
  },
  {
    id: 'wholesale-supply',
    title: 'Wholesale Supply',
    shortDesc: 'Reliable bulk milk and dairy product supply for supermarkets, restaurants, schools, hospitals, and institutions.',
    fullDesc: 'Consistency is the backbone of institutional catering. Moo & More provides scheduled contract deliveries, transparent invoicing, batch lab certificates, and a dedicated account manager so your kitchen or retail shelves never run dry.',
    features: [
      'Competitive tiered bulk pricing for businesses',
      'Consistent daily supply volume (500L+ capacity)',
      'Official food-safety and quality compliance certification',
      'Flexible delivery schedules (early morning / mid-day)',
      'Dedicated institutional account manager and hotline'
    ],
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
    ctaText: 'Request Wholesale Quote',
    ctaAction: 'contact'
  }
];

export const LIVESTOCK_SERVICES = [
  {
    id: 'dairy-management',
    title: 'Dairy Cattle Management',
    intro: 'Moo & More Dairy Farm specializes in healthy dairy cow breeding, nutrition, and herd management.',
    bullets: [
      {
        title: 'High-Yield Dairy Breeds',
        desc: 'Specializing in robust Holstein Friesian, Ayrshire, and Jersey crosses bred specifically for East African climatic resilience and high butterfat yield.'
      },
      {
        title: 'Optimal Cow Nutrition',
        desc: 'Total Mixed Ration (TMR) protocols combining silage, desmodium, Napier grass, and mineral premixes to support sustained lactation curves.'
      },
      {
        title: 'Expert Herd Care',
        desc: 'Routine hoof trimming, mastitis prevention monitoring, scheduled deworming, and clean paddock housing that keeps cattle relaxed and healthy.'
      }
    ]
  },
  {
    id: 'ai-breeding',
    title: 'Artificial Insemination & Breeding',
    intro: 'Moo & More Dairy Farm uses advanced AI techniques to improve cattle genetics for higher milk yield.',
    bullets: [
      {
        title: 'Selective Breeding Programs',
        desc: 'Partnering with certified gene banks to procure sexed semen from proven sire lines boasting high longevity and superior udder conformation.'
      },
      {
        title: 'Genetic Improvement',
        desc: 'Upgrading indigenous and crossbred cattle into prolific dairy producers that reliably yield 20–30+ litres per cow per day.'
      },
      {
        title: 'Higher Dairy Production',
        desc: 'Measurable generational increases in total milk solids, disease resistance, and calving ease for both our farm and partner smallholders.'
      }
    ]
  }
];

export const TIMELINE_MILESTONES = [
  {
    year: '2023',
    title: 'Farm Founded in Dadira',
    description: 'Established the farm 7km off Bumala Centre along the Kisumu–Busia Highway. Built modern zero-grazing barns, automated milking parlour, and introduced an inaugural herd of high-grade Holstein Friesians.'
  },
  {
    year: '2024',
    title: 'Value-Addition & Yoghurt Launch',
    description: 'Commissioned on-site cold-room and fermentation unit. Introduced handcrafted strawberry, vanilla, and natural yoghurts plus traditional Maziwa Mala, expanding direct retail supply to local families.'
  },
  {
    year: '2025',
    title: 'Breeding Genetics & Community Outreach',
    description: 'Launched the Artificial Insemination (AI) service partnership with regional veterinarians. Organized farmer field demonstration days on silage preparation and dairy cattle nutrition.'
  },
  {
    year: '2026',
    title: 'Wholesale Network & Digital Expansion',
    description: 'Achieved daily distribution serving over 1,200 loyal customers, institutions, and supermarkets across Western Kenya with guaranteed morning cold-chain delivery.'
  }
];

export const COMMUNITY_MODULES = [
  {
    id: 'education-outreach',
    title: 'Education & Outreach',
    icon: 'GraduationCap',
    description: 'Hands-on practical training for smallholder farmers and agricultural groups on sustainable livestock management, clean milk handling, and regenerative pasture cultivation.',
    points: [
      'Farmer training workshops in Busia & Kisumu counties',
      'Demonstrations on silage making, Napier grass and Desmodium intercropping',
      'Youth & women empowerment in commercial agribusiness'
    ]
  },
  {
    id: 'technology-integration',
    title: 'Technology Integration',
    icon: 'Cpu',
    description: 'Deploying modern dairy solutions to eliminate manual contamination, protect cow comfort, and track individual milk yields with precision.',
    points: [
      'Automated milking cluster units with gentle vacuum pulsation',
      'Immediate rapid-chill storage keeping milk strictly under 4°C',
      'Digital herd health logging & data-driven feeding formulas'
    ]
  },
  {
    id: 'artificial-insemination',
    title: 'Artificial Insemination (AI)',
    icon: 'Dna',
    description: 'Affordable access to superior dairy genetics for local cattle keepers seeking to transform low-yield herds into high-output milk producers.',
    points: [
      'Certified semen from high-transmitting Holstein Friesian & Jersey sires',
      'Guidance on heat detection timing and reproductive health',
      'Technical field visits by qualified bovine specialists'
    ]
  },
  {
    id: 'genetic-improvement',
    title: 'Genetic Improvement',
    icon: 'TrendingUp',
    description: 'Fostering long-term regional herd upgrades that increase milk production from 5L to 20L+ per cow daily while building disease hardiness.',
    points: [
      'Generational improvements in butterfat percentage and protein yield',
      'Selection for calving ease, maternal temperament, and udder conformation',
      'Measurable productivity boosts for household dairy incomes'
    ]
  }
];

export const COMMUNITY_TECH_CARDS = [
  {
    id: 'education',
    title: 'Education & Outreach',
    desc: 'Moo & More Dairy Farm provides hands-on training for farmers and the community on sustainable livestock farming, pasture management, and clean milk handling.',
    iconName: 'GraduationCap'
  },
  {
    id: 'technology',
    title: 'Technology Integration',
    desc: 'We embrace modern farming solutions, including automated milking systems, rapid chilling tanks, and smart livestock monitoring to track herd health.',
    iconName: 'Cpu'
  },
  {
    id: 'ai-training',
    title: 'Artificial Insemination',
    desc: 'Moo & More Dairy Farm offers advanced breeding techniques to enhance dairy cattle genetics and productivity across Busia and western Kenya.',
    iconName: 'Dna'
  },
  {
    id: 'genetics',
    title: 'Genetic Improvement',
    desc: 'Our farm focuses on selective breeding and AI to improve livestock health, milk yield, and overall productivity for resilient rural prosperity.',
    iconName: 'TrendingUp'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'journey-of-a-litre-of-milk',
    slug: 'journey-of-a-litre-of-milk',
    title: 'From Our Farm to Your Table: The Journey of a Litre of Milk',
    author: 'James Otieno',
    authorRole: 'Farm Manager, Moo & More Dairy Farm',
    date: 'May 11, 2026',
    tags: ['milk production', 'dairy farm', 'freshness'],
    readTime: '4 min read',
    summary: 'A behind-the-scenes look at how milk harvested at dawn in Dadira reaches your breakfast table in under 12 hours — compared to 10–15 days for typical supermarket cartons.',
    content: [
      'Every morning at 5:00 AM, while the morning mist still blankets our Dadira pastures, the gentle hum of our milking parlour begins. Before a single drop of milk is drawn, our veterinary and care staff conduct thorough individual health checks on each cow. Clean udders are disinfected, inspected, and gently stimulated.',
      'Our cows graze freely in open paddocks and enjoy a tailored ration of fresh Napier grass, sorghum silage, and nutrient-dense dairy meal. Because stress significantly affects milk quality and animal wellbeing, our handling protocols are quiet, calm, and humane.',
      'Once drawn through sanitized stainless-steel piping, the raw milk enters our bulk chilling vat within seconds. Here, temperature is rapidly brought down from body heat to below 4°C in under 20 minutes. This rapid chill halts bacterial growth immediately, preserving the milk’s delicate sweet proteins and natural vitamins without requiring chemical preservatives.',
      'Before packaging, every batch undergoes mandatory physical and laboratory testing: density checks with hydrometers, alcohol tests to verify acidity, and sediment checks. Only milk meeting our benchmark is bottled in food-grade, sealed containers.',
      'By 7:30 AM, our refrigerated delivery vehicles and insulated dispatch motorcycles depart for homes, cafes, and schools across the region. While commercial long-life supermarket milk often spends 10 to 15 days travelling through brokers, consolidation centres, and warehouses, Moo & More milk arrives on your kitchen counter within 12 hours of leaving the cow. That is what true farm freshness tastes like.'
    ],
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'health-benefits-of-yoghurt',
    slug: 'health-benefits-of-yoghurt',
    title: 'The Health Benefits of Yoghurt: Why You Should Eat It Every Day',
    author: 'Nutrition Team',
    authorRole: 'Moo & More Dairy Farm',
    date: 'May 11, 2026',
    tags: ['yoghurt', 'health', 'probiotics', 'nutrition'],
    readTime: '5 min read',
    summary: 'Why live probiotic cultures (Lactobacillus & Streptococcus) make authentic artisanal yoghurt a powerhouse for digestive balance, immunity, and children’s skeletal growth.',
    content: [
      'Yoghurt has been revered for thousands of years, but not all yoghurts sitting on modern supermarket shelves offer real health value. Many commercial brands are heavily processed, pasteurized after culturing (which kills beneficial bacteria), and thickened with starches and gelatin.',
      'At Moo & More Dairy Farm, we craft our yoghurt using a traditional, slow-batch incubation process. We introduce live, active probiotic strains — primarily Lactobacillus bulgaricus and Streptococcus thermophilus — into fresh whole milk. As these friendly bacteria ferment the milk sugars (lactose), they produce natural lactic acid, which creates that luxurious creamy curd and pleasant tangy flavour.',
      '1. Superior Gut Health and Digestion: Probiotics repopulate your intestinal microbiome with protective flora. This strengthens the gut barrier against pathogens, alleviates bloating, and aids overall bowel regularity. Even people with mild lactose sensitivity often enjoy our yoghurt comfortably because the live cultures pre-digest much of the lactose.',
      '2. Natural Immunity Booster: Over 70% of the human immune system resides in the gut lining. Regular consumption of active bacterial cultures stimulates antibody-producing cells and reduces inflammatory markers.',
      '3. Bioavailable Calcium & Strong Bones: A single 250ml cup of Moo & More yoghurt provides roughly 30% of a child’s or adult’s daily calcium requirements. Because it is accompanied by natural milk fats and vitamin D precursors, this calcium is absorbed far more effectively by the body than through synthetic supplements.',
      '4. Honest Fruit, Moderate Sweetness: When making our Strawberry and Vanilla varieties, we use real purees and keep sugar strictly moderate. For those following low-sugar or diabetic lifestyles, our Plain Natural Yoghurt and Maziwa Mala offer complete nutritional power with zero added sugars.',
      'Make a habit of enjoying a bowl of chilled Moo & More yoghurt with fresh fruit or rolled oats each morning, and feel the natural difference within days.'
    ],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Kamau Wanjiru',
    role: 'Dairy Distributor',
    location: 'Nairobi',
    rating: 5,
    quote: 'Moo & More Dairy has been my top supplier for years. Their milk is always fresh and of uncompromising quality!',
    category: 'distributor',
    date: 'May 2026',
    product: 'Bulk Fresh Cow Milk (200L Daily)',
    verified: true
  },
  {
    id: 't-2',
    name: 'Achieng Otieno',
    role: 'Local Farmer',
    location: 'Kisumu',
    rating: 5,
    quote: 'Their dairy cows are remarkably healthy and well-bred. I learned so much from visiting their Dadira pastures!',
    category: 'farmer',
    date: 'April 2026',
    product: 'Dairy AI Genetics & Pasture Tour',
    verified: true
  },
  {
    id: 't-3',
    name: 'Mutiso Ndunge',
    role: 'Milk Vendor',
    location: 'Machakos',
    rating: 5,
    quote: 'The strawberry and vanilla yoghurt they produce is the fastest-selling stock in my shop. My customers love it!',
    category: 'distributor',
    date: 'May 2026',
    product: 'Probiotic Strawberry Yoghurt 500ml',
    verified: true
  },
  {
    id: 't-4',
    name: 'Cherono Kiptoo',
    role: 'Cafe Owner',
    location: 'Eldoret',
    rating: 5,
    quote: 'I only use Moo & More Dairy milk for my coffee and lattes. The natural creaminess and steam consistency are unmatched!',
    category: 'business',
    date: 'April 2026',
    product: 'Barista Whole Milk Supply (30L/day)',
    verified: true
  },
  {
    id: 't-5',
    name: 'Abdi Hassan',
    role: 'Hotel Manager',
    location: 'Garissa',
    rating: 5,
    quote: 'Their fresh dairy products and artisanal cheese are top-tier. Our breakfast buffet chefs love working with them!',
    category: 'hospitality',
    date: 'March 2026',
    product: 'Hospitality Dairy & Cream Supply',
    verified: true
  },
  {
    id: 't-6',
    name: 'Wambui Njeri',
    role: 'Home Consumer',
    location: 'Nakuru',
    rating: 5,
    quote: 'Moo & More milk reminds me of my countryside childhood. Pure, sweet, unadulterated, and nutritious for my family!',
    category: 'consumer',
    date: 'May 2026',
    product: 'Home Daily Delivery (3 Litres)',
    verified: true
  },
  {
    id: 't-7',
    name: 'Omolo Nyaboke',
    role: 'Supermarket Owner',
    location: 'Kisii',
    rating: 5,
    quote: 'Their food-grade packaging is immaculate, and cold-chain compliance means zero spoilage. A truly dependable brand!',
    category: 'distributor',
    date: 'February 2026',
    product: 'Retail Packed Milk & Mala Crates',
    verified: true
  },
  {
    id: 't-8',
    name: 'Mwikali Muthoki',
    role: 'Mother of Three',
    location: 'Mombasa',
    rating: 5,
    quote: 'My children adore their fruit yoghurt cups and fresh milk. It is an essential part of our daily school breakfast!',
    category: 'consumer',
    date: 'May 2026',
    product: 'Family Yoghurt Variety Pack',
    verified: true
  },
  {
    id: 't-9',
    name: 'Otieno Juma',
    role: 'Businessman',
    location: 'Kakamega',
    rating: 5,
    quote: 'I have tested numerous dairy brands across Western Kenya, but Moo & More consistently stands above the rest in purity.',
    category: 'consumer',
    date: 'April 2026',
    product: 'Traditional Maziwa Mala 500ml',
    verified: true
  },
  {
    id: 't-10',
    name: 'Kendi Mureithi',
    role: 'Clinical Nutritionist',
    location: 'Meru',
    rating: 5,
    quote: 'I routinely recommend Moo & More live probiotic yoghurt to my gut-health patients. Pure fermentation with no gelatin fillers!',
    category: 'business',
    date: 'March 2026',
    product: 'Plain Natural Probiotic Yoghurt',
    verified: true
  },
  {
    id: 't-11',
    name: 'Ahmed Noor',
    role: 'Restaurant Owner',
    location: 'Isiolo',
    rating: 5,
    quote: 'Their whole milk brings authentic richness to our specialty chai and signature sauces. Highly recommended!',
    category: 'hospitality',
    date: 'April 2026',
    product: 'Commercial Kitchen Supply 50L',
    verified: true
  },
  {
    id: 't-12',
    name: 'Moraa Bosibori',
    role: 'Dairy Farmer',
    location: 'Nyamira',
    rating: 5,
    quote: 'As a fellow dairy cattle keeper, I deeply admire their clean silage techniques and high-transmitting genetics. A beacon farm!',
    category: 'farmer',
    date: 'May 2026',
    product: 'Bovine Breeding Consultation',
    verified: true
  },
  {
    id: 't-13',
    name: 'Ndungu Kariuki',
    role: 'Wholesale Depot Owner',
    location: 'Thika',
    rating: 5,
    quote: 'Punctual morning deliveries, transparent lab quality checks, and top-tier milk fat percentage. My customers demand it!',
    category: 'distributor',
    date: 'May 2026',
    product: 'Weekly Wholesale Depot Milk Dispatch',
    verified: true
  },
  {
    id: 't-14',
    name: 'Njoki Wairimu',
    role: 'Master Pastry Chef',
    location: 'Nyeri',
    rating: 5,
    quote: 'Their golden butter and heavy cream elevate my viennoiserie and wedding cakes to perfection. Truly authentic taste!',
    category: 'business',
    date: 'April 2026',
    product: 'Farm Fresh Heavy Cream & Butter',
    verified: true
  },
  {
    id: 't-15',
    name: 'Ali Mohamed',
    role: 'Coastal Retailer',
    location: 'Malindi',
    rating: 5,
    quote: 'Their chilled dairy consignments arrive fresh and in perfect condition every single dispatch. Exceptional professionalism!',
    category: 'distributor',
    date: 'March 2026',
    product: 'Chilled Milk & Maziwa Mala Consignment',
    verified: true
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'james-otieno',
    name: 'James Otieno',
    role: 'Farm Manager',
    bio: 'Oversees daily milking operations, cold chain logistics, and pasture management with over a decade of livestock experience in East Africa.',
    specialty: 'Herd Operations & Cold-Chain Logistics',
  },
  {
    id: 'dr-brenda-auma',
    name: 'Dr. Brenda Auma',
    role: 'Veterinary & Herd Health Officer',
    bio: 'Dedicated to preventative cow healthcare, vaccination scheduling, breeding synchronization, and humane animal welfare protocols.',
    specialty: 'Artificial Insemination & Bovine Medicine',
  },
  {
    id: 'grace-nekesa',
    name: 'Grace Nekesa',
    role: 'Dairy Processing & Quality Lead',
    bio: 'Directs the artisanal yoghurt incubation, testing, packaging, and food-safety hygiene standards at our on-site processing unit.',
    specialty: 'Probiotic Fermentation & Food Safety',
  },
  {
    id: 'nutrition-team',
    name: 'Livestock Nutrition & Agronomy Unit',
    role: 'Forage & Feed Specialists',
    bio: 'Formulates our high-yield dairy meal, tests fodder silage for peak crude protein, and trains local smallholder farmers on regenerative agriculture.',
    specialty: 'Total Mixed Ration (TMR) & Silage Agronomy',
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Morning Grazing in Dadira Pastures',
    category: 'pasture',
    categoryLabel: 'Pastures & Fields',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
    caption: 'Our pedigree dairy cattle enjoying free-range rotation on lush, nutrient-rich Napier grass paddocks at sunrise.',
    date: 'May 2026'
  },
  {
    id: 'g-2',
    title: 'Automated Milking & Rapid Chilling Vat',
    category: 'milk',
    categoryLabel: 'Milking & Cold Chain',
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1200&q=80',
    caption: 'Stainless-steel closed milking parlour where fresh milk is chilled to below 4°C within 15 minutes of collection.',
    date: 'April 2026'
  },
  {
    id: 'g-3',
    title: 'High-Producing Holstein Friesian Cows',
    category: 'herd',
    categoryLabel: 'Dairy Herd',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Our healthy, pedigree Holstein Friesian herd yielding over 22 litres of high-fat milk per cow daily.',
    date: 'May 2026'
  },
  {
    id: 'g-4',
    title: 'Handcrafted Probiotic Strawberry Yoghurt',
    category: 'products',
    categoryLabel: 'Artisan Dairy Products',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    caption: 'Freshly cultured small-batch probiotic yoghurt blended with genuine pure strawberry fruit puree.',
    date: 'May 2026'
  },
  {
    id: 'g-5',
    title: 'Guided School & Agricultural Tour',
    category: 'tours',
    categoryLabel: 'Farm Tours & Visitors',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    caption: 'Agricultural students and local farmers learning modern silage making and livestock hygiene during a weekend workshop.',
    date: 'March 2026'
  },
  {
    id: 'g-6',
    title: 'Healthy Calves in Individual Nursery Pens',
    category: 'herd',
    categoryLabel: 'Dairy Herd',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&q=80',
    caption: 'Young heifers receiving colostrum feeding and veterinary care in hygienic, ventilated calf hutches.',
    date: 'April 2026'
  },
  {
    id: 'g-7',
    title: 'Daily Dawn Bottling & Quality Inspection',
    category: 'milk',
    categoryLabel: 'Milking & Cold Chain',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80',
    caption: 'Food-grade sealed milk bottles tested for lactometer density and alcohol acidity before morning dispatch.',
    date: 'May 2026'
  },
  {
    id: 'g-8',
    title: 'Golden Farm Butter Churning Batch',
    category: 'products',
    categoryLabel: 'Artisan Dairy Products',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Traditional batch-churned pure sweet cream butter with 82%+ butterfat, prized by local bakers and pastry chefs.',
    date: 'April 2026'
  },
  {
    id: 'g-9',
    title: 'Family Day Experience at the Farm',
    category: 'tours',
    categoryLabel: 'Farm Tours & Visitors',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    caption: 'Visiting families tasting fresh chilled dairy, interacting with gentle cows, and touring our biogas energy plant.',
    date: 'May 2026'
  },
  {
    id: 'g-10',
    title: 'Silage Preparation & Fodder Conservation',
    category: 'pasture',
    categoryLabel: 'Pastures & Fields',
    image: 'https://images.unsplash.com/photo-1595085610896-fb31c7e64a9c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Chopping fresh sorghum and Napier grass packed tightly into underground bunker silos for year-round high nutrition.',
    date: 'February 2026'
  },
  {
    id: 'g-11',
    title: 'Traditional Thick Maziwa Mala Jugs',
    category: 'products',
    categoryLabel: 'Artisan Dairy Products',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Naturally cultured sour milk with authentic rich curds, perfect for pairing with Kenyan corn meal ugali.',
    date: 'May 2026'
  },
  {
    id: 'g-12',
    title: 'Veterinary Check & Genetic Heat Detection',
    category: 'herd',
    categoryLabel: 'Dairy Herd',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80',
    caption: 'Our resident livestock specialist reviewing health trackers, reproductive cycles, and Sire selection.',
    date: 'April 2026'
  }
];

