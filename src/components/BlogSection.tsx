import React, { useState } from 'react';
import { BLOG_POSTS, FARM_INFO } from '../data/farmData';
import { BlogPost, NavPage } from '../types';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Check, 
  BookOpen,
  MessageCircle
} from 'lucide-react';

interface BlogSectionProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
  isStandalonePage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onNavigate,
  onOpenOrder,
  isStandalonePage = false,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}#journal-${post.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      {!selectedPost && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-script text-[#15803D] text-2xl font-bold block mb-1">
            Knowledge from Dadira Pastures
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F3020] tracking-tight">
            Farm Journal &amp; Dairy Insights
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Real stories, nutrition science, and behind-the-scenes insights directly from our herd managers and dairy specialists.
          </p>
        </div>
      )}

      {/* Full Post Reader Mode */}
      {selectedPost ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-10 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F3020] hover:text-[#15803D] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Journal Articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 pb-6 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-2">
              {selectedPost.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold uppercase tracking-wider border border-emerald-200"
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs text-stone-500 font-medium ml-auto flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
            </div>

            <h1 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F3020] leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0F3020] text-white flex items-center justify-center font-bold text-xs">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-stone-900">{selectedPost.author}</div>
                  <div className="text-[11px] text-stone-500">{selectedPost.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-stone-500">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  {selectedPost.date}
                </span>

                <button
                  onClick={() => handleShare(selectedPost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="my-8 rounded-xl overflow-hidden shadow-sm h-72 sm:h-96 w-full">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-stone max-w-none space-y-5 text-stone-800 text-base leading-relaxed">
            {selectedPost.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Post Footer Call to Action */}
          <div className="mt-12 p-6 rounded-xl bg-[#F4F7F4] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif-heading font-bold text-base text-[#0F3020]">
                Taste the Difference of Pure Dairy
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Our fresh cow milk and handcrafted yoghurt are delivered fresh every morning across the region.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenOrder}
                className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs rounded-lg transition-colors"
              >
                Order Fresh Milk
              </button>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  onNavigate('booking');
                }}
                className="px-4 py-2 border border-[#0F3020] text-[#0F3020] font-bold text-xs rounded-lg hover:bg-stone-100"
              >
                Book Farm Visit
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase rounded-md tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif-heading font-bold text-xl text-[#0F3020] leading-snug group-hover:text-[#15803D] transition-colors mb-3">
                    {post.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500">
                  {post.authorRole}
                </span>

                <button
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:text-[#166534] group-hover:translate-x-0.5 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
