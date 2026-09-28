import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Share2, Bookmark, ThumbsUp, MessageSquare, Tag, ChevronRight } from 'lucide-react';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: 'Article | EstatePro Blog',
  description: 'In-depth real estate market analysis and expert insights from EstatePro.',
};

const articleData: Record<string, {
  title: string; category: string; author: { name: string; role: string; };
  date: string; readTime: string; views: number; likes: number; comments: number;
  content: string[];
  relatedArticles: { slug: string; title: string; category: string; }[];
}> = {
  'luxury-real-estate-trends-2025': {
    title: 'The Definitive Guide to Luxury Real Estate Trends in 2025',
    category: 'Market Analysis',
    author: { name: 'Victoria Sterling', role: 'Chief Market Analyst' },
    date: '2025-03-15', readTime: '12 min read', views: 24580, likes: 842, comments: 56,
    content: [
      'The luxury real estate market is undergoing a profound transformation. As we navigate 2025, several converging forces—technological innovation, shifting demographics, and evolving lifestyle preferences—are reshaping what "luxury" means to the world\'s most discerning buyers.',
      '## AI-Powered Smart Homes: Beyond the Gimmick\n\nArtificial intelligence has moved far beyond voice-activated lights. Today\'s ultra-luxury residences feature predictive climate systems that learn occupant preferences, security systems with behavioral analytics, and energy management platforms that reduce carbon footprints by up to 40%. Properties with comprehensive AI integration are commanding 15-25% premiums in major markets.',
      '## Sustainable Architecture: The New Status Symbol\n\nGreen building is no longer a niche. LEED Platinum and Passive House certifications have become baseline expectations for properties above $10M. The most forward-thinking developments incorporate living walls, greywater recycling, solar glass facades, and carbon-negative building materials.',
      '## The Rise of Branded Residences\n\nBranded residences—luxury apartments developed in partnership with hospitality brands like Four Seasons, Aman, and Ritz-Carlton—saw a 150% increase in launches globally. These properties offer hotel-level services with the privacy and permanence of home ownership.',
      '## Remote Work\'s Lasting Impact\n\nThe decentralization of work has permanently altered buyer priorities. Home offices, dedicated Zoom rooms, high-speed fiber connectivity, and proximity to nature now rank alongside traditional luxury amenities. Secondary markets like Aspen, the Algarve, and Bali are experiencing sustained demand growth.',
      '## Investment Outlook\n\nDespite macroeconomic headwinds, ultra-luxury real estate continues to serve as a reliable store of value. Properties above $10M have shown consistent appreciation of 6-8% annually across the top 20 global markets, outperforming many traditional asset classes.',
    ],
    relatedArticles: [
      { slug: 'investing-in-waterfront-properties', title: 'Why Waterfront Properties Remain the Ultimate Investment', category: 'Investment Guide' },
      { slug: 'smart-home-technology-luxury', title: 'Smart Home Technology That Actually Adds Value', category: 'Luxury Living' },
      { slug: 'biophilic-design-luxury-homes', title: 'Biophilic Design in Ultra-Luxury Residences', category: 'Architecture' },
    ],
  },
};

const fallbackArticle = {
  title: 'Expert Insights on Real Estate',
  category: 'General',
  author: { name: 'EstatePro Editorial', role: 'Editorial Team' },
  date: '2025-03-01', readTime: '8 min read', views: 5000, likes: 150, comments: 12,
  content: [
    'This article provides comprehensive insights into real estate market dynamics, investment strategies, and luxury property trends that shape the modern real estate landscape.',
    '## Understanding Market Fundamentals\n\nThe real estate market operates on cycles driven by economic indicators, interest rates, demographic shifts, and regulatory changes. Understanding these fundamentals is crucial for both buyers and investors seeking to make informed decisions.',
    '## Key Takeaways\n\nWhether you\'re a first-time buyer or a seasoned investor, staying informed about market trends, regulatory changes, and emerging opportunities is essential for success in today\'s dynamic real estate landscape.',
  ],
  relatedArticles: [
    { slug: 'luxury-real-estate-trends-2025', title: 'Luxury Real Estate Trends in 2025', category: 'Market Analysis' },
  ],
};

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleData[slug] || { ...fallbackArticle, title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) };

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
      <header className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium mb-6">{article.category}</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {article.views.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[21/9] rounded-2xl bg-gradient-to-br from-amber-900/20 to-zinc-900/50 border border-white/10 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">Article Cover Image</span>
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
                      return <h2 key={j} className="text-2xl font-bold text-white mt-12 mb-4">{part.replace('## ', '')}</h2>;
                    }
                    return <p key={j} className="text-zinc-400 leading-relaxed text-lg mb-4">{part}</p>;
                  })}
                </div>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
            {['Real Estate', 'Luxury', 'Investment', 'Market Trends', '2025'].map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-zinc-400 text-sm border border-white/5 hover:border-amber-500/20 transition-colors cursor-pointer">
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
          <div className="grid md:grid-cols-3 gap-4">
            {article.relatedArticles.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`}>
                <div className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-amber-500/30 transition-all">
                  <span className="text-xs text-zinc-500 mb-2 block">{related.category}</span>
                  <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">{related.title}</h3>
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
