import React, { useState } from 'react';
import {
  Calendar,
  Tag,
  Mail,
  CheckCircle2,
  ChevronRight,
  Search,
  X,
  Share2,
} from 'lucide-react';
import { NewsArticle, SchoolConfig } from '../types';
import { storage, IMAGES } from '../services/storage';

interface NewsPageProps {
  config: SchoolConfig;
  articles: NewsArticle[];
  selectedArticle: NewsArticle | null;
  onSelectArticle: (article: NewsArticle | null) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  config,
  articles,
  selectedArticle,
  onSelectArticle,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // Unsubscribe state modal / toggle
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const [unsubEmail, setUnsubEmail] = useState('');
  const [unsubMsg, setUnsubMsg] = useState('');

  const categories = ['All', 'Announcements', 'Admissions', 'Academics', 'Co-Curricular', 'Events'];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterMsg('Please enter a valid email address.');
      setNewsletterStatus('error');
      return;
    }
    if (!newsletterConsent) {
      setNewsletterMsg('Please confirm your consent to receive school newsletters.');
      setNewsletterStatus('error');
      return;
    }

    const res = storage.subscribeNewsletter(newsletterEmail, newsletterName);
    setNewsletterStatus(res.success ? 'success' : 'error');
    setNewsletterMsg(res.message);
    if (res.success) {
      setNewsletterEmail('');
      setNewsletterName('');
      setNewsletterConsent(false);
    }
  };

  const handleUnsubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unsubEmail.trim()) return;
    const done = storage.unsubscribeNewsletter(unsubEmail);
    if (done) {
      setUnsubMsg('You have been unsubscribed from our newsletter list.');
      setUnsubEmail('');
    } else {
      setUnsubMsg('Email address not found in active subscribers list.');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Official Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            News, Events & Announcements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Stay up to date with school circulars, academic calendar milestones, athletic tournaments, and admission notices.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#0F2744] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news & events..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50"
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-2">
            <h3 className="text-base font-bold text-slate-800 font-['Outfit']">
              No Articles Found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={article.imageUrl || IMAGES.hero}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#0F2744]/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.publicationDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-['Outfit'] line-clamp-2 group-hover:text-[#0F2744]">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectArticle(article)}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#0F2744] hover:text-white bg-slate-50 hover:bg-[#0F2744] rounded border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Read Full Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0F2744] text-white rounded-2xl p-8 sm:p-12 border border-white/10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Stay Connected
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
              Subscribe to the Gideons School Newsletter
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Receive updates on academic calendar announcements, open day invitations, sports events, and admission notices directly in your inbox.
            </p>
          </div>

          {newsletterStatus === 'success' ? (
            <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{newsletterMsg}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4 max-w-2xl">
              {newsletterMsg && newsletterStatus === 'error' && (
                <div className="p-2.5 bg-red-500/20 text-red-200 text-xs rounded border border-red-500/30">
                  {newsletterMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">First Name (Optional)</label>
                  <input
                    type="text"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    placeholder="Your name"
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="e.g. parent@example.com"
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="nl-news-page"
                  required
                  checked={newsletterConsent}
                  onChange={(e) => setNewsletterConsent(e.target.checked)}
                  className="mt-0.5 rounded border-white/30 text-amber-400 focus:ring-amber-400 bg-white/10"
                />
                <label htmlFor="nl-news-page" className="text-[11px] text-slate-300 leading-tight">
                  I consent to receiving electronic circulars from Gideons School. I understand I may unsubscribe at any time.
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold text-xs rounded-lg transition-colors"
                >
                  Subscribe to Newsletter
                </button>
                <button
                  type="button"
                  onClick={() => setShowUnsubscribe(!showUnsubscribe)}
                  className="text-[11px] text-slate-400 hover:text-white underline"
                >
                  Need to unsubscribe?
                </button>
              </div>
            </form>
          )}

          {/* Unsubscribe panel */}
          {showUnsubscribe && (
            <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/10 max-w-lg space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Unsubscribe from Mailing List
              </h4>
              <p className="text-[11px] text-slate-300">
                Enter your subscribed email address to opt out of marketing communications.
              </p>
              {unsubMsg ? (
                <div className="text-xs text-amber-300">{unsubMsg}</div>
              ) : (
                <form onSubmit={handleUnsubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={unsubEmail}
                    onChange={(e) => setUnsubEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 text-xs px-3 py-1.5 rounded bg-white/10 border border-white/20 text-white placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded font-medium"
                  >
                    Unsubscribe
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => onSelectArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => onSelectArticle(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published on {selectedArticle.publicationDate}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] leading-snug">
                {selectedArticle.title}
              </h2>
            </div>

            {selectedArticle.imageUrl && (
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-100">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-medium text-slate-900">{selectedArticle.summary}</p>
              <p>{selectedArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Gideons School Communications Desk
              </span>
              <button
                onClick={() => onSelectArticle(null)}
                className="px-4 py-2 bg-[#0F2744] hover:bg-[#163860] text-white text-xs font-semibold rounded-md transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
