import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, Search, Home, ShoppingCart, Menu, ChevronsRight, ChevronsLeft, CheckCircle, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart, Product } from '../context/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { supabase } from '../config/databse';
import ProductDetailModal from '../components/ProductDetailModal';

// --- التحسين: تعريف ثابت لعدد المنتجات في الصفحة ---
const PRODUCTS_PER_PAGE = 12;

// --- Interfaces ---
interface Subcategory {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    image: string;
    filters: { type: string; options: string[] }[];
    sort_order: number;
}
interface Category {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    image: string;
    subcategories: Subcategory[];
}
// --- التحسين: جعل المكون أكثر قابلية لإعادة الاستخدام ---
interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
    className?: string;
}

// --- مكون بطاقة المنتج المحسن ---
const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, className = '' }) => {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    // --- التحسين: التعامل مع نجاح وفشل إضافة المنتج ---
    const handleAddToCartClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!product.instock || isAdded) return;
        try {
            // لنفترض أن addToCart الآن قد تعيد قيمة boolean أو تطلق خطأ
            await addToCart(product);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (error) {
            console.error("Failed to add to cart:", error);
            // هنا يمكنك إظهار إشعار للمستخدم (e.g., using react-hot-toast)
            alert(t('addToCartFailed')); 
        }
    };

    return (
        // --- التحسين: إضافة className و user-select-none ---
        <div onClick={() => onViewDetails(product)} className={`bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col cursor-pointer border border-transparent hover:border-primary-blue select-none ${className}`}>
            <div className="relative overflow-hidden">
                <ImageWithFallback src={product.image} alt={language === 'ar' ? product.name : product.nameen} className="w-full h-40 sm:h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                    {product.instock ? (
                        <span className="bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-arabic">{t('available')}</span>
                    ) : (
                        <span className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-arabic">{t('unavailable')}</span>
                    )}
                </div>
            </div>
            <div className="p-3 md:p-4 lg:p-6 flex-grow flex flex-col">
                {product.brand && <span className="text-xs font-arabic text-primary-gray mb-2">{product.brand}</span>}
                <h3 className="text-sm md:text-base lg:text-lg font-arabic font-bold text-primary-blue mb-2 line-clamp-2 flex-grow">
                    {language === 'ar' ? product.name : product.nameen}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <div className="text-sm md:text-base lg:text-xl font-arabic font-bold text-primary-blue">
                        {product.price ? `${product.price} ${t('currency')}` : <span className="text-base text-orange-500 font-semibold">{t('priceOnRequest')}</span>}
                    </div>
                    <button 
                        onClick={handleAddToCartClick} 
                        disabled={!product.instock || isAdded} 
                        className={`px-3 py-2 rounded-lg text-white font-bold flex items-center transition-colors font-arabic text-xs ${isAdded ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'}`}
                    >
                        {isAdded ? <CheckCircle size={16} className="ml-1"/> : <ShoppingCart size={16} className="ml-1"/>}
                        {isAdded ? t('added_to_cart') : t('addToCart')}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- التحسين: مكون عرض هيكلي (Skeleton Loader) ---
const ProductCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-40 sm:h-48 md:h-64 bg-gray-200"></div>
        <div className="p-3 md:p-4 lg:p-6">
            <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded-full w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-full w-1/2 mb-4"></div>
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                <div className="h-6 bg-gray-300 rounded-full w-1/3"></div>
                <div className="h-9 bg-gray-300 rounded-lg w-1/4"></div>
            </div>
        </div>
    </div>
);

// --- التحسين: مكون للحالات الفارغة ---
const EmptyState: React.FC<{ title: string; message: string; onClear?: () => void }> = ({ title, message, onClear }) => {
    const { t } = useLanguage();
    return (
        <div className="text-center py-12 md:py-16 col-span-full">
            <div className="text-4xl md:text-6xl mb-4">📦</div>
            <h3 className="text-lg md:text-xl font-arabic font-bold text-primary-blue mb-2">{title}</h3>
            <p className="font-arabic text-primary-gray text-sm md:text-base">{message}</p>
            {onClear && (
                <button onClick={onClear} className="mt-4 bg-primary-blue text-white px-4 md:px-6 py-2 rounded-lg hover:bg-primary-sky-blue transition-colors duration-300 font-arabic text-sm md:text-base">
                    {t('clearFilters')}
                </button>
            )}
        </div>
    );
};


// --- Store Component ---
const Store: React.FC = () => {
    const { t, language } = useLanguage();
    const { category, subcategory } = useParams<{ category?: string; subcategory?: string }>();
    const { getTotalItems, setIsCartOpen } = useCart();

    // --- State Management ---
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    // --- التحسين: فصل حالة التحميل الأولي عن تحميل الفلترة ---
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
    const [searchTerm, setSearchTerm] = useState('');
    // --- التحسين: حالة للبحث بعد تطبيق Debounce ---
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    // --- التحسين: حالة لتخزين العدد الإجمالي للمنتجات من Supabase ---
    const [totalProducts, setTotalProducts] = useState(0);

    // --- التحسين: تطبيق Debounce على البحث ---
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // --- Modal Body Overflow Handling ---
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (selectedProduct) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = originalOverflow;
        return () => { document.body.style.overflow = originalOverflow; };
    }, [selectedProduct]);

    // --- جلب الفئات مرة واحدة فقط عند تحميل المكون ---
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase.from('categories').select('*, subcategories(*)').order('sort_order', { referencedTable: 'subcategories', ascending: true });
                if (error) throw error;
                setCategories(data || []);
            } catch (err: unknown) {
    console.error("Error fetching categories:", err);
    // يمكنك إضافة تفاصيل أكثر إذا كان الخطأ من نوع Error
    if (err instanceof Error) {
        setError(`${t('errorLoadingCategories')}: ${err.message}`);
    } else {
        setError(t('errorLoadingCategories'));
    }
}
        };
        fetchCategories();
    }, [t]);

    // --- التحسين: جلب المنتجات من Supabase مع فلترة وخادم من جانب الخادم ---
    useEffect(() => {
        const fetchProducts = async () => {
            if (!category || !subcategory) {
                setProducts([]);
                setTotalProducts(0);
                setIsInitialLoading(false);
                return;
            }

            if (products.length === 0) setIsInitialLoading(true);
            else setIsFiltering(true);
            
            setError(null);

            const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
            const to = from + PRODUCTS_PER_PAGE - 1;

            let query = supabase
                .from('products')
                .select('*', { count: 'exact' })
                .eq('category_id', category)
                .eq('subcategory_id', subcategory)
                .range(from, to)
                .order('attributes->>priority', { ascending: false, nullsFirst: false })
                .order(language === 'ar' ? 'name' : 'nameen', { ascending: true });

            if (debouncedSearchTerm) {
                const searchLower = debouncedSearchTerm.toLowerCase();
                query = query.or(`name.ilike.%${searchLower}%,nameen.ilike.%${searchLower}%,brand.ilike.%${searchLower}%`);
            }

            for (const [filterType, filterValue] of Object.entries(selectedFilters)) {
                if (filterValue) {
                    query = query.eq(`attributes->>${filterType}`, filterValue);
                }
            }

            try {
                const { data, error, count } = await query;
                if (error) throw error;
                setProducts(data || []);
                setTotalProducts(count || 0);
            } catch (err: unknown) {
    console.error("Error fetching products:", err);
    if (err instanceof Error) {
        setError(`${t('errorLoadingProducts')}: ${err.message}`);
    } else {
        setError(t('errorLoadingProducts'));
    }
} finally {
                setIsInitialLoading(false);
                setIsFiltering(false);
            }
        };
        fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subcategory, currentPage, debouncedSearchTerm, selectedFilters, t, language]);

    // --- إعادة تعيين الصفحة عند تغيير الفلاتر أو البحث ---
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm, selectedFilters]);

    // --- Helper Functions ---
    const getCurrentCategory = useCallback(() => categories.find(cat => cat.id === category), [categories, category]);
    const getCurrentSubcategory = useCallback(() => getCurrentCategory()?.subcategories.find(sub => sub.id === subcategory), [getCurrentCategory, subcategory]);

    const handleFilterChange = useCallback((filterType: string, value: string) => {
        setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
    }, []);

    const clearFilters = useCallback(() => {
        setSelectedFilters({});
        setSearchTerm('');
    }, []);

    const handleViewDetails = (product: Product) => setSelectedProduct(product);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // --- Helper Render Functions ---
    const renderBreadcrumb = () => {
        const currentCat = getCurrentCategory();
        const currentSub = getCurrentSubcategory();
        return (
            <nav className="text-sm font-arabic mb-4 md:mb-6 bg-white rounded-lg p-3 md:p-4 shadow-sm">
                <div className="flex items-center space-x-2 rtl:space-x-reverse flex-wrap">
                    <Link to="/" className="text-primary-blue hover:text-primary-sky-blue transition-colors duration-300"><Home className="h-4 w-4" /></Link>
                    <span className="text-primary-gray">/</span>
                    <Link to="/store" className="text-primary-blue hover:text-primary-sky-blue transition-colors duration-300">{t('store')}</Link>
                    {currentCat && (<>
                        <span className="text-primary-gray">/</span>
                        <Link to={`/store/${currentCat.id}`} className="text-primary-blue hover:text-primary-sky-blue transition-colors duration-300">{language === 'ar' ? currentCat.name : currentCat.nameEn}</Link>
                    </>)}
                    {currentSub && (<>
                        <span className="text-primary-gray">/</span>
                        <span className="text-primary-gray">{language === 'ar' ? currentSub.name : currentSub.nameEn}</span>
                    </>)}
                </div>
            </nav>
        );
    };
    
    const renderCategoryGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {categories.map((cat) => (
                <Link key={cat.id} to={`/store/${cat.id}`} className="group bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                        <ImageWithFallback src={cat.image} alt={language === 'ar' ? cat.name : cat.nameEn} className="w-full h-40 sm:h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/60 to-transparent"></div>
                        <div className="absolute bottom-3 md:bottom-6 right-3 md:right-6 text-white">
                            <h3 className="text-base md:text-lg lg:text-2xl font-arabic font-bold mb-1 md:mb-2">{language === 'ar' ? cat.name : cat.nameEn}</h3>
                        </div>
                    </div>
                    <div className="p-3 md:p-4 lg:p-6">
                        <p className="font-arabic text-primary-gray leading-relaxed mb-3 md:mb-4 text-xs md:text-sm lg:text-base line-clamp-2">{language === 'ar' ? cat.description : cat.descriptionEn}</p>
                        <div className="flex items-center text-primary-blue font-arabic font-bold text-xs md:text-sm lg:text-base">{t('browseProducts')}<ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" /></div>
                    </div>
                </Link>
            ))}
        </div>
    );
    
    const renderSubcategoryGrid = () => {
        const currentCat = getCurrentCategory();
        if (!currentCat || currentCat.subcategories.length === 0) return (
            <EmptyState 
                title={t('noSubcategoriesInCategory')} 
                message={t('noSubcategoriesInCategoryMessage')} 
            />
        );
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {currentCat.subcategories.map((sub: Subcategory) => (
                    <Link key={sub.id} to={`/store/${category}/${sub.id}`} className="group bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="relative overflow-hidden">
                            <ImageWithFallback src={sub.image} alt={language === 'ar' ? sub.name : sub.nameEn} className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/60 to-transparent"></div>
                            <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 text-white">
                                <h3 className="text-sm md:text-lg lg:text-xl font-arabic font-bold">{language === 'ar' ? sub.name : sub.nameEn}</h3>
                            </div>
                        </div>
                        <div className="p-3 md:p-4 lg:p-6">
                            <p className="font-arabic text-primary-gray leading-relaxed mb-3 md:mb-4 text-xs md:text-sm lg:text-base line-clamp-2">{language === 'ar' ? sub.description : sub.descriptionEn}</p>
                            <div className="flex items-center text-primary-blue font-arabic font-bold text-xs md:text-sm lg:text-base">{t('viewProducts')}<ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" /></div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    const renderFilters = () => {
        const currentSub = getCurrentSubcategory();
        if (!currentSub || !currentSub.filters.length) return null;
        
        const filterContent = (
            <div className="space-y-4">
                {currentSub.filters.map((filter) => (
                    <div key={filter.type}>
                        <label className="block text-sm font-arabic font-medium text-primary-gray mb-2">{t(filter.type)}</label>
                        <select value={selectedFilters[filter.type] || ''} onChange={(e) => handleFilterChange(filter.type, e.target.value)} className="w-full px-3 md:px-4 py-2 border border-primary-light-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 text-sm">
                            <option value="">{t('allOptions')}</option>
                            {filter.options.map((option) => (<option key={option} value={option}>{option}</option>))}
                        </select>
                    </div>
                ))}
            </div>
        );

        return (
            <>
                <div className="hidden md:block bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-arabic font-bold text-primary-blue flex items-center"><Filter className="h-4 w-4 md:h-5 md:w-5 ml-2" />{t('filterProducts')}</h3>
                        <button onClick={clearFilters} className="text-primary-gray hover:text-primary-blue transition-colors duration-300 font-arabic text-sm">{t('clearFilters')}</button>
                    </div>
                    {filterContent}
                </div>
                <div className="md:hidden mb-4">
                    <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="w-full bg-white rounded-lg p-3 md:p-4 shadow-lg flex items-center justify-between font-arabic font-bold text-primary-blue">
                        <div className="flex items-center"><Filter className="h-4 w-4 md:h-5 md:w-5 ml-2" />{t('filterProducts')}</div>
                        <Menu className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    {showMobileFilters && (
                        <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg mt-2">
                            {filterContent}
                            <button onClick={() => { clearFilters(); setShowMobileFilters(false); }} className="w-full mt-4 bg-primary-gray text-white py-2 rounded-lg font-arabic text-sm">{t('clearFilters')}</button>
                        </div>
                    )}
                </div>
            </>
        );
    };

    const renderToolbar = () => {
        return (
            <div className="bg-white rounded-2xl p-3 md:p-4 lg:p-6 shadow-lg mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gray h-4 w-4" />
                        <input
                            type="text"
                            placeholder={t('searchProductsPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-3 md:pl-4 pr-10 py-2 border border-primary-light-blue/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 font-arabic text-sm"
                        />
                        {isFiltering && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                        <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors duration-300 ${viewMode === 'grid' ? 'bg-primary-blue text-white' : 'text-primary-gray hover:text-primary-blue'}`}><Grid className="h-4 w-4 md:h-5 md:w-5" /></button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors duration-300 ${viewMode === 'list' ? 'bg-primary-blue text-white' : 'text-primary-gray hover:text-primary-blue'}`}><List className="h-4 w-4 md:h-5 md:w-5" /></button>
                        </div>
                        <span className="font-arabic text-primary-gray text-sm">{totalProducts} {t('products')}</span>
                        <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full transition-all duration-300 text-primary-blue hover:bg-primary-light-blue/10 md:hidden">
                            <ShoppingBag className="h-6 w-6" />
                            {getTotalItems() > 0 && ( <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-arabic">{getTotalItems()}</span> )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    // --- التحسين: دالة لعرض الشبكة الهيكلية ---
    const renderSkeletonGrid = () => (
        <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
    
    const renderProductGrid = () => {
        if (!isInitialLoading && products.length === 0) {
            const isFilterActive = Object.values(selectedFilters).some(v => v) || debouncedSearchTerm;
            return (
                <EmptyState
                    title={t(isFilterActive ? 'noProductsFound' : 'noProductsInCategory')}
                    message={t(isFilterActive ? 'noProductsFoundMessage' : 'noProductsInCategoryMessage')}
                    onClear={isFilterActive ? clearFilters : undefined}
                />
            );
        }
        return (
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
                ))}
            </div>
        );
    };

    const getPaginationItems = (totalPages: number, currentPage: number, width: number = 7) => {
        if (totalPages <= width) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const sideWidth = Math.floor((width - 3) / 2);
        const leftWidth = sideWidth;
        const rightWidth = totalPages - sideWidth - 1;
    
        if (currentPage <= leftWidth + 2) {
            const pages = Array.from({ length: width - 2 }, (_, i) => i + 1);
            return [...pages, '...', totalPages];
        }
        if (currentPage >= rightWidth - 1) {
            const pages = Array.from({ length: width - 2 }, (_, i) => totalPages - (width - 3) + i);
            return [1, '...', ...pages];
        }
        const pages = Array.from({ length: width - 4 }, (_, i) => currentPage - 1 + i);
        return [1, '...', ...pages, '...', totalPages];
    };
    
    const renderPagination = () => {
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
        if (totalPages <= 1) return null;
    
        const pageItems = getPaginationItems(totalPages, currentPage);
    
        return (
            <nav className="mt-8 flex justify-center items-center">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li><button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50"><ChevronsLeft className="w-5 h-5" /></button></li>
                    {pageItems.map((item, index) => (
                        <li key={index}>
                            {typeof item === 'number' ? (
                                <button onClick={() => handlePageChange(item)} className={`flex items-center justify-center px-4 h-10 leading-tight border ${ currentPage === item ? 'z-10 text-blue-600 border-blue-300 bg-blue-50' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100'}`}>{item}</button>
                            ) : (
                                <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">...</span>
                            )}
                        </li>
                    ))}
                    <li><button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50"><ChevronsRight className="w-5 h-5" /></button></li>
                </ul>
            </nav>
        );
    };
    
    // --- Main Return JSX ---
    return (
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">متجر أبار جروب</h1>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">اكتشف مجموعة منتجاتنا من الطلمبات، الأنظمة الشمسية، الكابلات، والملحقات التقنية عالية الجودة.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 lg:py-12">
                {error && (<div className="text-center py-20 bg-red-50 border border-red-200 rounded-lg"><h2 className="text-2xl font-bold text-red-600">Something went wrong</h2><p className="text-red-500">{error}</p></div>)}
                
                {!error && (
                    <>
                        {renderBreadcrumb()}
                        {!category && (
                            <>
                                <div className="text-center mb-6 md:mb-12 lg:mb-16"><h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-arabic font-bold text-primary-blue mb-3 md:mb-4 lg:mb-6">{t('categories')}</h2><p className="text-sm md:text-lg lg:text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">{t('categoriesDescription')}</p></div>
                                {categories.length > 0 ? renderCategoryGrid() : <div className="text-center text-primary-gray">{t('loading')}</div>}
                            </>
                        )}
                        {category && !subcategory && (
                            <>
                                <div className="text-center mb-6 md:mb-12 lg:mb-16"><h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-arabic font-bold text-primary-blue mb-3 md:mb-4 lg:mb-6">{language === 'ar' ? getCurrentCategory()?.name : getCurrentCategory()?.nameEn}</h2><p className="text-sm md:text-lg lg:text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">{language === 'ar' ? getCurrentCategory()?.description : getCurrentCategory()?.descriptionEn}</p></div>
                                {renderSubcategoryGrid()}
                            </>
                        )}
                        {category && subcategory && (
                            <>
                                <div className="text-center mb-6 md:mb-12 lg:mb-16"><h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-arabic font-bold text-primary-blue mb-3 md:mb-4 lg:mb-6">{language === 'ar' ? getCurrentSubcategory()?.name : getCurrentSubcategory()?.nameEn}</h2><p className="text-sm md:text-lg lg:text-xl font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">{language === 'ar' ? getCurrentSubcategory()?.description : getCurrentSubcategory()?.descriptionEn}</p></div>
                                {renderFilters()}
                                {renderToolbar()}
                                {isInitialLoading ? renderSkeletonGrid() : renderProductGrid()}
                                {renderPagination()}
                            </>
                        )}
                    </>
                )}
            </div>
            {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </div>
    );
};

export default Store;