import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string; // e.g. 254700000000
  schoolName: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, schoolName }) => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    `Hello ${schoolName} Admissions Team, I would like to enquire about admission vacancies and school tours for my child.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400"
      aria-label={`Chat with ${schoolName} Admissions on WhatsApp`}
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="hidden sm:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-semibold whitespace-nowrap pr-1">
        Chat with Admissions
      </span>
    </a>
  );
};
