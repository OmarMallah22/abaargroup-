import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ShoppingCart, AlignLeft, CheckCircle, Tag, Minus, Plus, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart, Product } from '../context/CartContext';
import ImageWithFallback from './ImageWithFallback';

const WHATSAPP_NUMBER = '201211110240';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductAttributes: React.FC<{ product: Product }> = React.memo(({ product }) => {
  const { t } = useLanguage();
  const attributes = product.attributes ? Object.entries(product.attributes) : [];

  if (attributes.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-bold flex items-center mb-3 text-lg">
        <AlignLeft size={20} className="ml-2 text-primary-blue"/>
        {t('specifications') || 'المواصفات'}
      </h3>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {attributes.map(([key, value]) => (
              <tr key={key} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-3 font-semibold text-primary-gray text-sm">{t(key) || key.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3 text-gray-800 text-sm">{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

const generateWhatsAppMessage = (product: Product, t: (key: string) => string): string => {
    const attributesText = Object.entries(product.attributes || {})
        .map(([key, value]) => `• ${t(key) || key.replace(/_/g, ' ')}: *${String(value)}*`)
        .join('\n');

    return `مرحباً،\nأرغب في الاستفسار عن سعر المنتج التالي:\n
*المنتج:* ${product.name} (${product.brand || ''})
*ID:* ${product.id}
${attributesText ? `\n*المواصفات المطلوبة:*\n${attributesText}` : ''}
\nالرجاء تزويدي بالسعر وتفاصيل التوافر.`;
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product && modalRef.current) {
      modalRef.current.focus();
    }
    setIsAdded(false);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleAddToCart = useCallback(async () => {
    if (!product || isAdded) return;
    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(product);
      }
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert('حدث خطأ أثناء إضافة المنتج للسلة.');
    }
  }, [product, quantity, isAdded, addToCart]);
  
  const handleRequestPrice = useCallback(() => {
    if (!product) return;
    const message = generateWhatsAppMessage(product, t);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [product, t]);

  const handleShare = useCallback(() => {
    if (!product) return;
    const productUrl = `${window.location.origin}${window.location.pathname}#productID=${product.id}`;
    
    // --- تحسين: استخدام Optional Chaining (?.) لضمان الأمان مع TypeScript ---
    if (navigator?.share) {
        navigator.share({
            title: product.name,
            text: `تحقق من هذا المنتج الرائع: ${product.name}`,
            url: productUrl,
        }).catch(console.error);
    } else if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(productUrl).then(() => {
            alert('تم نسخ رابط المنتج!');
        }).catch(() => {
            alert('فشل نسخ الرابط.');
        });
    } else {
        alert('خاصية المشاركة والنسخ غير مدعومة في هذا المتصفح.');
    }
  }, [product]);

  if (!product) return null;

  const stockStatus = product.instock
    ? <span className="text-sm font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">{t('in_stock')}</span>
    : <span className="text-sm font-medium text-red-600 bg-red-100 px-2.5 py-1 rounded-full">{t('out_of_stock')}</span>;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={onClose}>
        <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col transform animate-scale-in"
            onClick={e => e.stopPropagation()}
        >
            <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 id="modal-title" className="text-xl font-bold font-arabic text-primary-dark-blue">{product.name} <span className="text-base font-normal text-gray-500">({product.brand})</span></h2>
                <div className="flex items-center gap-2">
                    {stockStatus}
                    <button onClick={onClose} aria-label="إغلاق" className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                        <X size={22}/>
                    </button>
                </div>
            </header>

            <div className="flex-grow overflow-y-auto p-6 grid md:grid-cols-2 gap-8 font-arabic">
                <div className="flex flex-col items-center">
                    <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-lg mb-4"
                    />
                     {'share' in navigator && (
                        <button
                            onClick={handleShare}
                            className="mt-4 px-4 py-2 text-sm rounded-lg text-gray-700 font-semibold flex items-center bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Share2 size={16} className="ml-2"/>
                            {t('share_product')}
                        </button>
                    )}
                </div>
                <div className="space-y-6">
                    <ProductAttributes product={product} />
                    <div>
                        <h3 className="font-bold flex items-center mb-3 text-lg">
                            <AlignLeft size={20} className="ml-2 text-primary-blue"/>
                            {t('description')}
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
                    </div>
                </div>
            </div>

            <footer className="p-4 bg-gray-50 border-t flex flex-wrap justify-between items-center gap-4 sticky bottom-0">
    {/* --- الجزء الأيسر: محدد الكمية --- */}
    {product.instock ? (
        <div className="flex items-center border border-gray-300 rounded-lg">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"><Minus size={16}/></button>
            <span className="px-4 font-bold text-lg">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"><Plus size={16}/></button>
        </div>
    ) : (
        /* نترك هذا فارغًا للحفاظ على التنسيق عندما يكون المنتج غير متوفر */
        <div></div>
    )}

    {/* --- الجزء الأيمن: أزرار الإجراءات --- */}
    <div className="flex items-center gap-4 flex-grow justify-end">
        {/* زر اطلب السعر (يظهر دائمًا) */}
        <button
            onClick={handleRequestPrice}
            className="px-6 py-2.5 rounded-lg text-white font-bold flex items-center bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-md"
        >
            <Tag size={18} className="ml-2"/>
            {t('requestPrice')}
        </button>
        
        {/* زر إضافة إلى السلة (يظهر دائمًا) */}
        <button
            onClick={handleAddToCart}
            disabled={!product.instock || isAdded}
            className={`px-6 py-2.5 rounded-lg text-white font-bold flex items-center justify-center transition-all duration-300 min-w-[180px] shadow-md ${
                isAdded ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105'
            }`}
        >
            {isAdded ? (
                <span className="flex items-center animate-fade-in"><CheckCircle size={18} className="ml-2"/>{t('added_to_cart')}</span>
            ) : (
                <span className="flex items-center"><ShoppingCart size={18} className="ml-2"/>{t('addToCart')}</span>
            )}
        </button>
    </div>
</footer>
        </div>
    </div>
  );
};

export default React.memo(ProductDetailModal);