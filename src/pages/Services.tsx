import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Shield, Clock, Star, Award, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../config/databse';

// --- Interfaces ---
interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

// --- المكون الفرعي: بطاقة الخدمة ---
const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = React.memo(({ service, onClick }) => {
    // استخراج الوصف القصير من بداية النص ليعرض في البطاقة
    const shortDescriptionMatch = service.description.match(/\\*وصف قصير للمعاينة:\\([\s\S]?)---/);
    const shortDescription = shortDescriptionMatch ? shortDescriptionMatch[1].trim() : service.description.split('\n')[0].trim();

    return (
        <div
            id={service.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 flex flex-col cursor-pointer"
            onClick={onClick}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img src={service.image_url} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-arabic font-bold text-primary-blue mb-3">{service.title}</h3>
                <p className="font-arabic text-primary-gray leading-relaxed text-base mb-4 flex-grow line-clamp-2">{shortDescription}</p>
                <div className="mt-auto">
                    <span className="inline-flex items-center text-primary-blue font-arabic font-bold transition-colors duration-300 group-hover:text-primary-sky-blue">
                        اقرأ المزيد
                        <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </div>
    );
});

// --- المكون الفرعي: نافذة الخدمة المنبثقة ---
const ServiceModal: React.FC<{ service: Service | null; onClose: () => void }> = React.memo(({ service, onClose }) => {
    useEffect(() => {
        if (service) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                document.getElementById('modal-content')?.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [service]);

    if (!service) return null;

    // استخراج النص الكامل للتفاصيل من وصف الخدمة
    const fullDescriptionMatch = service.description.match(/---([\s\S]*)/);
    const fullDescription = fullDescriptionMatch ? fullDescriptionMatch[1].trim() : service.description;


    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div
                id="modal-content"
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <img src={service.image_url} alt={service.title} loading="lazy" className="w-full h-64 object-cover" />
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/70 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 z-10">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-arabic font-bold text-primary-blue mb-6 text-center">{service.title}</h2>
                    <article className="prose prose-lg prose-slate max-w-none prose-rtl">
                        <style dangerouslySetInnerHTML={{ __html: `
                            /* تخصيص اتجاه النص والقوائم لـ RTL */
                            .prose-rtl ul, .prose-rtl ol {
                                direction: rtl;
                                text-align: right;
                                padding-right: 20px; /* مسافة بادئة من اليمين للقوائم */
                                padding-left: 0;     /* إزالة المسافة البادئة الافتراضية من اليسار */
                            }
                            .prose-rtl ul li, .prose-rtl ol li {
                                list-style-position: inside; /* لجعل النقطة/الرقم داخل حدود العنصر */
                                text-indent: -1.5em; /* لتعويض المسافة التي تشغلها النقطة وجعل النص يبدأ من اليمين */
                                padding-right: 1.5em; /* مسافة داخلية لضمان النص بعد النقطة */
                            }
                            .prose-rtl p {
                                text-align: right; /* محاذاة الفقرات لليمين */
                                direction: rtl;
                            }
                            /* تصحيح محاذاة العناوين إذا لزم الأمر */
                            .prose-rtl h1, .prose-rtl h2, .prose-rtl h3, .prose-rtl h4, .prose-rtl h5, .prose-rtl h6 {
                                text-align: right;
                                direction: rtl;
                            }
                        `}} />
                        <ReactMarkdown>{fullDescription}</ReactMarkdown>
                    </article>
                    <div className="text-center mt-10">
                        <a href="/contact" className="inline-flex items-center px-8 py-3 bg-primary-blue text-white font-arabic font-bold rounded-full hover:bg-primary-sky-blue transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <Phone className="ml-2 h-5 w-5" />
                            اطلب استشارة الآن
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

// --- المكون الفرعي: هيكل التحميل ---
const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gray-200 animate-pulse aspect-[4/3]"></div>
        <div className="p-6">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mt-6"></div>
        </div>
    </div>
);


// --- المكون الرئيسي: صفحة الخدمات ---
const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const { data, error: fetchError } = await supabase
                    .from('services')
                    .select('id, title, description, image_url')
                    .order('title', { ascending: true });

                if (fetchError) {
                    throw new Error(fetchError.message);
                }
                setServices(data || []);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('خطأ في جلب البيانات:', err.message);
                } else {
                    console.error('خطأ في جلب البيانات:', err);
                }
                setError('فشل في تحميل الخدمات. يرجى المحاولة مرة أخرى لاحقًا.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);
    
    useEffect(() => {
        if (!isLoading && services.length > 0 && location.hash) {
            const serviceId = location.hash.replace('#', '');
            const serviceToOpen = services.find(s => s.id === serviceId);
            if (serviceToOpen) {
                setSelectedService(serviceToOpen);
            }
        }
    }, [isLoading, services, location.hash]);

    const handleOpenModal = useCallback((service: Service) => {
        setSelectedService(service);
        // هذا هو السطر الذي تم تصحيحه: استخدام الكائن مع خاصية hash
        navigate({ hash: service.id });
    }, [navigate]);

    const handleCloseModal = useCallback(() => {
        setSelectedService(null);
        navigate('/services', { replace: true });
    }, [navigate]);

    const benefits = [
        { icon: Clock, title: 'خبرة موثوقة', description: 'خبرة تمتد لأكثر من 25 عاماً، أنجزنا خلالها مئات المشاريع الناجحة.' },
        { icon: Award, title: 'التزام بالجودة', description: 'نلتزم بأعلى معايير الجودة العالمية، مع تقديم ضمان موثّق على كافة أعمالنا.' },
        { icon: Shield, title: 'دعم فني معتمد', description: 'فريق من الخبراء لتقديم الاستشارات والدعم الفني في جميع مراحل المشروع.' },
        { icon: Star, title: 'حلول فعّالة', description: 'نقدم حلولاً مبتكرة تخفض تكاليف التشغيل على المدى الطويل.' },
    ];

    return (
        <div className="pt-20 bg-gray-50">
            <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">خدماتنا</h1>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                        من حفر الأبار وتوريد وتركيب طلمبات الأعماق الي الصيانة والتطهير و أعادة تاهيل أبارالمياه
                        نقدم حلولاً مبتكرة
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-4">خدماتنا</h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                        ) : error ? (
                            <p className="col-span-full text-center font-arabic text-xl text-red-600 bg-red-100 p-4 rounded-lg border border-red-200">
                                {error}
                            </p>
                        ) : services.length > 0 ? (
                            services.map((service) => (
                                <ServiceCard key={service.id} service={service} onClick={() => handleOpenModal(service)} />
                            ))
                        ) : (
                            <p className="col-span-full text-center font-arabic text-xl text-gray-600">
                                لا توجد خدمات لعرضها حاليًا.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-4">لماذا تختار ابار جروب؟</h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
                        <p className="text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">نجمع بين الخبرة، الابتكار، والالتزام لتقديم نتائج استثنائية في كل مشروع.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="bg-gray-50/70 p-8 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 text-center">
                                <div className="bg-gradient-to-br from-primary-light-blue/20 to-primary-blue/10 inline-block p-4 rounded-full mb-5">
                                    <benefit.icon className="h-8 w-8 text-primary-blue" />
                                </div>
                                <h3 className="text-xl font-arabic font-bold text-primary-blue mb-2">{benefit.title}</h3>
                                <p className="font-arabic text-primary-gray leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {selectedService && <ServiceModal service={selectedService} onClose={handleCloseModal} />}
        </div>
    );
};

export default Services;