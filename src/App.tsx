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
import { ExportCatalogModal } from './components/ExportCatalogModal';
import { SocialBannerModal } from './components/SocialBannerModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { INITIAL_SOCIAL_BANNERS } from './data/socialBannersData';
import { SocialBanner } from './types';
import { HomeView } from './views/HomeView';
import { PortfolioView } from './views/PortfolioView';
import { ConveyancingView } from './views/ConveyancingView';
import { ContactView } from './views/ContactView';

// Versioning key to automatically purge legacy cache and load new properties
const CATALOG_SCHEMA_VERSION = '2026.10_puyo_cumanda_v5';

export default function App() {
  // Open directly on 'inicio' (Página de Inicio) by default
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as ViewType;
      if (['inicio', 'propiedades', 'tramites', 'contacto'].includes(hash)) {
        return hash;
      }
    }
    return 'inicio';
  });
  
  // Properties with robust localStorage persistence: user created properties are ALWAYS preserved
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('inmo_astudillo_properties');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check that it doesn't contain obsolete Madrid/Chamberí mock data
          const hasLegacy = parsed.some((p: Property) =>
            p.location?.includes('Chamberí') ||
            p.location?.includes('Moraleja') ||
            p.locationZone?.includes('Chamberí') ||
            p.locationZone?.includes('Moraleja')
          );
          if (!hasLegacy) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.error('Error reading saved properties:', e);
    }
    return PROPERTIES_DATA;
  });

  // Automatically save properties to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('inmo_astudillo_properties', JSON.stringify(properties));
      localStorage.setItem('inmo_astudillo_catalog_version', CATALOG_SCHEMA_VERSION);
    } catch (e) {
      console.error('Error auto-syncing properties:', e);
    }
  }, [properties]);

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
  const [isExportCatalogOpen, setIsExportCatalogOpen] = useState(false);

  // Social Property Banners state (Facebook & Instagram) with localStorage persistence
  const [socialBanners, setSocialBanners] = useState<SocialBanner[]>(() => {
    try {
      const saved = localStorage.getItem('inmo_astudillo_social_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Strictly user-created banners - no preconfigured dummy banners
          const userOnly = parsed.filter(b => !['banner-cumanda-fb', 'banner-esquinero-fb', 'banner-fatima-ig'].includes(b.id));
          return userOnly;
        }
      }
    } catch (e) {
      console.error('Error loading social banners:', e);
    }
    return [];
  });

  const [isSocialBannerModalOpen, setIsSocialBannerModalOpen] = useState(false);
  const [editingSocialBanner, setEditingSocialBanner] = useState<SocialBanner | null>(null);

  const handleSaveSocialBanner = (banner: SocialBanner, alsoAddToCatalog: boolean = true) => {
    // 1. Update social banners
    setSocialBanners((prev) => {
      const exists = prev.some((b) => b.id === banner.id);
      const updated = exists ? prev.map((b) => (b.id === banner.id ? banner : b)) : [banner, ...prev];
      try {
        localStorage.setItem('inmo_astudillo_social_banners', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving social banners:', e);
      }
      return updated;
    });

    // 2. Also register as a real Property in the main catalog
    if (alsoAddToCatalog) {
      setProperties((prev) => {
        const existingIndex = prev.findIndex((p) => p.title.toLowerCase().trim() === banner.title.toLowerCase().trim());
        const numericPrice = banner.price || (banner.priceFormatted ? parseInt(banner.priceFormatted.replace(/\D/g, '')) || 95000 : 95000);
        const newProperty: Property = {
          id: existingIndex >= 0 ? prev[existingIndex].id : Date.now(),
          title: banner.title,
          category: banner.title.toLowerCase().includes('terreno') || banner.title.toLowerCase().includes('lote') ? 'land' : 'residential',
          price: numericPrice,
          priceFormatted: banner.priceFormatted || `$${numericPrice.toLocaleString('en-US')} USD`,
          priceLabel: 'Venta Directa',
          location: banner.location || 'Puyo, Pastaza',
          locationZone: banner.locationZone || 'Puyo',
          address: banner.location || 'Puyo, Pastaza',
          shortDescription: banner.description || banner.title,
          description: (banner.description || banner.title) + ` Publicación oficial en ${banner.platform === 'facebook' ? 'Facebook' : 'Instagram'}: ${banner.postUrl}`,
          imageUrl: banner.imageUrl,
          fallbackGradient: 'from-emerald-950 via-slate-900 to-teal-950',
          photoCount: 1,
          badges: ['Publicación ' + (banner.platform === 'facebook' ? 'Facebook' : 'Instagram'), 'En Venta'],
          specs: {
            surface: banner.surface || 'Consultar m²',
            rooms: banner.rooms,
            bathrooms: banner.bathrooms,
            parking: banner.parking
          },
          highlights: [
            banner.description || banner.title,
            'Estudio de títulos y blindaje notarial en Pastaza',
            'Enlace directo a la publicación en redes: ' + banner.postUrl
          ],
          legalCertified: true,
          featured: true
        };

        let updatedProps: Property[];
        if (existingIndex >= 0) {
          updatedProps = [...prev];
          updatedProps[existingIndex] = newProperty;
        } else {
          updatedProps = [newProperty, ...prev];
        }

        try {
          localStorage.setItem('inmo_astudillo_properties', JSON.stringify(updatedProps));
        } catch (e) {
          console.error(e);
        }
        return updatedProps;
      });
    }
  };

  const handleDeleteSocialBanner = (bannerId: string) => {
    // Find banner to check title
    const bannerToDelete = socialBanners.find((b) => b.id === bannerId);

    // 1. Remove from banners
    setSocialBanners((prev) => {
      const updated = prev.filter((b) => b.id !== bannerId);
      try {
        localStorage.setItem('inmo_astudillo_social_banners', JSON.stringify(updated));
      } catch (e) {
        console.error('Error deleting social banner:', e);
      }
      return updated;
    });

    // 2. Also remove matching property from properties catalog if created
    if (bannerToDelete) {
      setProperties((prev) => {
        const updated = prev.filter((p) => p.title.toLowerCase().trim() !== bannerToDelete.title.toLowerCase().trim());
        try {
          localStorage.setItem('inmo_astudillo_properties', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }
  };

  const handleResetSocialBanners = () => {
    try {
      localStorage.setItem('inmo_astudillo_social_banners', JSON.stringify(INITIAL_SOCIAL_BANNERS));
    } catch (e) {
      console.error(e);
    }
    setSocialBanners(INITIAL_SOCIAL_BANNERS);
  };

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

  // Reset properties to official Puyo Pastaza catalog
  const handleResetProperties = () => {
    if (window.confirm('¿Deseas restablecer el catálogo oficial de Puyo y Pastaza con sus datos y fotos certificadas?')) {
      try {
        localStorage.setItem('inmo_astudillo_catalog_version', CATALOG_SCHEMA_VERSION);
        localStorage.setItem('inmo_astudillo_properties', JSON.stringify(PROPERTIES_DATA));
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
        localStorage.setItem('inmo_astudillo_catalog_version', CATALOG_SCHEMA_VERSION);
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
        localStorage.setItem('inmo_astudillo_catalog_version', CATALOG_SCHEMA_VERSION);
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

  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRequestDeleteProperty = (property: Property) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (property: Property) => {
    setProperties((prev) => {
      const updated = prev.filter((p) => p.id !== property.id);
      try {
        localStorage.setItem('inmo_astudillo_properties', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving properties after delete:', e);
      }
      return updated;
    });

    // Also remove from social banners if matching
    setSocialBanners((prev) => {
      const updated = prev.filter(
        (b) => b.title.toLowerCase().trim() !== property.title.toLowerCase().trim()
      );
      try {
        localStorage.setItem('inmo_astudillo_social_banners', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    setPropertyToDelete(null);
    setIsDeleteModalOpen(false);
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
            onDeleteProperty={handleRequestDeleteProperty}
            onAddNewProperty={handleAddNewProperty}
            onQuickView={handleOpenQuickView}
            onScheduleVisit={handleScheduleVisit}
            onNavigate={handleNavigate}
            onOpenValuation={() => setIsValuationOpen(true)}
            socialBanners={socialBanners}
            onOpenAddSocialBanner={() => {
              setEditingSocialBanner(null);
              setIsSocialBannerModalOpen(true);
            }}
            onEditSocialBanner={(banner) => {
              setEditingSocialBanner(banner);
              setIsSocialBannerModalOpen(true);
            }}
            onDeleteSocialBanner={handleDeleteSocialBanner}
            onResetSocialBanners={handleResetSocialBanners}
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
            onDeleteProperty={handleRequestDeleteProperty}
            onAddNewProperty={handleAddNewProperty}
            onOpenExportCatalog={() => setIsExportCatalogOpen(true)}
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

      {/* Export & GitHub Sync Modal */}
      <ExportCatalogModal
        isOpen={isExportCatalogOpen}
        onClose={() => setIsExportCatalogOpen(false)}
        properties={properties}
        onResetOfficial={handleResetProperties}
      />

      {/* Social Property Banner Modal (Facebook & Instagram) */}
      <SocialBannerModal
        isOpen={isSocialBannerModalOpen}
        onClose={() => {
          setIsSocialBannerModalOpen(false);
          setEditingSocialBanner(null);
        }}
        onSaveBanner={handleSaveSocialBanner}
        bannerToEdit={editingSocialBanner}
      />

      {/* Delete Confirmation In-App Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        property={propertyToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPropertyToDelete(null);
        }}
        onConfirmDelete={handleConfirmDelete}
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
