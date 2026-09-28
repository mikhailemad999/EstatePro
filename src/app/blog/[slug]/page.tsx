import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Share2, Bookmark, ThumbsUp, MessageSquare, Tag, ChevronRight } from 'lucide-react';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: 'Article | EstatePro Blog',
  description: 'In-depth real estate market analysis and expert insights from EstatePro.',
};

interface ArticleData {
  title: string;
  category: string;
  author: { name: string; role: string; };
  date: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  image: string;
  content: string[];
  relatedArticles: { slug: string; title: string; category: string; image?: string; }[];
}

const articleData: Record<string, ArticleData> = {
  'luxury-real-estate-trends-2025': {
    title: 'The Definitive Guide to Luxury Real Estate Trends in 2025',
    category: 'Market Analysis',
    author: { name: 'Victoria Sterling', role: 'Chief Market Analyst' },
    date: '2025-03-15',
    readTime: '12 min read',
    views: 24580,
    likes: 842,
    comments: 56,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    content: [
      'The luxury real estate market is undergoing a profound transformation. As we navigate 2025, several converging forces—technological innovation, shifting demographics, and evolving lifestyle preferences—are reshaping what "luxury" means to the world\'s most discerning buyers.',
      '## AI-Powered Smart Homes: Beyond the Gimmick\n\nArtificial intelligence has moved far beyond voice-activated lights. Today\'s ultra-luxury residences feature predictive climate systems that learn occupant preferences, security systems with behavioral analytics, and energy management platforms that reduce carbon footprints by up to 40%. Properties with comprehensive AI integration are commanding 15-25% premiums in major markets.',
      '## Sustainable Architecture: The New Status Symbol\n\nGreen building is no longer a niche. LEED Platinum and Passive House certifications have become baseline expectations for properties above $10M. The most forward-thinking developments incorporate living walls, greywater recycling, solar glass facades, and carbon-negative building materials.',
      '## The Rise of Branded Residences\n\nBranded residences—luxury apartments developed in partnership with hospitality brands like Four Seasons, Aman, and Ritz-Carlton—saw a 150% increase in launches globally. These properties offer hotel-level services with the privacy and permanence of home ownership.',
      '## Remote Work\'s Lasting Impact\n\nThe decentralization of work has permanently altered buyer priorities. Home offices, dedicated Zoom rooms, high-speed fiber connectivity, and proximity to nature now rank alongside traditional luxury amenities. Secondary markets like Aspen, the Algarve, and Bali are experiencing sustained demand growth.',
      '## Investment Outlook\n\nDespite macroeconomic headwinds, ultra-luxury real estate continues to serve as a reliable store of value. Properties above $10M have shown consistent appreciation of 6-8% annually across the top 20 global markets, outperforming many traditional asset classes.',
    ],
    relatedArticles: [
      { slug: 'investing-in-waterfront-properties', title: 'Why Waterfront Properties Remain the Ultimate Investment', category: 'Investment Guide', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
      { slug: 'smart-home-technology-luxury', title: 'Smart Home Technology That Actually Adds Value', category: 'Luxury Living', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
      { slug: 'biophilic-design-luxury-homes', title: 'Biophilic Design in Ultra-Luxury Residences', category: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'investing-in-waterfront-properties': {
    title: 'Why Waterfront Properties Remain the Ultimate Investment',
    category: 'Investment Guide',
    author: { name: 'James Harrington', role: 'Senior Portfolio Director' },
    date: '2025-03-10',
    readTime: '8 min read',
    views: 18200,
    likes: 620,
    comments: 38,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    content: [
      'Coastal and waterfront estates consistently outperform inland properties across every economic cycle. Scarcity of developable shoreline combined with perennial global demand cements coastal real estate as one of the safest high-yield wealth storage vehicles.',
      '## The Scarcity Factor\n\nUnlike urban developments where vertical density can expand supply, pristine waterfront plots are finite. Regulatory protections, environmental setbacks, and zoning laws severely restrict new builds, creating an inelastic supply curve that protects long-term equity.',
      '## Premium Valuations and Liquidity\n\nPrime coastal estates command an average 45% premium over comparable inland homes. During market corrections, historical data confirms that waterfront assets retain their value with greater resilience, finding international buyers when secondary markets experience illiquidity.',
      '## Climate Resilience and Modern Engineering\n\nContemporary waterfront architecture addresses rising sea levels through elevated foundations, specialized marine-grade alloys, and self-contained seawall defenses, assuring investors of both durability and peace of mind.',
    ],
    relatedArticles: [
      { slug: 'luxury-real-estate-trends-2025', title: 'Luxury Real Estate Trends in 2025', category: 'Market Analysis', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
      { slug: 'property-tax-optimization', title: 'Property Tax Optimization for Multi-Property Owners', category: 'Legal & Finance', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'smart-home-technology-luxury': {
    title: 'Smart Home Technology That Actually Adds Value to Luxury Properties',
    category: 'Luxury Living',
    author: { name: 'Sophia Chen', role: 'Head of Architectural Tech' },
    date: '2025-03-05',
    readTime: '10 min read',
    views: 15340,
    likes: 512,
    comments: 42,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    content: [
      'Not all smart home tech is created equal. While novelty gadgets quickly obsolete, integrated infrastructural intelligence commands notable appraisal premiums and enhances day-to-day luxury living.',
      '## Invisible Infrastructure\n\nThe benchmark of high-end home automation is subtlety. Keypads that meld seamlessly into Venetian plaster, hidden architectural speakers, and circadian lighting systems that tune spectrums naturally throughout the day represent genuine value.',
      '## Centralized Subsystems vs. Fragmented Apps\n\nDiscerning buyers demand unified control systems like Crestron, Lutron HomeWorks, and Savant that eliminate fragmented smartphone applications in favor of tailored touchpoints and automated schedules.',
    ],
    relatedArticles: [
      { slug: 'biophilic-design-luxury-homes', title: 'Biophilic Design in Ultra-Luxury Residences', category: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
      { slug: 'luxury-real-estate-trends-2025', title: 'Luxury Real Estate Trends in 2025', category: 'Market Analysis', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'understanding-escrow-process': {
    title: 'Demystifying the Escrow Process for First-Time Buyers',
    category: 'Legal & Finance',
    author: { name: 'Michael Torres', role: 'Escrow & Closing Specialist' },
    date: '2025-02-28',
    readTime: '7 min read',
    views: 12100,
    likes: 390,
    comments: 21,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    content: [
      'Escrow serves as the impartial safeguard of real estate transactions. Understanding the workflow, deadlines, and closing conditions ensures a frictionless acquisition process.',
      '## The Role of the Escrow Officer\n\nOperating as a neutral third party, the escrow agent holds deposits, verifies title clearances, validates contract contingencies, and oversees equitable disbursement of funds at closing.',
      '## Critical Milestone Timelines\n\nFrom earnest money wire verification to title deed recording, maintaining clear communication with your escrow officer prevents unforced closing delays.',
    ],
    relatedArticles: [
      { slug: 'property-tax-optimization', title: 'Property Tax Optimization for Multi-Property Owners', category: 'Legal & Finance', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
      { slug: 'investing-in-waterfront-properties', title: 'Why Waterfront Properties Remain the Ultimate Investment', category: 'Investment Guide', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'biophilic-design-luxury-homes': {
    title: 'Biophilic Design: Bringing Nature into Ultra-Luxury Residences',
    category: 'Architecture',
    author: { name: 'Elena Petrova', role: 'Principal Architectural Critic' },
    date: '2025-02-20',
    readTime: '9 min read',
    views: 10850,
    likes: 470,
    comments: 29,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    content: [
      'Biophilic design re-establishes humanity’s innate connection with the natural world through architectural harmony. Ultra-luxury homeowners are prioritizing natural lighting, indoor botanical atriums, and flowing water installations.',
      '## Living Architecture\n\nInternal reflection pools, courtyards centered around mature olive trees, and vertical living walls elevate indoor air quality while creating sanctuaries of profound calm.',
      '## Raw Materiality\n\nUnlacquered brass, fluted travertine, and reclaimed cedar wood provide sensory depth that synthetic materials simply cannot replicate.',
    ],
    relatedArticles: [
      { slug: 'minimalist-luxury-interiors', title: 'The Rise of Minimalist Luxury: Less is More', category: 'Interior Design', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80' },
      { slug: 'luxury-real-estate-trends-2025', title: 'Luxury Real Estate Trends in 2025', category: 'Market Analysis', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'property-tax-optimization': {
    title: 'Property Tax Optimization Strategies for Multi-Property Owners',
    category: 'Legal & Finance',
    author: { name: 'David Winchester', role: 'Private Wealth Counsel' },
    date: '2025-02-15',
    readTime: '11 min read',
    views: 9200,
    likes: 310,
    comments: 18,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
    content: [
      'Managing a cross-border real estate portfolio requires sophisticated structuring to mitigate property taxes, transfer fees, and generational estate levies.',
      '## Holding Entities and Trusts\n\nUtilizing irrevocable trusts and specialized property holding companies provides asset protection while streamlining tax assessments and ownership succession.',
      '## Depreciation Schedules and Cost Segregation\n\nEngineering-based cost segregation studies accelerate depreciation deductions, significantly offsetting taxable passive income across luxury rental holdings.',
    ],
    relatedArticles: [
      { slug: 'understanding-escrow-process', title: 'Demystifying the Escrow Process for First-Time Buyers', category: 'Legal & Finance', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
      { slug: 'investing-in-waterfront-properties', title: 'Why Waterfront Properties Remain the Ultimate Investment', category: 'Investment Guide', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  'minimalist-luxury-interiors': {
    title: 'The Rise of Minimalist Luxury: Less is More in Interior Design',
    category: 'Interior Design',
    author: { name: 'Isabelle Fontaine', role: 'Creative Director' },
    date: '2025-02-10',
    readTime: '6 min read',
    views: 8700,
    likes: 345,
    comments: 22,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    content: [
      'Modern opulence has shed heavy ornamentation in favor of purposeful simplicity, impeccable craftsmanship, and serene negative space.',
      '## Curated Restraint\n\nEvery piece of furniture and fixture in a minimalist luxury interior is selected with exacting intent, celebrating museum-grade finishes and tactile beauty.',
      '## Monochromatic Palettes with Textural Depth\n\nRather than competing color tones, designers rely on linen, bouclé, brushed oak, and bush-hammered limestone to achieve warmth and elevated sophistication.',
    ],
    relatedArticles: [
      { slug: 'biophilic-design-luxury-homes', title: 'Biophilic Design in Ultra-Luxury Residences', category: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
      { slug: 'luxury-real-estate-trends-2025', title: 'Luxury Real Estate Trends in 2025', category: 'Market Analysis', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    ],
  },
};

const fallbackArticle: ArticleData = {
  title: 'Expert Insights on Real Estate',
  category: 'General',
  author: { name: 'EstatePro Editorial', role: 'Editorial Team' },
  date: '2025-03-01',
  readTime: '8 min read',
  views: 5000,
  likes: 150,
  comments: 12,
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  content: [
    'This article provides comprehensive insights into real estate market dynamics, investment strategies, and luxury property trends that shape the modern real estate landscape.',
    '## Understanding Market Fundamentals\n\nThe real estate market operates on cycles driven by economic indicators, interest rates, demographic shifts, and regulatory changes. Understanding these fundamentals is crucial for both buyers and investors seeking to make informed decisions.',
    '## Key Takeaways\n\nWhether you\'re a first-time buyer or a seasoned investor, staying informed about market trends, regulatory changes, and emerging opportunities is essential for success in today\'s dynamic real estate landscape.',
  ],
  relatedArticles: [
    { slug: 'luxury-real-estate-trends-2025', title: 'Luxury Real Estate Trends in 2025', category: 'Market Analysis', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { slug: 'investing-in-waterfront-properties', title: 'Why Waterfront Properties Remain the Ultimate Investment', category: 'Investment Guide', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
  ],
};

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleData[slug] || {
    ...fallbackArticle,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        {/* Breadcrumb */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/blog" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-400">{article.category}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium mb-6">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-semibold text-sm">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{article.author.name}</div>
                  <div className="text-zinc-500 text-xs">{article.author.role}</div>
                </div>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-amber-500/70" /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-500/70" /> {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-amber-500/70" /> {article.views.toLocaleString()}
              </span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl bg-zinc-900">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-amber max-w-none">
              {article.content.map((section, i) => {
                const parts = section.split('\n\n');
                return (
                  <div key={i} className="mb-8">
                    {parts.map((part, j) => {
                      if (part.startsWith('## ')) {
                        return (
                          <h2 key={j} className="text-2xl font-bold text-white mt-12 mb-4">
                            {part.replace('## ', '')}
                          </h2>
                        );
                      }
                      return (
                        <p key={j} className="text-zinc-300 leading-relaxed text-lg mb-4">
                          {part}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
              {['Real Estate', 'Luxury', 'Investment', 'Market Trends', '2025'].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm border border-white/5 hover:border-amber-500/20 transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-8 py-6 border-t border-b border-white/10">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all text-sm">
                  <ThumbsUp className="w-4 h-4" /> {article.likes}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all text-sm">
                  <MessageSquare className="w-4 h-4" /> {article.comments}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {article.relatedArticles.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/30 transition-all overflow-hidden flex flex-col h-full shadow-lg">
                    {related.image && (
                      <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-900 relative">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-amber-400 font-medium mb-2 block">{related.category}</span>
                        <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
