import React, { useEffect, useState } from 'react';
import { supabase } from '../config/client';
import { Star } from 'lucide-react'; 

interface OurClient {
  id: number;
  description: string;
}

const OurClientsSection: React.FC = () => {
  const [clients, setClients] = useState<OurClient[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('ourclient')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error("Error fetching 'ourclient' data:", error.message);
      } else if (data) {
        setClients(data as OurClient[]);
      }
    };
    fetchClients();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-blue font-arabic">
            شركاء نفخر بخدمتهم
          </h2>
          <p className="mt-4 text-lg text-primary-gray font-arabic">
            نعتز بثقة الكيانات الكبرى التي تعاونت معنا في مشاريع متميزة
          </p>
          <div className="mt-4 w-24 h-1 bg-yellow-400 mx-auto rounded"></div>
        </div>

        {clients.length > 0 ? (
          // The new, professional grid layout
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map(client => (
              // The new card design with hover effects
              <div
                key={client.id}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* The styled icon container */}
                  <div className="bg-sky-100 text-sky-600 rounded-full p-4 mb-5 transition-colors duration-300 group-hover:bg-primary-blue group-hover:text-white">
                    <Star className="w-8 h-8" />
                  </div>
                  
                  {/* The description text */}
                  <p className="font-arabic text-gray-700 text-lg leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-primary-gray font-arabic mt-12">
            جاري تحميل البيانات...
          </p>
        )}
      </div>
    </section>
  );
};

export default OurClientsSection;