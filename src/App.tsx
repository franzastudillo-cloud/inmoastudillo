import React, { useState, useEffect } from 'react';
import { ViewType, Property } from './types';
import { listarPropiedades } from './lib/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PropertyQuickViewModal } from './components/PropertyQuickViewModal';
import { AppointmentModal } from './components/AppointmentModal';
import { ValuationModal } from './components/ValuationModal';
import { SeoStrategyModal } from './components/SeoStrategyModal';
import { SellerWelcomeModal } from './components/SellerWelcomeModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomeView } from './views/HomeView';
import { PortfolioView } from './views/PortfolioView';
import { ConveyancingView } from './views/ConveyancingView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

export default function App() {
  // Navigation state (supports #admin and direct hash changes)
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      if (window.location.hash === '#admin') return 'admin';
      const hash = window.location.hash.replace('#', '') as ViewType;
      if (['inicio', 'propiedades', 'tramites', 'contacto', 'admin'].includes(hash)) {
        return hash;
      }
    }
    return 'inicio';
  });

  // Real properties from Cloudflare D1 Backend (no sample data, no localStorage)
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        const hash = window.location.hash.replace('#', '') as ViewType;
        if (['inicio', 'propiedades', 'tramites', 'contacto', 'admin'].includes(hash)) {
          setCurrentView(hash);
        }
      }
    };

    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  // Fetch live properties from Cloudflare D1 backend
  useEffect(() => {
    listarPropiedades()
      .then((data) => {
        if (Array.isArray(data)) setProperties(data);
      })
      .catch((e) => {
        console.warn('API /api/propiedades no disponible en previsualización local:', e);
      });
  }, [currentView]);

  // Modals state
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [appointmentProperty, setAppointmentProperty] = useState<Property | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [isSeoStrategyOpen, setIsSeoStrategyOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  // Floating welcome modal for sellers: auto-prompt after 1.8s
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('inmo_astudillo_seller_prompt_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsSellerModalOpen(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseSellerModal = () => {
    setIsSellerModalOpen(false);
    sessionStorage.setItem('inmo_astudillo_seller_prompt_seen', 'true');
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickView = (property: Property) => {
    setQuickViewProperty(property);
  };

  const handleScheduleVisit = (property: Property) => {
    setAppointmentProperty(property);
    setIsAppointmentOpen(true);
  };

  const handleOpenGeneralAppointment = () => {
    setAppointmentProperty(null);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-[#191c1b] selection:bg-[#caead8] selection:text-[#004215]">
      {/* Navigation Header (hidden when on admin view for focused screen) */}
      {currentView !== 'admin' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenValuation={() => setIsValuationOpen(true)}
          onOpenSellerModal={() => setIsSellerModalOpen(true)}
          onToggleAdmin={() => handleNavigate('admin')}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {currentView === 'inicio' && (
          <HomeView
            properties={properties}
            onQuickView={handleOpenQuickView}
            onScheduleVisit={handleScheduleVisit}
            onNavigate={handleNavigate}
            onOpenValuation={() => setIsValuationOpen(true)}
          />
        )}

        {currentView === 'propiedades' && (
          <PortfolioView
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenGeneralAppointment}
          />
        )}

        {currentView === 'tramites' && (
          <ConveyancingView
            onOpenAppointmentModal={handleOpenGeneralAppointment}
          />
        )}

        {currentView === 'contacto' && (
          <ContactView />
        )}

        {currentView === 'admin' && (
          <AdminView onBackToHome={() => handleNavigate('inicio')} />
        )}
      </main>

      {/* Global Property Detail Modal */}
      <PropertyQuickViewModal
        property={quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        onScheduleVisit={handleScheduleVisit}
      />

      {/* Global Visit & Valuation Schedule Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        selectedProperty={appointmentProperty}
      />

      {/* Global Online Valuation Estimator Modal */}
      <ValuationModal
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />

      {/* Global Local SEO Strategy Transparency Modal */}
      <SeoStrategyModal
        isOpen={isSeoStrategyOpen}
        onClose={() => setIsSeoStrategyOpen(false)}
      />

      {/* Floating Welcome Entry Modal for Sellers */}
      <SellerWelcomeModal
        isOpen={isSellerModalOpen}
        onClose={handleCloseSellerModal}
        onOpenValuation={() => setIsValuationOpen(true)}
      />

      {/* Floating Instant WhatsApp Button */}
      {currentView !== 'admin' && <WhatsAppFloatingButton />}

      {/* Comprehensive Corporate Footer */}
      {currentView !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenValuation={() => setIsValuationOpen(true)}
          onOpenSeoStrategy={() => setIsSeoStrategyOpen(true)}
          onToggleAdmin={() => handleNavigate('admin')}
        />
      )}
    </div>
  );
}
