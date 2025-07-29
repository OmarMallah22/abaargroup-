import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('projects'), href: '/projects' },
    { name: t('store'), href: '/store' },
    { name: t('partners'), href: '/partners' },
    { name: t('contact'), href: '/contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/abaargroupegy/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/abaargroup?igsh=aGNnaWplaGRrMDl5', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1GkJntrBik/?mibextid=qi2Omg', label: 'Facebook' },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-blue via-primary-sky-blue to-primary-light-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
              <div className="relative">
                <img
                    src="/a9878569-30fa-47c7-95ab-ea9667b2331f-removebg-preview.png" // تأكد من هذا المسار!
                    alt="Abaar Group Logo"
                    className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
              </div>
              <div>
                <span className="text-4xl font-arabic font-extrabold block">ابار جروب</span>
                <p className="text-white/80 font-arabic text-base">للمقاولات العامة</p>
              </div>
            </Link>
            <p className="font-arabic text-white/90 leading-relaxed text-lg">
              ابار جروب هي شركة مصرية رائدة متخصصة في حفر وصيانة وتأهيل آبار المياه الجوفية، وتقديم حلول متكاملة للطاقة الشمسية.
              نفتخر بتقديم خدمات عالية الجودة تعتمد على أحدث التقنيات والمعايير الهندسية لتلبية احتياجات عملائنا في مختلف أنحاء الجمهورية.
            </p>
            
            {/* أيقونات السوشيال ميديا المُحسَّنة (التصميم الجديد) */}
            <div className="flex space-x-4 rtl:space-x-reverse pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // هذه هي الفئات الجديدة للتصميم المحسن
                  className="p-3 rounded-full bg-white/10 text-white border border-white/30 
                             shadow-md hover:bg-primary-blue hover:text-white 
                             transition-all duration-300 transform hover:scale-110 hover:shadow-xl
                             flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-arabic font-bold text-white border-b border-white/30 pb-3 mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-arabic text-white/80 hover:text-white transition-all duration-300 hover:translate-x-3 rtl:hover:-translate-x-3 inline-block text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-arabic font-bold text-white border-b border-white/30 pb-3 mb-4">
              {t('contactInfo')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="h-6 w-6 text-white/80 mt-1 flex-shrink-0" />
                <span className="font-arabic text-white/90 text-base leading-relaxed">
                  عمارة 250, شارع الشباب, محلية 7, بجوار فيوتشر مول, التجمع الثالث, القاهرة, مصر.
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-6 w-6 text-white/80" />
                <span className="font-arabic text-white/90 text-base">
                  <a href="tel:+201211110240" className="hover:underline">01211110240</a>
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-6 w-6 text-white/80" />
                <span className="font-arabic text-white/90 text-base">
                  <a href="mailto:Info@abaargroup.com" className="hover:underline">Info@abaargroup.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center mt-12">
          <p className="font-arabic text-white/80 text-base">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;