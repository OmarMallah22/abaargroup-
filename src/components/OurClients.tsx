import React, { useEffect, useState } from 'react';
import { supabase } from '../config/client.js';
import useScrollRestoration from '../hooks/useScrollRestoration';

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const OurClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useScrollRestoration();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('our_clients')
        .select('*')
        .limit(100);

      if (error) {
        console.error('خطأ في تحميل العملاء:', error.message);
      } else if (data) {
        setClients([...data, ...data]);
      }
      setLoading(false);
    };
    fetchClients();
  }, []);

  const animationDuration = (clients.length / 2) * 4;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-blue-600 mb-4">
            شركاء النجاح
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative w-full overflow-hidden group">
          <div
            className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
          ></div>
          <div
            className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
          ></div>

          {loading ? (
            <div className="h-24 flex items-center justify-center text-gray-500">
              جار تحميل العملاء...
            </div>
          ) : (
            <div 
              // ✨ تأكد من أن هذا السطر مطابق تماماً
              className="marquee-container group-hover:[animation-play-state:paused]"
              style={{ animationDuration: `${animationDuration}s` }}
            >
              {clients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 w-[180px] py-4 px-4"
                >
                  <div className="h-28 flex items-center justify-center">
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      title={client.name}
                      loading="lazy"
                      className="
                        max-h-20 w-auto object-contain
                        filter grayscale hover:grayscale-0
                        transform hover:scale-110
                        transition-all duration-300 ease-in-out
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurClients;