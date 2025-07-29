import useSWR from 'swr';
import { fetchArticles } from '../services/fetchArticles';
import React, { useEffect, useState } from 'react';
import { supabase } from '../config/databse';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  content?: string;
}

const Articles: React.FC = () => {
  const articlesPerPage = 9;

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('articlesCurrentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const [totalArticles, setTotalArticles] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: articles, error, isLoading } = useSWR(
    ['articles', currentPage],
    () => fetchArticles(currentPage, articlesPerPage),
    { keepPreviousData: true }
  );

  // لحساب العدد الكلي
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      if (count) setTotalArticles(count);
    };
    fetchCount();
  }, []);

  // حفظ رقم الصفحة
  useEffect(() => {
    sessionStorage.setItem('articlesCurrentPage', currentPage.toString());
  }, [currentPage]);

  // حفظ موضع التمرير
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('articlesScrollPosition', window.scrollY.toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // <<< هذا هو الكود المضاف لمنع التمرير >>>
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);


  // قراءة المزيد وتحميل المحتوى الكامل
  const handleReadMore = async (article: Article) => {
    const { data, error } = await supabase
      .from('articles')
      .select('content')
      .eq('id', article.id)
      .single();

    if (!error && data) {
      setSelectedArticle({ ...article, content: data.content });
      setIsModalOpen(true);
    } else {
      console.error('Failed to fetch content');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const Pagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex justify-center items-center space-x-2 mt-16" dir="ltr">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => {
              setCurrentPage(pageNumber);
              sessionStorage.removeItem('articlesScrollPosition');
            }}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md font-arabic font-bold transition-colors ${
              currentPage === pageNumber
                ? 'bg-primary-blue text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-sky-100'
            } ${isLoading ? 'cursor-not-allowed' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">
            مقالاتنا
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            نقدم لكم مقالاتنا التي تعكس خبراتنا ومعرفتنا في مجالات حفر الآبار، صيانتها، أنظمة ضخ المياه، والطاقة الشمسية.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col">
                    <div className="relative">
                      <img src={article.image} alt={article.title} loading="lazy" className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-yellow-400 text-primary-blue px-4 py-1 rounded-full text-sm font-bold font-arabic">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold font-arabic text-primary-blue mb-2">{article.title}</h3>
                      <p className="font-arabic text-gray-600 leading-relaxed flex-grow line-clamp-3">{article.summary}</p>
                      <button
                        onClick={() => handleReadMore(article)}
                        className="mt-4 px-5 py-2 bg-sky-100 text-sky-700 font-bold font-arabic rounded-full hover:bg-sky-200 hover:text-sky-800 transition-all duration-300"
                      >
                        قراءة المزيد
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : isLoading ? (
              <p className="text-center text-gray-500 font-arabic text-xl">جاري تحميل المقالات...</p>
            ) : error ? (
              <p className="text-center text-red-500 font-arabic text-xl">حدث خطأ أثناء تحميل المقالات</p>
            ) : (
              <p className="text-center text-gray-500 font-arabic text-xl">لا توجد مقالات لعرضها.</p>
            )}
          </div>
          
          {articles && articles.length > 0 && <Pagination />}
        </div>
      </section>

      {/* Article Modal */}
      {isModalOpen && selectedArticle && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full p-8 relative overflow-y-auto max-h-[90vh] text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 z-10">
              <X size={28} />
            </button>
            
            <div className="relative mb-6">
                <img src={selectedArticle.image} alt={selectedArticle.title} loading="lazy" className="w-full h-80 object-cover rounded-md" />
                <span className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-yellow-400 text-primary-blue px-4 py-1 rounded-full text-sm font-bold font-arabic">
                    {selectedArticle.category}
                </span>
            </div>

            <h2 className="text-3xl font-bold font-arabic text-primary-blue mb-6 text-center">{selectedArticle.title}</h2>
            
            <div className="font-arabic text-lg text-gray-700 leading-loose prose max-w-none prose-h3:text-primary-blue prose-h3:font-bold prose-ul:list-disc prose-ul:mr-5">
              <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;