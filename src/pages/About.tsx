import React from 'react';
import { Award, Users, Target,  Shield, Lightbulb, Medal, Handshake, Leaf, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Slider from "react-slick";

// --- تعريف نوع للـ props الخاصة بالأسهم ---
interface CustomArrowProps {
  onClick?: () => void;
}

// --- 1. إنشاء مكونات الأسهم المخصصة مع تحديد النوع ---
const NextArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 -right-2 md:-right-6 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
      onClick={onClick}
      aria-label="Next"
    >
      <ArrowLeft className="h-6 w-6 text-primary-blue" />
    </button>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 -left-2 md:-left-6 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
      onClick={onClick}
      aria-label="Previous"
    >
      <ArrowRight className="h-6 w-6 text-primary-blue" />
    </button>
  );
};

// ... باقي الكود الخاص بك

const About: React.FC = () => {
  useLanguage();

  // Company Information Section
  const companyInfo = {
    welcome: "مرحباً في آبار جروب",
    description: "أبار جروب شركة مصرية متخصصة في حفر وصيانة الآبار الجوفية، بخبرة تتجاوز 25 عامًا. نقدم حلولًا متكاملة تشمل الحفر، التطهير، الصيانة، تركيب المضخات والطاقة الشمسية، وإجراء الدراسات الجيوفيزيائية لمختلف أنواع المشاريع.",
    services: [
      "حفر الابار وتطهيرها",
      "توريد وتركيب وصيانه الطلمبات الغاطسة",
      "عمل تجارب الضخ",
      "تنفيذ محطات الطاقة الشمسية",
      "ابار التجفيف",
      "توريد كابلات",
      "توريد مواسير هندى توريد مواسير pvc",
      "تصوير الابار بالكاميرا",
      "تاجير الطلمبات والمواسير",
      "دراسات الجيوفيزك"
    ]
  };

  const values = [
    {
      icon: Medal,
      title: "الثقة والمصداقية",
      description: "نلتزم بالشفافية مع عملائنا في كل خطوة، ونفي دائمًا بوعودنا."
    },
    {
      icon: Lightbulb,
      title: "الاستدامة والمسؤولية",
      description: "نحرص على تنفيذ حلول تحافظ على الموارد وتخدم الأجيال القادمة."
    },
    {
      icon: Handshake,
      title: "الاحترافية والخبرة",
      description: "فريق عمل مؤهل يمتلك خبرة واسعة في مجاله، يضمن تنفيذ المشاريع بدقة وكفاءة."
    },
    {
      icon: Leaf,
      title: "رضا العميل أولويتنا",
      description: "نضع احتياجات العميل في المقام الأول، ونعمل على تجاوز توقعاته."
    }
  ];

  const expertise = [
    {
      icon: Award,
      title: "الخبرة",
      description: "شركه كبرى من شركات حفر ابار مياه فى مصر لدينا 25 عاما فى مجال حفر الابار وصيانتها وإعادة تشغيل الابار القديمة وتنميتها."
    },
    {
      icon: Shield,
      title: "الثقة والضمان",
      description: "نعم الثقة والضمان اللى بتقدمها ابار جروب لعملائها حيث تقدم ابار جروب 10 سنوات ضمان للبئر و 2 سنتين لمشتملات الابار الموردة من قبل الشركة وبحثنا الدائم عن احسن الخامات بأحسن الاسعار الموجودة ودة من اجل تحقيق مبدأ الثقة."
    },
    {
      icon: Users,
      title: "فريق العمل",
      description: "حيث تمتلك الشركة فريق عمل مدرب على اعلى مستوى على احدث معدات حفر الابار وذلك لضمان جودة العمل ونجاح المشروع."
    },
    {
      icon: Target,
      title: "المشروع من ألالف الي الياء",
      description: "و من منطلق كسب ثقة عملاءنا قومنا بتوفير كل ما يخص حفر الابار بداية من عمل الجسة ( الدراسة الجيوفيزك ) الى توريد المشتملات الخاصة الابار من (مواسير الابار والطلمبات الغاطسة بجميع الماركات المتعارف عليها والمواسير الهندى والكابلات ولوحات الحماية و تنفيذ محطات الطاقة الشمسية و شبكات الري ) وتقديم خدمات الصيانه السنوية بعد الحفر من خلال الورش الفنية الخاصة بالشركة وذلك لضمان نجاح المشروع."
    }
  ];

  const leadership = [
    {
      name: "المهندس/ رضا ملاح",
      position: "المؤسس والرئيس التنفيذي"
    },
    {
      name: "م/محمود رضا",
      position: "مبيعات"
    },
    {
      name: "م/عمر علي",
      position: "مبيعات"
    },
    {
      name: "م/محمد حسن",
      position: "حسابات"
    },
    {
      name: "م/شيماء ماهر",
      position: "مبيعات"
    },
    {
      name: "م/روميساء كمال",
      position: "مبيعات"
    },
    {
      name: "م/ عفاف",
      position: "مبيعات"
    },
    {
      name: "م/ ايمان رزق",
      position: "تسويق"
    },
    {
      name: "م/ رضوى كمال",
      position: "تسويق"
    },
    {
      name: "م/ اسلام علي ",
      position: "صيانة"
    },
    {
      name: "م/ فتحي سعد",
      position: "صيانة"
    },
    {
      name: "م/ عبدالرحمن احمد",
      position: "صيانة"
    }
  ];

  // --- 2. تحديث إعدادات السلايدر ---
  const leadershipSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    // تم استبدال السهم الافتراضي بالأسهم المخصصة
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const achievements = [
    {
      icon: Award,
      number: "500+",
      title: "مشروع منجز",
      description: "مشاريع منجزة بنجاح"
    },
    {
      icon: Users,
      number: "98%",
      title: "عميل راضٍ",
      description: "نسبة رضا العملاء"
    },
    {
      icon: Shield,
      number: "25+",
      title: "سنوات خبرة",
      description: "سنوات من الخبرة والتميز"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">
            أبار جروب للمقاولات العامة
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            رواد في مجال المقاولات وحلول الطاقة والمياه، نجمع بين الخبرة العريقة والابتكار لبناء مستقبل أفضل.
          </p>
        </div>
      </section>

      {/* Company Welcome Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-8 leading-tight">
                {companyInfo.welcome}
              </h2>
              <p className="text-xl font-arabic text-primary-gray mb-8 leading-relaxed">
                {companyInfo.description}
              </p>
              
              <h3 className="text-2xl font-arabic font-bold text-primary-blue mb-6">
                خدمات شركة آبار جروب:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {companyInfo.services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary-blue rounded-full mt-3"></div>
                    <p className="font-arabic text-primary-gray leading-relaxed">{service}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-primary-blue text-white font-arabic font-bold rounded-full hover:bg-primary-sky-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Phone className="ml-2 h-5 w-5" />
                  تواصل معنا
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center px-8 py-4 border-2 border-primary-blue text-primary-blue font-arabic font-bold rounded-full hover:bg-primary-blue hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  استكشف خدماتنا
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/about.jpg"
                  alt="ابار جروب"
                  loading="lazy"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/50 to-transparent"></div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-light-blue/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-blue/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Expertise */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">
              ما يميز ابار جروب
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary-light-blue/20">
                <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-sky-blue rounded-full flex-shrink-0">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-arabic font-bold text-primary-blue mb-4">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="font-arabic text-primary-gray leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. تطبيق التعديلات على السلايدر --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">
              فريق العمل
            </h2>
          </div>
          
          {/* تم تغليف السلايدر بـ div له padding و relative */}
          <div className="relative px-8 md:px-12">
            <Slider {...leadershipSettings}>
              {leadership.map((leader, index) => (
                // تم إضافة padding أفقي بين العناصر
                <div key={index} className="px-2">
                  <div className="max-w-[300px] mx-auto bg-white rounded-3xl shadow-lg p-6 text-center border border-primary-light-blue/20">
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 bg-primary-blue/10 rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary-blue" />
                      </div>
                    </div>
                    <h3 className="text-xl font-arabic font-bold text-primary-blue mb-2">{leader.name}</h3>
                    <p className="text-primary-sky-blue font-arabic font-semibold">{leader.position}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">
              قيمنا الأساسية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-blue to-primary-sky-blue rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-arabic font-bold text-primary-blue mb-4">
                  {value.title}
                </h3>
                <p className="font-arabic text-primary-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
<section className="py-24 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] relative overflow-hidden">
  <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {achievements.map((achievement, index) => (
        <div key={index} className="text-center text-white group">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <achievement.icon className="h-8 w-8" />
          </div>
          <div className="text-4xl md:text-5xl font-arabic font-bold mb-2">{achievement.number}</div>
          <div className="font-arabic text-white font-semibold mb-1">{achievement.title}</div>
          <div className="font-arabic text-white/80 text-sm">{achievement.description}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      
    </div>
  );
};

export default About;