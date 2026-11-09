import React, { useState } from 'react';
import { Camera, ShieldCheck, Sparkles, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { GalleryItem, SchoolConfig } from '../types';

interface GalleryPageProps {
  config: SchoolConfig;
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  config,
  items,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'campus', label: 'Campus & Buildings' },
    { id: 'primary', label: 'Primary School' },
    { id: 'jss', label: 'Secondary School' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Visual Tour & School Life</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Gideons School Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Experience our dynamic learning environment, sports days, science practicals, and creative arts across all education stages.
          </p>
        </div>
      </section>

      {/* Child Privacy & Photo Consent Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>Child Safety & Photo Publishing Policy (Kenya Data Protection Act, 2019):</strong>
            <p className="text-amber-900/90 leading-relaxed text-[11px]">
              Gideons School adheres strictly to legal child safeguarding standards. Identifiable photographs of learners are published only with signed parental or guardian media consent. School administrators can update and manage media via the school media registry.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#0F2744] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Camera className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 font-['Outfit']">
              No Photographs in this Category Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Photographs for this category are currently being curated by the school media department.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  const globalIndex = items.findIndex((i) => i.id === item.id);
                  onOpenLightbox(globalIndex >= 0 ? globalIndex : idx);
                }}
                className="group relative bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
                role="button"
                tabIndex={0}
                aria-label={`Open photo: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const globalIndex = items.findIndex((i) => i.id === item.id);
                    onOpenLightbox(globalIndex >= 0 ? globalIndex : idx);
                  }
                }}
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2.5 rounded-full bg-white/90 text-[#0F2744] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-[#0F2744]/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] group-hover:text-[#0F2744]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
