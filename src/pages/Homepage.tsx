import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, Droplets, Users, Award, CheckCircle, Star, X, Phone, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../config/supabaseClient';
import ReactMarkdown from 'react-markdown';
import Slider from "react-slick";

// =================================================================================
// --- Interfaces and Helper Components ---
// =================================================================================

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

interface Client {
    id: string;
    logo_url: string;
}

// --- 1. مكون فرعي: بطاقة الخدمة ---
const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = React.memo(({ service, onClick }) => {
    // استخراج الوصف القصير من بداية النص ليعرض في البطاقة
    const shortDescriptionMatch = service.description.match(/\\*وصف قصير للمعاينة:\\*([\s\S]*?)---/);
    const shortDescription = shortDescriptionMatch ? shortDescriptionMatch[1].trim() : service.description.split('\n')[0].trim();

    return (
        <div
            id={service.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 flex flex-col cursor-pointer"
            onClick={onClick}
        >
            {/* --- التعديل هنا --- */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={service.image_url} alt={service.title} loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* --- نهاية التعديل --- */}
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

// --- 2. مكون فرعي: النافذة المنبثقة للخدمة ---
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

    const fullDescriptionMatch = service.description.match(/---([\s\S]*)/);
    const fullDescription = fullDescriptionMatch ? fullDescriptionMatch[1].trim() : service.description;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div
                id="modal-content"
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- التعديل هنا --- */}
                <div className="relative bg-gray-100">
                    <img src={service.image_url} alt={service.title} loading="lazy" className="w-full h-64 object-contain" />
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/70 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 z-10">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {/* --- نهاية التعديل --- */}
                <div className="p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-arabic font-bold text-primary-blue mb-6 text-center">{service.title}</h2>
                    <article className="prose prose-lg prose-slate max-w-none prose-rtl">
                        <style dangerouslySetInnerHTML={{ __html: `
                            .prose-rtl ul, .prose-rtl ol { direction: rtl; text-align: right; padding-right: 20px; padding-left: 0; }
                            .prose-rtl ul li, .prose-rtl ol li { list-style-position: inside; text-indent: -1.5em; padding-right: 1.5em; }
                            .prose-rtl p { text-align: right; direction: rtl; }
                            .prose-rtl h1, .prose-rtl h2, .prose-rtl h3, .prose-rtl h4, .prose-rtl h5, .prose-rtl h6 { text-align: right; direction: rtl; }
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

// --- 3. مكون فرعي: آراء العملاء ---
const reviewsData = [
    { name: 'م. أحمد المصري', review: 'خبرة واحترافية عالية، أنجزوا حفر البئر في وقت قياسي وبأعلى جودة. فريق عمل ممتاز ومعدات حديثة. أنصح بهم بشدة.', rating: 5 },
    { name: 'شركة النيل للزراعة', review: 'تعاملنا مع أبار جروب لتركيب نظام طاقة شمسية متكامل لمزرعتنا. كانت النتائج مذهلة والتوفير في تكاليف الكهرباء كبير جدًا.', rating: 5 },
    { name: 'خالد عبد الرحمن', review: 'خدمة صيانة الآبار لديهم ممتازة. قاموا بتنظيف وتطهير البئر وأصبحت كفاءة المياه أفضل من أي وقت مضى. شكرًا لكم.', rating: 4 },
    { name: 'مؤسسة البناء الحديث', review: 'الدراسات الجيوفيزيائية التي قدموها كانت دقيقة للغاية وساعدتنا في تحديد أفضل موقع للمشروع. فريق محترف وموثوق.', rating: 5 },
];

const CustomerReviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextReview = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1));
    }, []);
    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1));
    };
    useEffect(() => {
        const timer = setInterval(nextReview, 4000);
        return () => clearInterval(timer);
    }, [nextReview]);
    const activeReview = reviewsData[currentIndex];
    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">آراء عملائنا</h2>
                    <p className="text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">شهادات نعتز بها من عملائنا الذين وضعوا ثقتهم في خدماتنا.</p>
                </div>
                <div className="relative max-w-3xl mx-auto flex items-center justify-center min-h-[250px]">
                    <button onClick={prevReview} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10">
                        <ChevronRight className="h-6 w-6 text-primary-blue" />
                    </button>
                    <div className="relative w-full overflow-hidden">
                        <div key={currentIndex} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center animate-fade-in">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(activeReview.rating)].map((_, i) => <Star key={i} fill="currentColor" className="w-6 h-6" />)}
                                {[...Array(5 - activeReview.rating)].map((_, i) => <Star key={i} className="w-6 h-6" />)}
                            </div>
                            <p className="font-arabic text-primary-gray leading-relaxed flex-grow mb-4 text-lg">"{activeReview.review}"</p>
                            <h3 className="text-lg font-arabic font-bold text-primary-blue mt-auto">- {activeReview.name}</h3>
                        </div>
                    </div>
                    <button onClick={nextReview} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10">
                        <ChevronLeft className="h-6 w-6 text-primary-blue" />
                    </button>
                </div>
                <div className="text-center mt-16">
                    <Link to="/contact#add-review" className="text-lg font-arabic font-bold text-primary-blue hover:underline transition-colors">هل لديك رأي؟ شاركنا به</Link>
                </div>
            </div>
        </section>
    );
};

// --- 4. مكون فرعي: شركاء النجاح ---
interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
        <ChevronLeft size={30} className="text-primary-blue hover:text-primary-sky-blue absolute top-1/2 -right-8 -translate-y-1/2" />
    </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
        <ChevronRight size={30} className="text-primary-blue hover:text-primary-sky-blue absolute top-1/2 -left-8 -translate-y-1/2" />
    </div>
);


const OurClients: React.FC<{ clients: Client[]; isLoading: boolean }> = ({ clients, isLoading }) => {
    const settings = {
        dots: false,
        infinite: clients.length > 5,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 640, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">شركاء النجاح</h2>
                    <p className="text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">نفخر بالثقة التي منحنا إياها كبار العملاء في مختلف القطاعات.</p>
                </div>
                <div className="px-10">
                    {isLoading ? (
                        <div className="text-center text-primary-gray">جاري تحميل شعارات شركائنا...</div>
                    ) : clients.length > 0 ? (
                        <Slider {...settings}>
                            {clients.map(client => (
                                <div key={client.id} className="px-4">
                                    <div className="flex items-center justify-center h-24">
                                        {/* --- تعديل: تمت إضافة تأثير التكبير هنا --- */}
                                        <img 
                                            src={client.logo_url} 
                                            alt={`شعار شريك`} 
                                            className="max-h-full max-w-full object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="w-full text-center text-red-500 py-8">تعذر تحميل بيانات الشركاء حاليًا.</div>
                    )}
                </div>
            </div>
        </section>
    );
};


// =================================================================================
// --- المكون الرئيسي للصفحة Homepage ---
// =================================================================================
const Homepage: React.FC = () => {
    const location = useLocation(); 
    useEffect(() => {
        if (location.pathname === '/') {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [clientsLoading, setClientsLoading] = useState(true);

    const stats = [
        { icon: Droplets, number: "500+", label: t('wellsDrilled') },
        { icon: Award, number: "25+", label: t('yearsExperience') },
        { icon: Users, number: "600+", label: t('happyClients') },
        { icon: CheckCircle, number: "300+", label: t('projectsCompleted') }
    ];
    const heroSlides = [
        { image: "/تصميم-بدون-عنوان-_8_.webp", title: "ابار جروب لخدمات ابار المياة الجوفية", subtitle: "حفر أبار المياه الجوفية وصيانتها وتطهيرها وتوريد كافة قطع الغيار والطلمبات والغاطس والمواسير وفق احدث الانظمة والتكنولوجيا", tagline: "تعتبر شركة ابار جروب من افضل شركات حفر آبار مياه في مصر" },
        { image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop", title: "الطاقة الشمسية المستدامة", subtitle: "حلول الطاقة المتجددة للمستقبل", tagline: "نضيء طريقكم نحو المستقبل الأخضر" },
        { image: "/tinywow_0-1_75241750.webp", title: "الدراسات الجيوفيزيائية", subtitle: "تحليل دقيق للتربة والمياه الجوفية", tagline: "نكشف أسرار الأرض لنبني المستقبل" }
    ];
    const whyChooseUs = [
        { icon: Award, title: t('excellence'), description: "أبار جروب خبرة أكثر من 25 عامًا في حفر وصيانة الآبار..." },
        { icon: CheckCircle, title: t('quality'), description: "نضمن لك في أبار جروب أعلى درجات الجودة والثقة..." },
        { icon: Star, title: t('innovation'), description: "يضم فريق أبار جروب نخبة من المهندسين والفنيين..." },
        { icon: Users, title: t('reliability'), description: "في أبار جروب نتولى تنفيذ المشروع بالكامل..." }
    ];

    const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1)), [heroSlides.length]);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase.from('services').select('*').in('id', ['3e805355-f78d-4461-86d5-8ca45389f045', 'c1ad2c02-9f81-416a-b7d4-bd9642da9839']);
            if (error) console.error("Error fetching services by ID:", error.message);
            else setServices(data || []);
        };
        const fetchClients = async () => {
            setClientsLoading(true);
            const { data, error } = await supabase.from('our_clients').select('id, logo_url');
            if (error) {
                console.error('**خطأ في جلب بيانات شركاء النجاح**:', error.message);
                setClients([]);
            } else {
                const validClients = (data || []).filter(client => client.logo_url);
                setClients(validClients);
            }
            setClientsLoading(false);
        };
        fetchServices();
        fetchClients();
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const handleOpenServiceModal = (service: Service) => setSelectedService(service);
    const handleCloseServiceModal = () => setSelectedService(null);

    return (
        <div className="overflow-hidden relative">
            {/* --- Hero Section --- */}
            <section className="relative h-screen">
                <div className="absolute inset-0">
                    <img src={heroSlides[currentSlide].image} alt="Hero" loading="lazy" className="w-full h-full object-cover transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/80 via-primary-sky-blue/60 to-transparent"></div>
                    <div className="absolute inset-0">
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary-light-blue/30 to-transparent animate-wave"></div>
                        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/30 rounded-full animate-ripple"></div>
                        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-ripple" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
                <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-fade-in">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-arabic font-bold mb-6 leading-tight">{heroSlides[currentSlide].title}</h1>
                            <p className="text-2xl md:text-3xl font-arabic mb-4 text-primary--blue">{heroSlides[currentSlide].subtitle}</p>
                            <p className="text-xl md:text-2xl font-arabic mb-12 text-white/90">{heroSlides[currentSlide].tagline}</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/services" className="inline-flex items-center px-8 py-4 bg-white text-primary-blue font-arabic font-bold rounded-full hover:bg-primary-light-blue hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                                    {t('exploreServices')}
                                    <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                                <Link to="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-arabic font-bold rounded-full hover:bg-white hover:text-primary-blue transition-all duration-300 transform hover:scale-105">
                                    {t('getInTouch')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"><ArrowRight className="h-6 w-6" /></button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"><ArrowLeft className="h-6 w-6" /></button>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse z-20">
                    {heroSlides.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} />))}
                </div>
            </section>

            {/* --- Stats Section --- */}
            <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-sky-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center text-white group">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="h-8 w-8" />
                                </div>
                                <div className="text-4xl md:text-5xl font-arabic font-bold mb-2">{stat.number}</div>
                                <div className="font-arabic text-white/90 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- About Section --- */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in">
                            <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-8 leading-tight">من نحن؟</h2>
                            <p className="text-lg font-arabic text-primary-gray mb-10 leading-relaxed">
                                شركة أبار جروب هي شركة مصرية رائدة في مجال حفر وصيانة وتأهيل الآبار الجوفية، بخبرة تمتد لأكثر من 25 عامًا من العمل المتواصل والناجح. نقدم حلولًا متكاملة تشمل حفر آبار المياه، تنظيفها، تعقيمها، وصيانتها الدورية، بالإضافة إلى تركيب المضخات الغاطسة، أنظمة الطاقة الشمسية، الكابلات.
                                <br /><br />
                                كما نقوم بإجراء الدراسات الجيوفيزيائية وتجارب الضخ للمشروعات الزراعية والصناعية والسكنية، نحن في أبار جروب نسعى دائمًا لتقديم خدمات موثوقة ومستدامة، تلبي احتياجات عملائنا.
                            </p>
                            <Link to="/about" className="inline-flex items-center px-8 py-4 bg-primary-blue text-white font-arabic font-bold rounded-full hover:bg-primary-sky-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                                {t('learnMore')}
                                <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <img src="../../ecommerce-website/backend/picture/about.jpg" alt=" Abaar Group" className="w-full h-96 object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/50 to-transparent"></div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-light-blue/20 rounded-full animate-float"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-blue/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Services Section --- */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">{t('ourServices')}</h2>
                        <p className="text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">
                            نقدم مجموعة شاملة من الخدمات المتخصصة في مجال المياه الجوفية والطاقة الشمسية.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <ServiceCard key={service.id} service={service} onClick={() => handleOpenServiceModal(service)} />
                            ))
                        ) : (
                            <p className="md:col-span-2 text-center text-primary-gray">جاري تحميل الخدمات المختارة...</p>
                        )}
                    </div>
                    <div className="text-center mt-16">
                        <Link to="/services" className="inline-flex items-center px-10 py-4 bg-primary-blue text-white font-arabic font-bold rounded-full hover:bg-primary-sky-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                            للمزيد من الخدمات
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* --- Why Choose Us Section --- */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">{t('whyChooseUs')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-sky-blue rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <item.icon className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-xl font-arabic font-bold text-primary-blue mb-4">{item.title}</h3>
                                <p className="font-arabic text-primary-gray leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* --- استدعاء الأقسام الجديدة والمحسنة --- */}
            <CustomerReviews />
            <OurClients clients={clients} isLoading={clientsLoading} />

            {/* --- عرض النافذة المنبثقة للخدمات هنا --- */}
            <ServiceModal service={selectedService} onClose={handleCloseServiceModal} />
        </div>
    );
};

export default Homepage;