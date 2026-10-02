import React, { useState, useEffect } from 'react';
import { ViewType, Property } from './types';
import { PROPERTIES_DATA } from './data/propertiesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PropertyQuickViewModal } from './components/PropertyQuickViewModal';
import { AppointmentModal } from './components/AppointmentModal';
import { ValuationModal } from './components/ValuationModal';
import { SeoStrategyModal } from './components/SeoStrategyModal';
import { ChangeImageModal } from './components/ChangeImageModal';
import { PhotoSecurityGuideModal } from './components/PhotoSecurityGuideModal';
import { EditPropertyModal } from './components/EditPropertyModal';
import { SellerWelcomeModal } from './components/SellerWelcomeModal';
import { AdminSecurityModal } from './components/AdminSecurityModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomeView } from './views/HomeView';
import { PortfolioView } from './views/PortfolioView';
import { ConveyancingView } from './views/ConveyancingView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('propiedades'); // Default to portfolio as requested in user stitch snapshot
  
  // Properties with localStorage persistence
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('inmo_astudillo_properties');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved properties:', e);
    }
    return PROPERTIES_DATA;
  });

  // Admin Mode state: defaults to false (PROTECTED) so that on the public network (Cloudflare, etc.) the site cannot be edited without authorization
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const savedAdmin = localStorage.getItem('inmo_astudillo_admin_mode');
      if (savedAdmin !== null) return savedAdmin === 'true';
    } catch (e) {
      console.error('Error loading admin state:', e);
    }
    return false; // PROTECTED by default
  });

  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [appointmentProperty, setAppointmentProperty] = useState<Property | null>(null);
  const [imageEditProperty, setImageEditProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [isSeoStrategyOpen, setIsSeoStrategyOpen] = useState(false);
  const [isPhotoSecurityOpen, setIsPhotoSecurityOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  // Floating welcome modal for sellers: opens automatically upon entry after 1.8s
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('inmo_astudillo_seller_modal_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsSellerModalOpen(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Error reading seller modal status:', e);
    }
  }, []);

  const handleCloseSellerModal = () => {
    setIsSellerModalOpen(false);
    try {
      sessionStorage.setItem('inmo_astudillo_seller_modal_dismissed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle admin state with security password protection
  const handleToggleAdmin = () => {
    if (isAdmin) {
      // If currently unlocked, lock immediately to protect against network edits
      setIsAdmin(false);
      try {
        localStorage.setItem('inmo_astudillo_admin_mode', 'false');
      } catch (e) {
        console.error(e);
      }
    } else {
      // If locked, request security password
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem('inmo_astudillo_admin_mode', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  // Reset properties to factory defaults
  const handleResetProperties = () => {
    if (window.confirm('¿Deseas restablecer las fotos y datos originales de las propiedades?')) {
      try {
        localStorage.removeItem('inmo_astudillo_properties');
      } catch (e) {
        console.error(e);
      }
      setProperties(PROPERTIES_DATA);
    }
  };

  // Scroll to top on navigation change
  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
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

  // Update property image handler with persistence
  const handleUpdatePropertyImage = (propertyId: number, newImageUrl: string) => {
    setProperties((prev) => {
      const updated = prev.map((item) =>
        item.id === propertyId ? { ...item, imageUrl: newImageUrl } : item
      );
      try {
        localStorage.setItem('inmo_astudillo_properties', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving properties to localStorage:', e);
      }
      return updated;
    });
  };

  // Save updated property (title, price, rooms, bathrooms, surface/meters, description, etc.)
  const handleSaveProperty = (updatedProperty: Property) => {
    setProperties((prev) => {
      const exists = prev.some((p) => p.id === updatedProperty.id);
      const updated = exists
        ? prev.map((item) => (item.id === updatedProperty.id ? updatedProperty : item))
        : [updatedProperty, ...prev];
      try {
        localStorage.setItem('inmo_astudillo_properties', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving properties to localStorage:', e);
      }
      return updated;
    });
  };

  // Create brand new property
  const handleAddNewProperty = () => {
    const newId = Math.max(0, ...properties.map((p) => p.id)) + 1;
    const newProperty: Property = {
      id: newId,
      title: 'Nueva Propiedad en Puyo / Pastaza',
      category: 'residential',
      price: 95000,
      priceFormatted: '$95,000 USD',
      priceLabel: 'Precio Venta',
      location: 'Puyo, Pastaza',
      locationZone: 'Pastaza',
      address: 'Sector Central, Puyo',
      description: 'Inmueble con acabados de calidad, excelente ubicación e iluminación natural. Lista para entrega y traspaso inmediato en notaría.',
      shortDescription: 'Excelente propiedad con garantía legal y plusvalía asegurada.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      fallbackGradient: 'from-emerald-900 to-green-700',
      photoCount: 1,
      badges: ['Nueva', 'En Venta', 'Escritura Inmediata'],
      specs: {
        surface: '220 m²',
        rooms: '3',
        bathrooms: '2',
        parking: '1',
      },
      highlights: [
        'Escritura pública libre de gravamen',
        'Todos los servicios básicos activos',
        'Alta plusvalía y sector residencial seguro',
      ],
      legalCertified: true,
      featured: true,
    };
    setEditingProperty(newProperty);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-[#191c1b] selection:bg-[#caead8] selection:text-[#004215]">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenValuation={() => setIsValuationOpen(true)}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenPhotoSecurity={() => setIsPhotoSecurityOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {currentView === 'inicio' && (
          <HomeView
            properties={properties}
            isAdmin={isAdmin}
            onChangePropertyImage={(prop) => setImageEditProperty(prop)}
            onEditProperty={(prop) => setEditingProperty(prop)}
            onAddNewProperty={handleAddNewProperty}
            onQuickView={handleOpenQuickView}
            onScheduleVisit={handleScheduleVisit}
            onNavigate={handleNavigate}
            onOpenValuation={() => setIsValuationOpen(true)}
          />
        )}

        {currentView === 'propiedades' && (
          <PortfolioView
            properties={properties}
            isAdmin={isAdmin}
            onToggleAdmin={handleToggleAdmin}
            onOpenPhotoSecurityModal={() => setIsPhotoSecurityOpen(true)}
            onResetProperties={handleResetProperties}
            onQuickView={handleOpenQuickView}
            onScheduleVisit={handleScheduleVisit}
            onOpenAppointmentModal={handleOpenGeneralAppointment}
            onNavigate={handleNavigate}
            onChangePropertyImage={(prop) => setImageEditProperty(prop)}
            onEditProperty={(prop) => setEditingProperty(prop)}
            onAddNewProperty={handleAddNewProperty}
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
      </main>

      {/* Global Quick View Modal */}
      <PropertyQuickViewModal
        property={quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        onScheduleVisit={handleScheduleVisit}
        onEditProperty={(prop) => setEditingProperty(prop)}
      />

      {/* Global Schedule Visit / Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        selectedProperty={appointmentProperty}
      />

      {/* Global Free Valuation Request Modal */}
      <ValuationModal
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />

      {/* Global SEO Strategy & Ecuador Keywords Modal */}
      <SeoStrategyModal
        isOpen={isSeoStrategyOpen}
        onClose={() => setIsSeoStrategyOpen(false)}
      />

      {/* Global Photo Security & Guide Modal */}
      <PhotoSecurityGuideModal
        isOpen={isPhotoSecurityOpen}
        onClose={() => setIsPhotoSecurityOpen(false)}
        isAdmin={isAdmin}
        onEnableAdmin={handleToggleAdmin}
      />

      {/* Global Change Image Modal */}
      <ChangeImageModal
        isOpen={!!imageEditProperty}
        onClose={() => setImageEditProperty(null)}
        property={imageEditProperty}
        onUpdateImage={handleUpdatePropertyImage}
      />

      {/* Global Comprehensive Edit Property Modal (Textos, Precios, Habitaciones, Metros, Fotos) */}
      <EditPropertyModal
        isOpen={!!editingProperty}
        onClose={() => setEditingProperty(null)}
        property={editingProperty}
        onSaveProperty={handleSaveProperty}
      />

      {/* Floating Welcome Entry Modal for Sellers (Marketing Inmobiliario) */}
      <SellerWelcomeModal
        isOpen={isSellerModalOpen}
        onClose={handleCloseSellerModal}
        onOpenValuation={() => setIsValuationOpen(true)}
      />

      {/* Admin Security Password Modal (Protección en la red) */}
      <AdminSecurityModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Floating Launcher Pill: ¿Quieres vender tu propiedad? */}
      {!isSellerModalOpen && (
        <button
          onClick={() => setIsSellerModalOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-white/95 hover:bg-white text-slate-800 hover:text-emerald-950 border border-amber-200/90 hover:border-amber-400 px-3.5 py-2.5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group cursor-pointer active:scale-95 backdrop-blur-md"
          title="¿Quieres que te ayudemos a vender tu propiedad? Haz clic aquí"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[19px]">real_estate_agent</span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 leading-none">
                Para Propietarios
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 leading-tight">
              ¿Quieres vender tu propiedad?
            </span>
          </div>
        </button>
      )}

      {/* Floating Instant WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* Comprehensive Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenValuation={() => setIsValuationOpen(true)}
        onOpenSeoStrategy={() => setIsSeoStrategyOpen(true)}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenPhotoSecurity={() => setIsPhotoSecurityOpen(true)}
      />
    </div>
  );
}
