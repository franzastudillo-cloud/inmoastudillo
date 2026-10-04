import React, { useState, useEffect } from 'react';

interface SellerWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenValuation?: () => void;
}

export const SellerWelcomeModal: React.FC<SellerWelcomeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAdminHash, setIsAdminHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin';
    }
    return false;
  });

  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('inmo_astudillo_seller_prompt_seen') === 'true';
    }
    return false;
  });

  // Check hash on changes
  useEffect(() => {
    const handleHash = () => {
      setIsAdminHash(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleClose = () => {
    setDismissed(true);
    sessionStorage.setItem('inmo_astudillo_seller_prompt_seen', 'true');
    onClose();
  };

  // Do not render if not open, already dismissed in this session, or in admin panel
  if (!isOpen || dismissed || isAdminHash) {
    return null;
  }

  const waUrl = 'https://wa.me/593994773533?text=Hola,%20quiero%20vender%20mi%20propiedad';

  return (
    <aside
      aria-label="Aviso para propietarios"
      className="fixed bottom-4 left-4 z-40 max-w-[280px] sm:max-w-[320px] w-[calc(100vw-32px)] bg-gradient-to-br from-[#003816] via-[#004215] to-[#01280f] text-white rounded-2xl p-4 shadow-xl shadow-black/25 border border-amber-400/30 animate-in fade-in slide-in-from-bottom-4 duration-500 select-none"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 text-amber-300">
          <span className="material-symbols-outlined text-[17px]">real_estate_agent</span>
          <span className="text-[10px] font-black uppercase tracking-wider">
            Inmo Astudillo · Asesoría
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 -mt-1 -mr-1"
          aria-label="Cerrar aviso"
          title="Cerrar"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      {/* Title */}
      <h4 className="text-sm font-extrabold text-amber-300 leading-snug">
        ¿Quieres vender tu terreno o casa?
      </h4>

      {/* Single line description */}
      <p className="text-xs text-emerald-100/90 mt-1 leading-snug truncate">
        Te ayudamos con la publicación y los trámites.
      </p>

      {/* Green WhatsApp Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClose}
        className="mt-3 w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-md shadow-[#25D366]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
      >
        <span className="material-symbols-outlined text-[16px]">chat</span>
        <span>Escríbenos por WhatsApp</span>
      </a>
    </aside>
  );
};
