import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';


const CustomerReviews: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Mostafa Hamed",
      rating: 5,
      testimonial: "شركه محترمه ومتخصصه ورائده في مجالها وتقدم خدمه للعملاء أقل ما يُقال عنها أنها ممتازه 👏🏽♥️",
    },
    {
      id: 2,
      name: "Samir Ragab",
      rating: 5,
      testimonial: "بصراحه خدمة متميزه جدا وإتمام جميع خطوات العمل على أكمل وجه ،وخبرة اروع من أي مكان",
    },
    {
      id: 3,
      name: "hasan malah",
      rating: 4.5,
      testimonial: "بصراحة ناس محترمة جدا وخدمة ممتازة ومواعيد تمام وشغل ١٠٠٪",
    },
    {
      id: 4,
      name: "Rizk Elsayd",
      rating: 5,
      testimonial: "شكرا يا بشمهندس رضا و ربنا يوفقكم شركه محترمه و تعامل راقى و ملتزم كل الشكر",
    },
    {
      id: 5,
      name: "Mohamed Osama",
      rating: 5,
      testimonial: "شركة قمة في الاحترافية تعامل محترم",
    },
    {
      id: 6,
      name: "Aliaa Eyada",
      rating: 5,
      testimonial: "شركة محترمة بعد تجربتي شركات كتير هما الافضل في مجال الصيانه",
    },
    {
      id: 7,
      name: "Ezz tamer",
      rating: 5,
      testimonial: "سنوات من الخبرة والريادة في هذا المجال ويظهر ذلك فعلا لمن يتعامل معهم. وانا على المستوى الشخصي تعاملت ورأيت بنفسي.",
    },
    {
      id: 8,
      name: "rabab mohmed",
      rating: 5,
      testimonial: "شركه محترمه ومواعيد مظبوطه وخدمه ما بعد البيع كويسة",
    },
    {
      id: 9,
      name: "Abdulrahman Ahmed",
      rating: 5,
      testimonial: "شركة ذو خبرة في هذا المجال والقائمين عليها محترمين",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4000); // كل 4 ثواني

    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-12">
          {/* {t('customerReviews')} */}
        </h2>

        <div className="relative bg-white p-8 rounded-3xl shadow-lg border border-primary-light-blue/20 transition-all duration-300">
          <h3 className="text-xl font-bold font-arabic text-primary-blue mb-2">
            {reviews[currentSlide].name}
          </h3>

          <div className="flex justify-center mb-4">
            {renderStars(reviews[currentSlide].rating)}
          </div>

          <p className="text-lg font-arabic text-primary-gray leading-relaxed">
            "{reviews[currentSlide].testimonial}"
          </p>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronRight className="h-5 w-5 text-primary-blue" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronLeft className="h-5 w-5 text-primary-blue" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2 rtl:space-x-reverse">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary-blue scale-125' : 'bg-primary-gray/30 hover:bg-primary-gray/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
