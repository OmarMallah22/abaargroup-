import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    projects: 'المشاريع',
    services: 'خدماتنا',
    partners: 'شركاؤنا',
    contact: 'اتصل بنا',
    store: 'المتجر',
    articles: 'المقالات',
    english: 'English',
    
    // Store & Products
    storeTitle: 'متجر أبار جروب',
    storeDescription: 'تسوق أفضل المنتجات والمعدات لحلول المياه والطاقة الشمسية',
    categories: 'أقسام المتجر',
    categoriesDescription: 'اختر القسم المناسب لاحتياجاتك من مجموعة منتجاتنا المتنوعة',
    pumpsAccessories: 'الطلمبات بمشتملاتها',
    solarEnergyAccessories: 'الطاقة الشمسية بمشتملاتها',
    drillingPipes: 'مواسير الحفر',
    pumps: 'طلمبات',
    motors: 'مواتير',
    cables: 'كابلات',
    pipes: 'مواسير',
    protectionPanels: 'لوحات الحماية',
    wellSet: 'مجموعة البئر',
    solarPanels: 'ألواح شمسية',
    inverters: 'عاكسات',
    steelPipes: 'مواسير حديدية',
    filterProducts: 'تصفية المنتجات',
    clearFilters: 'مسح الفلاتر',
    allOptions: 'جميع الخيارات',
    available: 'متوفر',
    unavailable: 'غير متوفر',
    specifications: 'المواصفات',
    noProducts: 'لا توجد منتجات',
    noProductsMessage: 'لم نجد منتجات تطابق معايير البحث الخاصة بك',
    searchProducts: 'البحث في المنتجات...',
    sortByName: 'ترتيب حسب الاسم',
    sortByPrice: 'ترتيب حسب السعر',
    sortByRating: 'ترتيب حسب التقييم',
    products: 'منتج',
    browseProducts: 'تصفح المنتجات',
    viewProducts: 'عرض المنتجات',
    priceOnRequest: 'السعر عند الطلب',
    requestPrice: 'طلب سعر',
    description: 'الوصف',
    in_stock: 'متوفر',
    out_of_stock: 'نفذت الكمية',
    share_product: 'مشاركة المنتج',
    
    // Product Attributes (Updated & Corrected)
    brand: 'الماركة',
    origin:'بلد المنشأ',
    phase: 'فاز',
    poles: 'عدد الأقطاب',
    voltage:'الجهد',
    power_hp: 'القدرة (حصان)',
    power_kw: 'القدرة (كيلووات)',
    current_a: 'التيار (أمبير)',
    speed_rpm: 'سرعة الدوران (دورة/دقيقة)',
    motor_type: 'طراز الموتور',
    motor_series: 'سلسلة الموتور',
    efficiency_percent: 'الكفاءة (%)',
    power_factor_cos: 'معامل القدرة',
    pump_series: 'سلسلة المضخة',
    outlet_size: 'حجم المخرج',
    material: 'المادة',
    diameter: 'القطر',
    '50': 'تحميل 50%',
    '75': 'تحميل 75%',
    '100': 'تحميل 100%',
    // Old keys for reference
    section: 'المقطع',
    manufacturer: 'الشركة المصنعة',
    component: 'المكون',
    power: "القدرة",
    capacity: 'السعة',
    model: "الطراز",
    outlet: "المخرج",
    stages: "عدد المراحل",
    flow_rates: "معدلات التدفق",
    discharge_rate: "معدل التصرف",
    head: "الرفع (متر)",
    insulation: 'العزل',
    conductor_material: 'مادة الموصل',
    connection_method: 'طريقة التوصيل',
    pressure: 'الضغط',
    max_head: 'أقصى رفع',
    power_source: 'مصدر الطاقة',
    purpose: 'الغرض',
    diameters: 'الأقطار',
    material_grade: 'درجة الاستانلس',
    cooling_system: 'نظام التبريد',
    cooling: 'نوع التبريد',
    rotation_speed: 'سرعة الدوران',
    connection_size: 'حجم التوصيل',
    flow_type: 'نوع التدفق',
    required_hp: 'القدرة المطلوبة (حصان)',
    required_kw: 'القدرة المطلوبة (كيلووات)',
    temperature_rating: 'معدل الحرارة',
    available_diameters: 'الأقطار المتاحة',
    features: 'المميزات',
    angle: 'الزاوية',
    connection_type: 'نوع التوصيل',
    available_sections: 'المقاسات المتاحة',
    cores: 'عدد الأطراف',
    voltage_rating: 'معدل الجهد',
    display_type: 'نوع العرض',
    accuracy: 'الدقة',

    // Cart
    cart: 'سلة الطلبات',
    emptyCart: 'السلة فارغة',
    emptyCartMessage: 'أضف منتجات لبدء طلب عرض السعر',
    addToCart: 'أضف للسلة',
    added_to_cart: 'تمت الإضافة',
    removeFromCart: 'إزالة من السلة',
    quantity: 'الكمية',
    total: 'الإجمالي',
    checkout: 'إتمام الطلب',
    requestQuoteWhatsapp: 'طلب عرض سعر عبر واتساب',
    continueShopping: 'متابعة التسوق',
    
    // Homepage
    heroTitle: 'ابار جروب للمقاولات العامة',
    heroSubtitle: 'رواد في خدمات المياه الجوفية والطاقة الشمسية',
    heroTagline: 'نحفر عميقاً لنصل إلى أحلامكم',
    exploreServices: 'استكشف خدماتنا',
    aboutIntro: 'حفر أبار المياه الجوفية وصيانتها وتطهيرها وتوريد كافة قطع الغيار والطلمبات والغاطس والمواسير وفق احدث الانظمة والتكنولوجيا.',
    ourServices: 'خدماتنا',
    whyChooseUs: 'لماذا ابار جروب',
    
    // New sections
    customerReviews: 'آراء العملاء',
    ourClients: 'عملائنا',
    brands: 'العلامات التجارية',
    successPartners: 'شركاء النجاح',
    ourLeadership: 'قيادتنا',
    coreValues: 'قيمنا الأساسية',
    whyAbaarGroup: 'لماذا ابار جروب؟',
    ourCertifications: 'اعتماداتنا',
    
    // Services
    wellDrilling: 'حفر الآبار',
    wellMaintenance: 'صيانة آبار المياه',
    solarEnergy: 'الطاقة الشمسية',
    geophysicalStudies: 'الدراسات الجيوفيزيائية وفحص التربة',
    consultations: 'الاستشارات',
    supplies: 'التوريدات',
    tvSystems: 'تموير الدبل تليفزيونيا',
    
    // Service descriptions
    wellDrillingDesc: 'حفر آبار المياه الجوفية بأحدث التقنيات والمعدات المتطورة',
    wellMaintenanceDesc: 'صيانة وتأهيل آبار المياه لضمان الأداء الأمثل',
    solarEnergyDesc: 'تركيب وصيانة أنظمة الطاقة الشمسية المتكاملة',
    geophysicalDesc: 'دراسات جيوفيزيائية شاملة وفحص التربة للمشاريع',
    consultationsDesc: 'استشارات تقنية متخصصة في مجال المياه والطاقة',
    suppliesDesc: 'توريد المعدات والمواد التقنية عالية الجودة',
    tvSystemsDesc: 'توريد وتركيب أنظمة التلفزيون المزدوجة',
    
    // Contact
    getInTouch: 'تواصل معنا',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    subject: 'الموضوع',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',

    // Footer
    copyright: '© 2025 ابار جروب للمقاولات العامة. جميع الحقوق محفوظة.',
    quickLinks: 'روابط سريعة',
    contactInfo: 'معلومات التواصل',
    
    // Stats
    projectsCompleted: 'مشروع مكتمل',
    yearsExperience: 'سنة خبرة',
    happyClients: 'عميل راضٍ',
    wellsDrilled: 'بئر محفور',
    
    // About
    ourMission: 'رسالتنا',
    ourVision: 'رؤيتنا',
    ourValues: 'قيمنا',
    
    // Common
    learnMore: 'اعرف المزيد',
    readMore: 'اقرأ المزيد',
    viewAll: 'عرض الكل',
    excellence: 'الخبرة',
    quality: 'الثقة والضمان',
    innovation: 'فريق العمل',
    reliability: 'المشروع من الألف الي الياء',
    
    // Values
    qualityValue: 'معايير بناء لا تقبل المساومة',
    innovationValue: 'حلول هندسية متطورة',
    integrityValue: 'شفافية في كل التعاملات',
    sustainabilityValue: 'التزام بيئي في جميع المشاريع'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    projects: 'Projects',
    services: 'Services',
    partners: 'Partners',
    contact: 'Contact',
    store: 'Store',
    articles: 'Articles',
    english: 'عربي',
    
    // Store & Products
    storeTitle: 'ABAAR Group Store',
    storeDescription: 'Shop the best products and equipment for water and solar energy solutions',
    categories: 'Store Categories',
    categoriesDescription: 'Choose the right category for your needs from our diverse product range',
    pumpsAccessories: 'Pumps & Accessories',
    solarEnergyAccessories: 'Solar Energy & Accessories',
    drillingPipes: 'Drilling Pipes',
    pumps: 'Pumps',
    motors: 'Motors',
    cables: 'Cables',
    pipes: 'Pipes',
    protectionPanels: 'Protection Panels',
    wellSet: 'Well Set',
    solarPanels: 'Solar Panels',
    inverters: 'Inverters',
    steelPipes: 'Steel Pipes',
    filterProducts: 'Filter Products',
    clearFilters: 'Clear Filters',
    allOptions: 'All Options',
    available: 'Available',
    unavailable: 'Unavailable',
    specifications: 'Specifications',
    noProducts: 'No Products Found',
    noProductsMessage: 'We couldn\'t find products matching your search criteria',
    searchProducts: 'Search products...',
    sortByName: 'Sort by Name',
    sortByPrice: 'Sort by Price',
    sortByRating: 'Sort by Rating',
    products: 'products',
    browseProducts: 'Browse Products',
    viewProducts: 'View Products',
    priceOnRequest: 'Price on Request',
    requestPrice: 'Request Price',
    description: 'Description',
    in_stock: 'In Stock',
    out_of_stock: 'Out of Stock',
    share_product: 'Share Product',

    // Product Attributes (Updated & Corrected)
    brand: 'Brand',
    origin: 'Country of Origin',
    phase: 'Phase',
    poles: 'Poles',
    voltage: 'Voltage',
    power_hp: 'Power (HP)',
    power_kw: 'Power (kW)',
    current_a: 'Current (A)',
    speed_rpm: 'Speed (RPM)',
    motor_type: 'Motor Model',
    motor_series: 'Motor Series',
    efficiency_percent: 'Efficiency (%)',
    power_factor_cos: 'Power Factor (Cos φ)',
    pump_series: 'Pump Series',
    outlet_size: 'Outlet Size',
    material: 'Material',
    diameter: 'Diameter',
    '50': '50% Load',
    '75': '75% Load',
    '100': '100% Load',
    // Old keys for reference
    section: 'Section',
    power: 'Power',
    model: "Model",
    outlet: "Outlet",
    stages: "Stages",
    max_head: 'Max Head',
    cooling: 'Cooling Type',
    rotation_speed: 'Rotation Speed',
    required_hp: 'Required HP',
    required_kw: 'Required kW',
    temperature_rating: 'Temperature Rating',
    available_diameters: 'Available Diameters',
    features: 'Features',
    angle: 'Angle',
    connection_type: 'Connection Type',
    available_sections: 'Available Sections',
    cores: 'Cores',
    voltage_rating: 'Voltage Rating',
    display_type: 'Display Type',
    accuracy: 'Accuracy',
    
    // Cart
    cart: 'Quote Cart',
    emptyCart: 'Cart is Empty',
    emptyCartMessage: 'Add products to request a quote',
    addToCart: 'Add to Cart',
    added_to_cart: 'Added to Cart',
    removeFromCart: 'Remove from Cart',
    quantity: 'Quantity',
    total: 'Total',
    checkout: 'Request Quote',
    requestQuoteWhatsapp: 'Request Quote via WhatsApp',
    continueShopping: 'Continue Shopping',
    
    // Homepage
    heroTitle: 'ABAAR Group for General Contracting',
    heroSubtitle: 'Leaders in Groundwater & Solar Energy Services',
    heroTagline: 'We dig deep to reach your dreams',
    exploreServices: 'Explore Our Services',
    aboutIntro: 'ABAAR Group is a leading Egyptian company specializing in well drilling, groundwater maintenance, and solar energy solutions.',
    ourServices: 'Our Services',
    whyChooseUs: 'Why Choose Us',
    
    // New sections
    customerReviews: 'Customer Reviews',
    ourClients: 'Our Clients',
    brands: 'Our Brands',
    successPartners: 'Success Partners',
    ourLeadership: 'Our Leadership',
    coreValues: 'Core Values',
    whyAbaarGroup: 'Why ABAAR Group?',
    ourCertifications: 'Our Certifications',
    
    // Services
    wellDrilling: 'Well Drilling',
    wellMaintenance: 'Water Well Maintenance',
    solarEnergy: 'Solar Energy',
    geophysicalStudies: 'Geophysical Studies & Soil Investigation',
    consultations: 'Consultations',
    supplies: 'Supplies',
    tvSystems: 'Dual Television Systems Supply',
    
    // Service descriptions
    wellDrillingDesc: 'Professional water well drilling using advanced technology and equipment',
    wellMaintenanceDesc: 'Comprehensive well maintenance and rehabilitation services',
    solarEnergyDesc: 'Complete solar energy system installation and maintenance',
    geophysicalDesc: 'Comprehensive geophysical studies and soil testing for projects',
    consultationsDesc: 'Specialized technical consulting in water and energy sectors',
    suppliesDesc: 'Supply of high-quality technical equipment and materials',
    tvSystemsDesc: 'Supply and installation of dual television systems',
    
    // Contact
    getInTouch: 'Get In Touch',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Footer
    copyright: '© 2025 ABAAR Group for General Contracting. All Rights Reserved.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    
    // Stats
    projectsCompleted: 'Projects Completed',
    yearsExperience: 'Years Experience',
    happyClients: 'Happy Clients',
    wellsDrilled: 'Wells Drilled',
    
    // About
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourValues: 'Our Values',
    
    // Common
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    excellence: 'Excellence',
    quality: 'Quality',
    innovation: 'Innovation',
    reliability: 'Reliability',
    
    // Values
    qualityValue: 'Uncompromising construction standards',
    innovationValue: 'Advanced engineering solutions',
    integrityValue: 'Transparency in all dealings',
    sustainabilityValue: 'Environmental commitment in all projects'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    const title = language === 'ar' 
      ? 'أبار جروب للمقاولات العامة - متجر المعدات والمنتجات'
      : 'ABAAR Group - Equipment & Products Store';
    document.title = title;
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  };

  const t = (key: string): string => {
    const langKeys = translations[language];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return langKeys[key as keyof typeof langKeys] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};