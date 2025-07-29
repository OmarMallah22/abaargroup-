import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Droplets, ShoppingBag, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

// --- إضافة: تعريف أنواع البيانات لتحسين الكود ---
interface DropdownItem {
  id: string | number;
  name: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  href: string;
  className: string;
}

interface NavigationItem {
  name: string;
  href: string;
  items?: DropdownItem[];
}


// --- مكون القائمة المنسدلة ---
const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, href, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    // --- تعديل: إضافة النوع الصحيح للـ ref ---
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        leaveTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    // --- تعديل: إضافة النوع الصحيح للمعامل ---
    const handleNavigate = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };
    
    // --- تعديل: إضافة النوع الصحيح للمعامل ---
    const handleTitleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleNavigate(href);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button onClick={handleTitleClick} className={className}>
                <span>{title}</span>
                <ChevronDown className={`h-4 w-4 mr-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full rtl:right-0 ltr:left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-20 transition-all duration-200 transform ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="py-2">
                    {items.map((item: DropdownItem) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(`${href}#${item.id}`)}
                            className="w-full text-right px-4 py-2 text-primary-gray hover:bg-gray-100 hover:text-primary-blue font-arabic transition-colors duration-150"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- المكون الرئيسي للهيدر ---
const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);
    const [isProjectsMobileOpen, setIsProjectsMobileOpen] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { toggleLanguage, t } = useLanguage();
    const { getTotalItems, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const servicesItems: DropdownItem[] = [
        { id: 'dda399a3-0a9b-42d8-9431-6340d57564f4', name: 'تصوير الآبار' },
        { id: '1c15b77f-56ff-4e49-9528-b8c68ea216ee', name: 'تركيب الطاقة الشمسية' },
        { id: '0d27aa79-c96a-4ba2-8bf8-d519790ccf04', name: 'الجسات الجيوفيزيائية' },
        { id: '2d5ee193-3ffc-436b-9925-e653a416d726', name: 'استشارات' },
        { id: '2cac7a36-0c19-42e7-8cc6-172050cbb95b', name: 'حفر آبار مياه جوفية' },
        { id: '3e805355-f78d-4461-86d5-8ca45389f045', name: 'خدمات الصيانة والدعم الفني' },
        { id: 'c1ad2c02-9f81-416a-b7d4-bd9642da9839', name: 'توريدات' }
    ];
    
    const projectsItems: DropdownItem[] = [
        { id: 11, name: ' مستقبل مصر' },
        { id: 1, name: ' مزرعة جنة الرضا' },
        { id: 2, name: '  انشاص الحربي' },
        { id: 3, name: ' بورتو مطروح' },
        { id: 4, name: '  سوديك' },
        { id: 7, name: '  ستيلا دي ماري' },
        { id: 6, name: '  مزارع غبور' },
    ];

    const navigation: NavigationItem[] = [
        { name: t('home'), href: '/' },
        { name: t('about'), href: '/about' },
        { name: t('services'), href: '/services', items: servicesItems },
        { name: t('projects'), href: '/projects', items: projectsItems },
        { name: t('store'), href: '/store' },
        { name: t('articles'), href: '/articles' },
        { name: t('contact'), href: '/contact' },
    ];

    const handleNavigate = (href: string) => {
        if(href.includes('#')) {
            navigate(href);
        } else {
            if (location.pathname === href) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate(href);
            }
        }
        setIsMenuOpen(false);
        setIsServicesMobileOpen(false);
        setIsProjectsMobileOpen(false);
    };

    // --- تحسين: إضافة قائمة منسدلة للجوال ---
    const mobileMenu = (
        <div className={`absolute top-full left-0 w-full bg-white shadow-lg lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
            <div className="p-5 space-y-4">
                {navigation.map((item) => {
                    const isServices = item.name === t('services');
                    const isProjects = item.name === t('projects');

                    if (item.items && (isServices || isProjects)) {
                        const isOpen = isServices ? isServicesMobileOpen : isProjectsMobileOpen;
                        const setIsOpen = isServices ? setIsServicesMobileOpen : setIsProjectsMobileOpen;
                        return (
                            <div key={item.name}>
                                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-right text-lg font-arabic font-semibold text-primary-gray py-2">
                                    <span>{item.name}</span>
                                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                                    {item.items.map(subItem => (
                                        <button key={subItem.id} onClick={() => handleNavigate(`${item.href}#${subItem.id}`)} className="block w-full text-right py-2 text-md font-arabic text-gray-500">
                                            {subItem.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <button key={item.name} onClick={() => handleNavigate(item.href)} className="block w-full text-right text-lg font-arabic font-semibold text-primary-gray py-2">
                            {item.name}
                        </button>
                    );
                })}
                <div className="border-t pt-4 flex items-center justify-between">
                    <button onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }} className="relative p-2">
                        <ShoppingBag className="h-7 w-7 text-primary-blue" />
                        {getTotalItems() > 0 && ( <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-arabic">{getTotalItems()}</span> )}
                    </button>
                    <button onClick={toggleLanguage} className="px-4 py-2 rounded-full font-arabic font-medium transition-colors duration-300 border-2 text-primary-blue border-primary-blue hover:bg-primary-blue hover:text-white">
                        {t('english')}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-light-blue/20' : 'bg-primary-blue/90'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse group cursor-pointer" onClick={() => handleNavigate('/')}>
                        <div className="relative">
                            <img src="/a9878569-30fa-47c7-95ab-ea9667b2331f-removebg-preview.png" alt="شعار أبار جروب" loading="lazy" className="h-12 w-12 transition-all duration-300 group-hover:scale-110" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                            <Droplets className={`h-12 w-12 transition-all duration-300 hidden ${isScrolled ? 'text-primary-blue' : 'text-white'} group-hover:scale-110`} />
                            <div className="absolute inset-0 bg-primary-light-blue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-2xl font-arabic font-bold transition-colors duration-300 ${isScrolled ? 'text-primary-gray' : 'text-white'}`}>ابار جروب</span>
                            <span className={`text-xs font-arabic transition-colors duration-300 ${isScrolled ? 'text-primary-gray' : 'text-white/80'}`}>للمقاولات العامة وحفر الآبار</span>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
                        {navigation.map((item) => {
                            const isActive = location.pathname.startsWith(item.href) && item.href !== '/';
                            const isHomeActive = location.pathname === '/' && item.href === '/';
                            const finalIsActive = isActive || isHomeActive;
                            const navItemClasses = `font-arabic font-medium text-lg transition-colors duration-300 relative group flex items-center ${finalIsActive ? (isScrolled ? 'text-primary-blue font-bold' : 'text-white font-bold') : (isScrolled ? 'text-primary-gray hover:text-primary-blue' : 'text-white hover:text-white/80')}`;

                            if (item.items && item.items.length > 0) {
                                return (
                                    <DropdownMenu
                                        key={item.name}
                                        title={item.name}
                                        items={item.items}
                                        href={item.href}
                                        className={navItemClasses}
                                    />
                                );
                            }

                            return (
                                <button key={item.name} onClick={() => handleNavigate(item.href)} className={navItemClasses}>
                                    {item.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${finalIsActive ? `${isScrolled ? 'bg-primary-blue' : 'bg-white'} w-full` : 'bg-primary-blue w-0 group-hover:w-full'}`} />
                                </button>
                            );
                        })}
                    </nav>
                    
                    <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
                        <button onClick={() => setIsCartOpen(true)} className={`relative p-2 rounded-full transition-all duration-300 ${ isScrolled ? 'text-primary-blue hover:bg-primary-light-blue/10' : 'text-white hover:bg-white/10' }`}>
                            <ShoppingBag className="h-6 w-6" />
                            {getTotalItems() > 0 && ( <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-arabic">{getTotalItems()}</span> )}
                        </button>
                        <button onClick={toggleLanguage} className={`px-4 py-2 rounded-full font-arabic font-medium transition-all duration-300 border-2 ${ isScrolled ? 'text-primary-blue border-primary-blue hover:bg-primary-blue hover:text-white' : 'text-white border-white hover:bg-white hover:text-primary-blue' }`}>
                            {t('english')}
                        </button>
                    </div>

                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-md transition-colors duration-300 ${ isScrolled ? 'text-primary-blue' : 'text-white' }`}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {/* عرض قائمة الجوال */}
                {mobileMenu}
            </div>
        </header>
    );
};

export default Header;