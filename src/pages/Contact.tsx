import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertTriangle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(''); // To show success/error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // --- The Formspree URL is now correctly set ---
    const formspreeEndpoint = 'https://formspree.io/f/mwpbjwol'; 

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // --- UPDATED Contact Information for Egypt ---
  const contactInfo = [
    {
      icon: MapPin,
      title: "المقر الرئيسي",
      content: ["عمارة 250, شارع الشباب, محلية 7, بجوار فيوتشر مول, التجمع الثالث, القاهرة, مصر."]
    },
    {
      icon: Phone,
      title: "الهاتف",
      content: ["01211110240"]
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      content: ["Info@abaargroup.com"]
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      content: ["الأحد - الخميس: 9:00 ص - 4:30 م", "الجمعة - السبت: مغلق"]
    }
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary-light-blue via-primary-sky-blue to-white relative overflow-hidden">
  <div className="absolute inset-0 bg-water-pattern opacity-10"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
    <h1 className="text-5xl md:text-6xl font-arabic font-bold mb-6 leading-tight drop-shadow-md">
      تواصل معنا الآن
    </h1>
    <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
    <p className="mt-6 text-lg md:text-xl font-arabic text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
    نحن هنا لمساعدتك. املأ النموذج أدناه أو تواصل معنا مباشرة.  {/* الوصف بيتغير حسب الصفحة */}
    </p>
  </div>
</section>



      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-100">
              <h2 className="text-3xl font-arabic font-bold text-primary-blue mb-8">أرسل لنا رسالة</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Form fields... */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-arabic font-medium text-primary-gray mb-2">الاسم *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all" placeholder="اسمك الكامل" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-arabic font-medium text-primary-gray mb-2">البريد الإلكتروني *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-arabic font-medium text-primary-gray mb-2">رقم الهاتف</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all" placeholder="+20 1X XXXX XXXX" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-arabic font-medium text-primary-gray mb-2">الموضوع *</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all appearance-none">
                        <option value="">اختر موضوع</option>
                        <option value="well-drilling">حفر آبار</option>
                        <option value="solar-energy">طاقة شمسية</option>
                        <option value="maintenance">صيانة</option>
                        <option value="consultation">استشارة</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-arabic font-medium text-primary-gray mb-2">الرسالة *</label>
                    <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all resize-vertical" placeholder="أخبرنا عن متطلبات مشروعك..."></textarea>
                  </div>
                  
                  {/* Form Status Messages */}
                  <div>
                    {formStatus === 'success' && (
                      <div className="flex items-center p-4 rounded-lg bg-green-50 text-green-700">
                        <CheckCircle className="h-5 w-5 ml-3" />
                        <span>شكراً لتواصلك معنا، تم إرسال رسالتك بنجاح.</span>
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="flex items-center p-4 rounded-lg bg-red-50 text-red-700">
                        <AlertTriangle className="h-5 w-5 ml-3" />
                        <span>عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.</span>
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <button type="submit" disabled={formStatus === 'sending'} className="inline-flex items-center px-8 py-3 bg-primary-blue text-white font-arabic font-bold rounded-lg hover:bg-primary-sky-blue transition-all duration-300 transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:scale-100">
                      {formStatus === 'sending' ? 'جار الإرسال...' : 'إرسال الرسالة'}
                      <Send className="mr-3 h-5 w-5" />
                    </button>
                  </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-arabic font-bold text-primary-blue mb-4">معلومات التواصل</h2>
                <p className="font-arabic text-primary-gray leading-relaxed text-base">
                  تواصل معنا مباشرة عبر أي من القنوات التالية. فريقنا جاهز لمساعدتك.
                </p>
              </div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="text-md font-arabic font-bold text-primary-blue mb-1">{info.title}</h3>
                      {info.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="font-arabic text-primary-gray text-sm leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-primary-light-blue/20">
                <h3 className="text-lg font-arabic font-bold text-primary-blue mb-2">ضمان الاستجابة السريعة</h3>
                <p className="font-arabic text-sm text-primary-gray leading-relaxed">
                  نضمن الرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل. للأمور العاجلة، يرجى الاتصال بنا مباشرة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-arabic font-bold text-primary-blue mb-6">اعثر علينا</h2>
            <p className="text-lg font-arabic text-primary-gray max-w-3xl mx-auto leading-relaxed">
             يقع مقرنا الرئيسي في قلب القاهرة الجديدة، ويسهل الوصول إليه.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden h-96 md:h-[500px] border border-gray-200 shadow-md">
            {/* --- UPDATED MAP EMBED URL --- */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13825.61172152843!2d31.434403!3d29.967886!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583cf6c7a93231%3A0x7f1e291613320573!2z2KfZhNmF2K_ZgSDYp9mE2YXYqtmD2YbYqSDYp9mE2YXZhti12LHYp9iv2YUg2KfZhNmF2YbYtNiv2YfYqg!5e0!3m2!1sen!2seg!4v1672847101123!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
