import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

const FloatingActions = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons - Show when expanded */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917000849679"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 group"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:block font-medium">WhatsApp</span>
        </a>

        {/* Call Button */}
        <a
          href="tel:+917000849679"
          className="flex items-center gap-3 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 group"
        >
          <Phone size={20} />
          <span className="hidden sm:block font-medium">Call Now</span>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleExpanded}
        className={`w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center glow-cyan ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isExpanded ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={toggleExpanded}
        />
      )}
    </div>
  );
};

export default FloatingActions;