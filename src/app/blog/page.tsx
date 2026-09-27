import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Search, Tag, TrendingUp, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Insights & Articles | EstatePro',
  description: 'Expert real estate market analysis, investment guides, luxury property trends, and industry insights from EstatePro\'s editorial team.',
};

const categories = [
  { name: 'Market Analysis', count: 12, color: 'from-amber-500/20 to-amber-600/10' },
  { name: 'Investment Guide', count: 8, color: 'from-emerald-500/20 to-emerald-600/10' },
  { name: 'Luxury Living', count: 15, color: 'from-violet-500/20 to-violet-600/10' },
  { name: 'Legal & Finance', count: 6, color: 'from-blue-500/20 to-blue-600/10' },
  { name: 'Architecture', count: 10, color: 'from-rose-500/20 to-rose-600/10' },
  { name: 'Interior Design', count: 9, color: 'from-cyan-500/20 to-cyan-600/10' },
];

const featuredArticle = {
  slug: 'luxury-real-estate-trends-2025',
  title: 'The Definitive Guide to Luxury Real Estate Trends in 2025',
  excerpt: 'From AI-powered smart homes to sustainable architecture, discover the forces reshaping the ultra-luxury property market and what savvy investors need to know.',
  category: 'Market Analysis',
  author: { name: 'Victoria Sterling', role: 'Chief Market Analyst' },
  date: '2025-03-15',
  readTime: '12 min read',
  views: 24580,
  image: '/images/blog-hero.jpg',
};

const articles = [
  {
    slug: 'investing-in-waterfront-properties',
    title: 'Why Waterfront Properties Remain the Ultimate Investment',
    excerpt: 'Coastal and waterfront estates consistently outperform inland properties. Here\'s the data-driven case for waterfront investment.',
    category: 'Investment Guide',
    author: { name: 'James Harrington' },
    date: '2025-03-10',
    readTime: '8 min read',
    views: 18200,
  },
  {
    slug: 'smart-home-technology-luxury',
    title: 'Smart Home Technology That Actually Adds Value to Luxury Properties',
    excerpt: 'Not all smart home tech is created equal. We analyze which integrations deliver real ROI for high-end residences.',
    category: 'Luxury Living',
    author: { name: 'Sophia Chen' },
    date: '2025-03-05',
    readTime: '10 min read',
    views: 15340,
  },
  {
    slug: 'understanding-escrow-process',
    title: 'Demystifying the Escrow Process for First-Time Buyers',
    excerpt: 'A comprehensive walkthrough of escrow timelines, documentation, and how to protect your deposit in high-value transactions.',
    category: 'Legal & Finance',
    author: { name: 'Michael Torres' },
    date: '2025-02-28',
    readTime: '7 min read',
    views: 12100,
  },
  {
    slug: 'biophilic-design-luxury-homes',
    title: 'Biophilic Design: Bringing Nature into Ultra-Luxury Residences',
    excerpt: 'How leading architects are integrating living walls, natural light wells, and organic materials into contemporary luxury homes.',
    category: 'Architecture',
    author: { name: 'Elena Petrova' },
    date: '2025-02-20',
    readTime: '9 min read',
    views: 10850,
  },
  {
    slug: 'property-tax-optimization',
    title: 'Property Tax Optimization Strategies for Multi-Property Owners',
    excerpt: 'Legal strategies and structuring approaches to optimize property tax liability across multiple jurisdictions.',
    category: 'Legal & Finance',
    author: { name: 'David Winchester' },
    date: '2025-02-15',
    readTime: '11 min read',
    views: 9200,
  },
  {
    slug: 'minimalist-luxury-interiors',
    title: 'The Rise of Minimalist Luxury: Less is More in Interior Design',
    excerpt: 'Why the world\'s most discerning homeowners are embracing restraint, craft, and curated simplicity over opulence.',
    category: 'Interior Design',
    author: { name: 'Isabelle Fontaine' },
    date: '2025-02-10',
    readTime: '6 min read',
    views: 8700,
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-amber-400/80 text-sm font-medium tracking-widest uppercase">Insights & Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Insights</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mb-10">
            Expert analysis, investment strategies, and luxury lifestyle content curated by our editorial team of industry veterans.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search articles, guides, market reports..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r ${cat.color} border border-white/10 text-white/80 text-sm font-medium hover:border-amber-500/30 transition-all`}
              >
                {cat.name} <span className="text-white/40 ml-1">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <Link href={`/blog/${featuredArticle.slug}`}>
            <div className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden hover:border-amber-500/30 transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-br from-amber-900/30 to-amber-800/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <TrendingUp className="w-16 h-16 text-amber-500/40 mx-auto mb-4" />
                    <span className="text-amber-400/60 text-sm">Featured Cover Image</span>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">{featuredArticle.category}</span>
                    <span className="text-zinc-500 text-xs flex items-center gap-1"><Tag className="w-3 h-3" /> Featured</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-zinc-400 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredArticle.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredArticle.readTime}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {featuredArticle.views.toLocaleString()}</span>
                    </div>
                    <span className="text-amber-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-zinc-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 text-xs">{article.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-zinc-600">
                      <span>{article.author.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-amber-500/30 transition-all">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
