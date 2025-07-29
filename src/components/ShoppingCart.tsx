import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, MessageCircle, Check, AlertTriangle } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// --- مكون فرعي لعرض منتج واحد في السلة ---
const CartItem: React.FC<{ item: CartItemType }> = React.memo(({ item }) => {
    const { language } = useLanguage();
    const { updateQuantity, removeFromCart } = useCart();
    const itemName = language === 'ar' ? item.name : item.nameen;

    return (
        <div className="bg-white rounded-2xl p-3 md:p-4 transition-transform transform hover:scale-[1.02] duration-300 shadow-sm">
            <div className="flex items-start space-x-3 md:space-x-4 rtl:space-x-reverse">
                <img
                    src={item.image}
                    alt={itemName}
                    loading="lazy"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-arabic font-bold text-primary-blue text-sm mb-1 line-clamp-2">
                        {itemName}
                    </h4>
                    <p className="font-arabic text-primary-gray text-xs mb-2">
                        {item.brand}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-200 transition-colors"
                            >
                                <Minus className="h-4 w-4 text-primary-gray" />
                            </button>
                            <span className="font-arabic font-bold text-primary-blue min-w-[2rem] text-center text-base">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-200 transition-colors"
                            >
                                <Plus className="h-4 w-4 text-primary-gray" />
                            </button>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                            aria-label="Remove item"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});


// --- المكون الرئيسي للسلة ---
const ShoppingCart: React.FC = () => {
    const { items, clearCart, getTotalItems, isCartOpen, setIsCartOpen } = useCart();
    const { t, language } = useLanguage();
    const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');

    

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const handleRequestQuote = () => {
        const cartDetails = items.map(item => {
            const itemName = language === 'ar' ? item.name : item.nameen;
            let attributesText = '';
            if (item.attributes && Object.keys(item.attributes).length > 0) {
                attributesText = Object.entries(item.attributes)
                    .filter(([key]) => key !== 'original_price')
                    .map(([key, value]) => {
                        if (key === 'flow_rates' && Array.isArray(value)) {
                            const flowDetails = value.map(flow => `\t• ${flow.rate} @ ${flow.head}`).join('\n');
                            return `  - ${t(key) || key}:\n${flowDetails}`;
                        }
                        return `  - ${t(key) || key.replace(/_/g, ' ')}: ${value}`;
                    }).join('\n');
            }
            return `*${itemName}* (${item.brand})\n- ${t('quantity')}: ${item.quantity}${attributesText ? `\n${attributesText}` : ''}`;
        }).join('\n\n---------------------\n');

        const message = `مرحباً،\nأرغب في طلب عرض سعر للمنتجات التالية:\n\n${cartDetails}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(message).then(() => {
                setCopyState('success');
                setTimeout(() => setCopyState('idle'), 2500);
                const whatsappNumber = '201211110240';
                const whatsappUrl = `https://wa.me/${whatsappNumber}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }).catch(err => {
                console.error('خطأ في نسخ النص: ', err);
                setCopyState('error');
                setTimeout(() => setCopyState('idle'), 2500);
            });
        }
    };
    
    const handleClearCart = () => {
        if (window.confirm(t('confirm_clear_cart'))) {
            clearCart();
        }
    };

    const renderQuoteButtonContent = () => {
        switch (copyState) {
            case 'success': return <><Check className="h-5 w-5 ml-2 animate-pulse" />{t('quote_copied')}</>;
            case 'error': return <><AlertTriangle className="h-5 w-5 ml-2" />{t('copy_failed')}</>;
            default: return <><MessageCircle className="h-5 w-5 ml-2" />{t('requestQuoteWhatsapp')}</>;
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsCartOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-gray-100 w-full max-w-md h-full flex flex-col shadow-2xl absolute right-0 transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <header className="flex-shrink-0 bg-white border-b border-gray-200 p-4 md:p-6 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-primary-blue ml-2" />
                            <h2 className="text-lg md:text-xl font-arabic font-bold text-primary-blue">{t('cart')} ({getTotalItems()})</h2>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                            <X className="h-4 w-4 md:h-5 md:w-5 text-primary-gray" />
                        </button>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto p-4 md:p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-arabic font-bold text-gray-700 mb-2">{t('emptyCart')}</h3>
                            <p className="font-arabic text-gray-500 text-sm max-w-xs">{t('emptyCartMessage')}</p>
                            <button onClick={() => setIsCartOpen(false)} className="mt-6 bg-primary-blue text-white px-8 py-2.5 rounded-lg hover:bg-primary-sky-blue transition-colors duration-300 font-arabic">
                                {t('continueShopping')}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => <CartItem key={item.id} item={item} />)}
                        </div>
                    )}
                </main>

                {items.length > 0 && (
                    <footer className="flex-shrink-0 p-4 md:p-6 border-t border-gray-200 bg-white">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between font-arabic text-primary-gray text-sm">
                                <span className="font-semibold">{t('total_items')}</span>
                                <span className="font-bold">{getTotalItems()} {t('products')}</span>
                            </div>
                            

                            {/* --- بداية قسم التعديلات المطلوبة --- */}
                            <button
                                onClick={handleRequestQuote}
                                // تم تعديل كلاسات الزر هنا
                                className={`w-full py-3 rounded-lg text-white font-bold flex items-center justify-center text-base transition-all duration-300 ${
                                    copyState === 'success' ? 'bg-green-500' : 
                                    copyState === 'error' ? 'bg-red-500' : 
                                    'bg-primary-blue hover:bg-green-600' // لون واتساب عند الـ hover
                                }`}
                            >
                                {renderQuoteButtonContent()}
                            </button>
                            
                            <button 
                                onClick={handleClearCart}
                                // تم تعديل كلاسات الزر هنا
                                className="w-full py-2.5 rounded-lg border border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors duration-300 font-arabic text-sm"
                            >
                                {t('clear_cart')}
                            </button>
                            {/* --- نهاية قسم التعديلات المطلوبة --- */}

                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;