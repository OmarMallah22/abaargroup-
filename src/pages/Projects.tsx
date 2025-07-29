import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, X } from 'lucide-react';
import { supabase } from '../config/supabaseproject';
import { useLanguage } from '../context/LanguageContext';
import OurClientsSection from './OurClientsSection';

// --- تحسين: تعريف الثوابت خارج المكون ---
const PROJECTS_PER_PAGE = 9;
const PINNED_CLIENT = 'جهاز مستقبل مصر للتنمية المستدامة';

// =================================================================================
// --- Interfaces and Helper Components (معرفة داخل نفس الملف) ---
// =================================================================================

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  status: string;
  duration: string;
  image: string;
  description: string;
  scope: string;
  features: string[] | string;
  client: string;
  mini_description: string;
}

// --- مكون فرعي: بطاقة المشروع ---
const ProjectCard: React.FC<{ project: Project; onOpenModal: () => void }> = ({ project, onOpenModal }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">{project.status}</span>
          <div className="flex items-center text-sm text-primary-gray"><Calendar className="h-4 w-4 ml-1" />{project.year}</div>
        </div>
        <h3 className="text-xl font-arabic font-bold text-primary-blue mb-2 h-14">{project.title}</h3>
        <div className="flex items-center text-primary-gray mb-3">
          <MapPin className="h-4 w-4 ml-1 flex-shrink-0" />
          <span className="font-arabic text-sm">{project.location}</span>
        </div>
        <p className="font-arabic text-primary-gray mb-4 flex-grow line-clamp-3">{project.mini_description}</p>
        <div className="mt-auto">
            <button onClick={onOpenModal} className="mt-4 px-5 py-2 bg-sky-100 text-sky-700 font-bold font-arabic rounded-full hover:bg-sky-200 hover:text-sky-800 transition-all duration-300">
                اقرأ المزيد
            </button>
        </div>
      </div>
    </div>
  );
};

// --- مكون فرعي: هيكل التحميل ---
const ProjectCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
        <div className="aspect-[4/3] bg-gray-200"></div>
        <div className="p-6">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-14 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-full w-1/3 mt-4"></div>
        </div>
    </div>
);


// --- مكون فرعي: تفاصيل المشروع ---
const ProjectDetailModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const featuresArray = useMemo(() => {
    if (!project?.features) return [];
    if (Array.isArray(project.features)) return project.features;
    if (typeof project.features === 'string') {
      try {
        const parsed = JSON.parse(project.features);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [project]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  if (!project) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] animate-scale-in">
        <button onClick={onClose} className="absolute top-4 left-4 bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition z-10">
          <X className="h-6 w-6 text-gray-700" />
        </button>
        <img src={project.image} alt={project.title} loading="lazy" className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg" />
        <h2 className="text-3xl font-arabic font-bold text-primary-blue mb-2">{project.title}</h2>
        <p className="text-lg font-arabic text-primary-gray mb-4">العميل: <span className="font-semibold">{project.client}</span></p>
        <div className="mb-6">
          <h3 className="text-xl font-arabic font-bold text-gray-800 mb-2 border-r-4 border-primary-blue pr-3">نطاق المشروع</h3>
          <p className="text-base font-arabic text-gray-700 leading-relaxed">{project.scope}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-arabic font-bold text-gray-800 mb-2 border-r-4 border-primary-blue pr-3">عن المشروع</h3>
          <p className="text-base font-arabic text-gray-700 leading-relaxed">{project.description}</p>
        </div>
        {featuresArray.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-arabic font-bold text-gray-800 mb-3 border-r-4 border-primary-blue pr-3">أبرز الأعمال المنفذة</h3>
            <ul className="space-y-2 list-disc list-inside pr-2">
              {featuresArray.map((feature, index) => (
                <li key={index} className="text-base font-arabic text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm font-arabic text-primary-gray">
            <p><strong>الموقع:</strong> {project.location}</p>
            <p><strong>الحالة:</strong> {project.status}</p>
            <p><strong>السنة:</strong> {project.year}</p>
            <p><strong>المدة:</strong> {project.duration || 'غير محدد'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// =================================================================================
// --- المكون الرئيسي للصفحة Projects ---
// =================================================================================
const Projects: React.FC = () => {
  useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProjects = useCallback(async (pageNum: number) => {
    if (pageNum === 1) setIsLoading(true);
    else setIsPageLoading(true);
    setError(null);

    const from = (pageNum - 1) * PROJECTS_PER_PAGE;
    const to = from + PROJECTS_PER_PAGE - 1;

    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .range(from, to)
        .order('id', { ascending: false });

      if (fetchError) throw fetchError;
      
      if (data) {
        const sortedData = [...data].sort((a, b) => {
          const clientA = a.client === PINNED_CLIENT;
          const clientB = b.client === PINNED_CLIENT;
          if (clientA && !clientB) return -1;
          if (!clientA && clientB) return 1;
          return 0;
        });

        setProjects(prev => pageNum === 1 ? sortedData : [...prev, ...sortedData]);
        if (data.length < PROJECTS_PER_PAGE) setHasMore(false);
      }
    } catch (err) {
      setError('فشل في تحميل المشاريع. يرجى المحاولة مرة أخرى.');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
      setIsPageLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchProjects(page);
  }, [page, fetchProjects]);
  
  useEffect(() => {
    if (projects.length > 0 && location.hash) {
      const projectId = location.hash.replace('#', '');
      const projectToOpen = projects.find(p => String(p.id) === projectId);
      if (projectToOpen) {
        setSelectedProject(projectToOpen);
      }
    }
  }, [projects, location.hash]);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    navigate(`#${project.id}`);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    navigate(location.pathname, { replace: true });
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">ما نفخر به</h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            مشاريع تؤكد التزامنا بالجودة والموثوقية في مختلف المجالات.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl font-arabic text-primary-gray leading-relaxed max-w-4xl mx-auto">
              <strong>تفخر شركة أبار جروب</strong> بسجل حافل من النجاحات والإنجازات المتميزة في مجالات:
              <span className="text-primary font-semibold"> حفر الآبار، صيانتها، أنظمة ضخ المياه، والطاقة الشمسية</span>، حيث نلتزم دومًا بأعلى معايير الدقة والجودة في كل مشروع نقوم به.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => <ProjectCardSkeleton key={index} />)}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl font-arabic text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl font-arabic text-primary-gray">لا توجد مشاريع لعرضها حاليًا.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onOpenModal={() => handleOpenModal(project)} />
                ))}
              </div>
              {isPageLoading && (
                  <div className="text-center mt-12">
                    <p className="text-lg font-arabic text-primary-gray">جاري تحميل المزيد...</p>
                  </div>
              )}
              {hasMore && !isPageLoading && (
                <div className="text-center mt-12">
                  <button onClick={() => setPage(p => p + 1)} className="px-8 py-3 bg-primary-blue text-white font-bold font-arabic rounded-full hover:bg-primary-sky-blue transition-all duration-300 shadow-lg">
                    تحميل المزيد
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />

      <OurClientsSection />
    </div>
  );
};

export default Projects;