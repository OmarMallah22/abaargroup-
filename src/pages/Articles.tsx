import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { supabase } from '../config/articles';
import { X, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Interfaces ---
interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  content?: string;
  created_at: string;
}

// --- Service Function ---
const fetchArticles = async (page: number, limit: number): Promise<Article[]> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .range(from, to);
  if (error) throw error;
  return data || [];
};

// --- المكون الفرعي: بطاقة المقال المحسنة ---
const ArticleCard: React.FC<{ article: Article; onReadMore: () => void }> = React.memo(({ article, onReadMore }) => (
    <div 
        className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 flex flex-col cursor-pointer"
        onClick={onReadMore}
        onKeyPress={(e) => e.key === 'Enter' && onReadMore()}
        role="button"
        tabIndex={0}
        aria-label={`قراءة المزيد عن ${article.title}`}
    >
        {/* === تعديل #5: إصلاح قص الصورة === */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-6 pt-10 flex flex-col flex-grow relative">
             {/* === تعديل #4: تغيير مكان نوع المقال === */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-primary-blue px-4 py-1.5 rounded-full text-sm font-bold font-arabic z-10">
                {article.category}
            </span>
            <h3 className="text-xl font-bold font-arabic text-primary-blue mb-2 line-clamp-2">{article.title}</h3>
            <p className="font-arabic text-gray-600 leading-relaxed flex-grow line-clamp-2">{article.summary}</p>
            <div className="mt-auto pt-4 flex justify-end items-center text-sm text-gray-500">
                <span className="inline-flex items-center text-gray-700 font-bold bg-gray-100 px-4 py-2 rounded-full group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                    قراءة المزيد <ArrowLeft className="mr-2 h-4 w-4" />
                </span>
            </div>
        </div>
    </div>
));


// --- المكون الفرعي: نافذة المقال المنبثقة المحسنة ---
const ArticleModal: React.FC<{ article: Article | null; onClose: () => void }> = React.memo(({ article, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!article) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
        >
            <div 
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bg-gray-100">
                    <img src={article.image} alt={article.title} className="w-full h-64 md:h-80 object-contain rounded-t-2xl" />
                    <button onClick={onClose} aria-label="إغلاق" className="absolute top-4 right-4 p-2 bg-white/70 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 z-10">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6 md:p-10">
                    <h2 id="article-title" className="text-2xl md:text-4xl font-arabic font-bold text-primary-blue mb-2 text-center">{article.title}</h2>
                    <p className="text-center text-gray-500 mb-6 font-arabic">{article.category}</p>
                    
                    <article 
                        className="
                            prose prose-lg max-w-none text-right
                            prose-headings:text-primary-dark-blue prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                            prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
                            prose-ul:list-disc prose-ul:mr-5
                            prose-ol:list-decimal prose-ol:mr-5
                            prose-li:mb-2
                            prose-a:text-primary-blue hover:prose-a:text-primary-sky-blue prose-a:font-semibold
                            prose-strong:text-primary-dark-blue prose-strong:font-bold
                            prose-blockquote:border-r-4 prose-blockquote:border-primary-blue prose-blockquote:pr-4 prose-blockquote:italic
                        " 
                        dir="rtl"
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || 'جاري تحميل المحتوى...'}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
});

const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
        <div className="bg-gray-200 aspect-[16/10]"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded-full w-1/3 ml-auto"></div>
        </div>
    </div>
);

const PaginationComponent: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; isLoading: boolean; }> = ({ currentPage, totalPages, onPageChange, isLoading }) => {
    if (totalPages <= 1) return null;
    return (
         // === تعديل #6: عكس ترتيب الأزرار (RTL) ===
        <div className="flex justify-center items-center space-x-2 space-x-reverse mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    disabled={isLoading}
                    aria-label={`الانتقال إلى الصفحة ${pageNumber}`}
                    className={`px-4 py-2 rounded-md font-arabic font-bold transition-colors ${
                        currentPage === pageNumber
                            ? 'bg-primary-blue text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-sky-100'
                    } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

// --- المكون الرئيسي: صفحة المقالات ---
const Articles: React.FC = () => {
    const articlesPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const { data: articles, error, isLoading } = useSWR(
        ['articles', currentPage, articlesPerPage],
        () => fetchArticles(currentPage, articlesPerPage),
        { keepPreviousData: true }
    );

    useEffect(() => {
        const fetchCount = async () => {
            const { count } = await supabase.from('articles').select('*', { count: 'exact', head: true });
            if (count) setTotalArticles(count);
        };
        fetchCount();
    }, []);
    
    const handleReadMore = useCallback(async (article: Article) => {
        setSelectedArticle(article); 
        const { data, error } = await supabase
            .from('articles')
            .select('content')
            .eq('id', article.id)
            .single();

        if (!error && data) {
            setSelectedArticle(prev => prev ? { ...prev, content: data.content } : null);
        } else {
            console.error('Failed to fetch content');
        }
    }, []);

    const closeModal = useCallback(() => {
        setSelectedArticle(null);
    }, []);

    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    return (
        <div className="bg-gray-50 min-h-screen">
            <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">مقالاتنا</h1>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                        نقدم لكم مقالاتنا التي تعكس خبراتنا ومعرفتنا في مجالات حفر الآبار، صيانتها، أنظمة ضخ المياه، والطاقة الشمسية.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`transition-opacity duration-300 ${isLoading && !articles ? 'opacity-50' : 'opacity-100'}`}>
                        {error && (
                            <p className="col-span-full text-center font-arabic text-xl text-red-600 bg-red-100 p-4 rounded-lg border border-red-200">حدث خطأ أثناء تحميل المقالات</p>
                        )}
                        {isLoading && !articles && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
                            </div>
                        )}
                        {articles && articles.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.map((article) => (
                                    <ArticleCard key={article.id} article={article} onReadMore={() => handleReadMore(article)} />
                                ))}
                            </div>
                        )}
                        {!isLoading && !error && articles && articles.length === 0 && (
                            <p className="col-span-full text-center font-arabic text-xl text-gray-600">لا توجد مقالات لعرضها حاليًا.</p>
                        )}
                    </div>
                    
                    <PaginationComponent 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage} 
                        isLoading={isLoading && !!articles} 
                    />
                </div>
            </section>

            {selectedArticle && <ArticleModal article={selectedArticle} onClose={closeModal} />}
        </div>
    );
};

export default Articles;