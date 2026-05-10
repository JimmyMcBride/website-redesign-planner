export type DesignSystemSlug = 'authority-flow' | 'market-spark' | 'craft-editorial';

export type DesignSystem = {
  slug: DesignSystemSlug;
  name: string;
  rationale: string;
  motion: string;
  tokens: {
    background: string;
    surface: string;
    surfaceAlt: string;
    ink: string;
    muted: string;
    primary: string;
    secondary: string;
    accent: string;
    line: string;
    shadow: string;
  };
  components: string[];
};

export type Example = {
  id: string;
  title: string;
  label: string;
  strategy: string;
  description: string;
  animation: string;
};

export type SourceSite = {
  url: string;
  lastAuditedAt: string;
};

export type ReportMeta = {
  businessName: string;
  market: string;
  preparedFor: string;
  reportDate: string;
  summary: string;
  sourceSite: SourceSite;
};

export const reportMeta: ReportMeta = {
  businessName: 'Acme Home Services',
  market: 'Metro area residential services',
  preparedFor: 'Client decision review',
  reportDate: 'Replace with capture date',
  sourceSite: {
    url: 'https://example.com/',
    lastAuditedAt: 'Not captured yet'
  },
  summary:
    'A client-ready research app that turns competitive evidence into a sharper homepage strategy, design-system choice, and four reviewable homepage directions.'
};

export const businessProfile = {
  offer: 'Fast, high-trust home service bookings with clear proof and simple next steps.',
  audience: 'Homeowners comparing reliability, response time, quality, and price confidence.',
  serviceArea: 'Replace with real service area',
  conversionGoal: 'Drive qualified quote requests and calls from high-intent visitors.',
  primaryCta: 'Book a consultation',
  secondaryCta: 'Compare services'
};

export const analysis = {
  recommendation:
    'Lead with trust and speed, then prove quality with visible outcomes, guarantees, and service-area relevance.',
  insights: [
    {
      title: 'Market Pattern',
      detail:
        'Competitors tend to rely on broad service claims. The opportunity is to make decision confidence visible above the fold.'
    },
    {
      title: 'Positioning Gap',
      detail:
        'Few sites connect response speed, proof, and next-step clarity in one cohesive flow.'
    },
    {
      title: 'Content Priority',
      detail:
        'Build pages around buyer risk: cost, timing, quality, safety, warranty, and location fit.'
    }
  ],
  competitorSignals: [
    {
      name: 'Competitor One',
      offer: 'Broad service availability',
      proof: 'Reviews and certification badges',
      seo: 'Service pages plus location terms',
      design: 'Conventional hero, dense navigation',
      confidence: 'Medium'
    },
    {
      name: 'Competitor Two',
      offer: 'Same-day response',
      proof: 'Phone-forward CTA and testimonials',
      seo: 'Blog and FAQ coverage',
      design: 'Bright promotional layout',
      confidence: 'Medium'
    },
    {
      name: 'Competitor Three',
      offer: 'Premium workmanship',
      proof: 'Before/after galleries',
      seo: 'Project pages and local landing pages',
      design: 'Image-led portfolio feel',
      confidence: 'Low until screenshots are captured'
    }
  ],
  sources: [
    'Replace with source URL and capture date',
    'Replace with search/review evidence',
    'Replace with Firecrawl crawl output path'
  ]
};

export const auditFindings = [
  {
    priority: 'P1',
    category: 'Conversion',
    title: 'Primary CTA needs stronger decision support',
    detail:
      'The first screen should pair the booking action with proof, availability, and risk reducers so visitors do not need to hunt for confidence.'
  },
  {
    priority: 'P1',
    category: 'Trust',
    title: 'Proof is present but not sequenced',
    detail:
      'Reviews, credentials, guarantees, and project examples should be organized around buyer objections, not scattered as generic badges.'
  },
  {
    priority: 'P2',
    category: 'SEO',
    title: 'Topic clusters need clearer page ownership',
    detail:
      'Service, location, FAQ, and project pages should map to distinct search intent instead of competing with each other.'
  },
  {
    priority: 'P2',
    category: 'UX',
    title: 'Navigation can better support repeat comparison',
    detail:
      'Buyers should be able to compare services, proof, process, and quote path from predictable nav labels.'
  },
  {
    priority: 'P3',
    category: 'Accessibility',
    title: 'Focus and contrast need verification',
    detail:
      'Final implementation should verify headings, form labels, focus states, contrast, and reduced-motion handling.'
  }
];

export const designSystems: DesignSystem[] = [
  {
    slug: 'authority-flow',
    name: 'Authority Flow',
    rationale:
      'Best when the buyer needs calm confidence: clear hierarchy, restrained color, evidence-forward sections, and practical conversion paths.',
    motion: 'Measured reveals, progress cues, and subtle scan effects.',
    tokens: {
      background: '#f7f3ea',
      surface: '#ffffff',
      surfaceAlt: '#edf2ee',
      ink: '#17201d',
      muted: '#5a6660',
      primary: '#0f6a59',
      secondary: '#b34e2b',
      accent: '#254f8d',
      line: '#d8ddd6',
      shadow: '0 20px 50px rgba(23, 32, 29, 0.12)'
    },
    components: ['Proof-led hero', 'Service evidence cards', 'Quote confidence panel', 'Structured FAQ rows']
  },
  {
    slug: 'market-spark',
    name: 'Market Spark',
    rationale:
      'Best when the site needs more energy: sharper contrast, dynamic comparison moments, and fast visual proof for impatient visitors.',
    motion: 'Snappy tile movement, active route marks, and confident hover states.',
    tokens: {
      background: '#f5f7fb',
      surface: '#ffffff',
      surfaceAlt: '#e9eef8',
      ink: '#171b28',
      muted: '#5d6679',
      primary: '#3559c7',
      secondary: '#d05b3f',
      accent: '#16816f',
      line: '#d8deea',
      shadow: '0 22px 55px rgba(31, 44, 86, 0.14)'
    },
    components: ['Action-first hero', 'Animated comparison grid', 'Fast quote module', 'Service fit chips']
  },
  {
    slug: 'craft-editorial',
    name: 'Craft Editorial',
    rationale:
      'Best when quality and taste matter: editorial pacing, tactile proof, quieter luxury, and stronger storytelling around outcomes.',
    motion: 'Layered reveals, gallery-like transitions, and slower proof sequencing.',
    tokens: {
      background: '#f8f5ef',
      surface: '#fffdf8',
      surfaceAlt: '#ece5d7',
      ink: '#211d19',
      muted: '#675e53',
      primary: '#7c3f2a',
      secondary: '#2e6b7a',
      accent: '#a77a1b',
      line: '#ddd2c1',
      shadow: '0 24px 60px rgba(61, 43, 30, 0.13)'
    },
    components: ['Editorial hero', 'Outcome gallery', 'Craft proof blocks', 'Concierge quote flow']
  }
];

export const examples: Example[] = [
  {
    id: '1',
    title: 'Homepage Layout 1',
    label: 'Replace with custom layout',
    strategy: 'Create one distinct arrangement of the source homepage media, copy, proof, and CTAs.',
    description: 'Blank scaffold. Replace with a fully designed homepage prototype based on captured source content.',
    animation: 'Replace with motion concept chosen for this layout.'
  },
  {
    id: '2',
    title: 'Homepage Layout 2',
    label: 'Replace with custom layout',
    strategy: 'Create a second distinct arrangement using the same source content and a different hierarchy.',
    description: 'Blank scaffold. Replace with a fully designed homepage prototype based on captured source content.',
    animation: 'Replace with motion concept chosen for this layout.'
  },
  {
    id: '3',
    title: 'Homepage Layout 3',
    label: 'Replace with custom layout',
    strategy: 'Create a third distinct arrangement with different section order, media treatment, and proof placement.',
    description: 'Blank scaffold. Replace with a fully designed homepage prototype based on captured source content.',
    animation: 'Replace with motion concept chosen for this layout.'
  },
  {
    id: '4',
    title: 'Homepage Layout 4',
    label: 'Replace with custom layout',
    strategy: 'Create a fourth distinct arrangement with its own interaction pattern and conversion flow.',
    description: 'Blank scaffold. Replace with a fully designed homepage prototype based on captured source content.',
    animation: 'Replace with motion concept chosen for this layout.'
  }
];

export const defaultSystemSlug = designSystems[0].slug;
export const designSystemSlugs = designSystems.map((system) => system.slug);

export function getDesignSystem(slug?: string | null): DesignSystem {
  return designSystems.find((system) => system.slug === slug) ?? designSystems[0];
}

export function getExample(id?: string | null): Example {
  return examples.find((example) => example.id === id) ?? examples[0];
}

export function themeStyle(system: DesignSystem): string {
  return [
    ['--system-bg', system.tokens.background],
    ['--system-surface', system.tokens.surface],
    ['--system-surface-alt', system.tokens.surfaceAlt],
    ['--system-ink', system.tokens.ink],
    ['--system-muted', system.tokens.muted],
    ['--system-primary', system.tokens.primary],
    ['--system-secondary', system.tokens.secondary],
    ['--system-accent', system.tokens.accent],
    ['--system-line', system.tokens.line],
    ['--system-shadow', system.tokens.shadow]
  ]
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
}
