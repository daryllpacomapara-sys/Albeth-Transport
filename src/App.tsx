/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CityDetailPage } from './components/CityDetailPage';
import { ProvinceDetailPage } from './components/ProvinceDetailPage';
import { VehiclesPage } from './components/VehiclesPage';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { SearchPage } from './components/SearchPage';
import { BookPage } from './components/BookPage';
import { ContactPage } from './components/ContactPage';
import { SitemapPage } from './components/SitemapPage';
import { Footer } from './components/Footer';
import { WorkOsAuthModal } from './components/WorkOsAuthModal';
import { TripPlannerValues } from './components/TripPlannerForm';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>('tacloban-city');
  const [selectedProvinceSlug, setSelectedProvinceSlug] = useState<string>('leyte');
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState<string>('mitsubishi-mirage-g4-at');

  // Search criteria state
  const [searchCriteria, setSearchCriteria] = useState<TripPlannerValues>({
    pickupCity: 'tacloban-city',
    dropoffCity: 'tacloban-city',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    dropoffDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    pickupTime: '09:00',
    dropoffTime: '17:00',
    vehicleType: 'all',
    minSeats: 5,
    transmission: 'all',
    needDriver: false,
  });

  // User auth state (WorkOS AuthKit) - starts signed out (no auto sign-in)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedCitySlug, selectedProvinceSlug, selectedVehicleSlug]);

  const handleNavigate = (route: string) => {
    if (route.startsWith('/city/')) {
      const slug = route.replace('/city/', '');
      setSelectedCitySlug(slug);
      setCurrentRoute('/city');
    } else if (route.startsWith('/province/')) {
      const slug = route.replace('/province/', '');
      setSelectedProvinceSlug(slug);
      setCurrentRoute('/province');
    } else if (route.startsWith('/vehicles/')) {
      const slug = route.replace('/vehicles/', '');
      setSelectedVehicleSlug(slug);
      setCurrentRoute('/vehicle-detail');
    } else if (route === '/service-areas') {
      setCurrentRoute('/sitemap');
    } else {
      setCurrentRoute(route);
    }
  };

  const handleSearchSubmit = (values: TripPlannerValues) => {
    setSearchCriteria(values);
    setCurrentRoute('/search');
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sticky Header */}
      <Header
        activeRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        user={user}
        onSignOut={() => setUser(null)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            onSearch={handleSearchSubmit}
            onNavigate={handleNavigate}
            onSelectCity={(slug) => {
              setSelectedCitySlug(slug);
              setCurrentRoute('/city');
            }}
            onSelectProvince={(slug) => {
              setSelectedProvinceSlug(slug);
              setCurrentRoute('/province');
            }}
            onSelectVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/vehicle-detail');
            }}
            onBookVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/book');
            }}
          />
        )}

        {currentRoute === '/city' && (
          <CityDetailPage
            slug={selectedCitySlug}
            onNavigate={handleNavigate}
            onViewVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/vehicle-detail');
            }}
            onBookVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/book');
            }}
          />
        )}

        {currentRoute === '/province' && (
          <ProvinceDetailPage
            slug={selectedProvinceSlug}
            onNavigate={handleNavigate}
            onSelectCity={(slug) => {
              setSelectedCitySlug(slug);
              setCurrentRoute('/city');
            }}
            onViewVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/vehicle-detail');
            }}
            onBookVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/book');
            }}
          />
        )}

        {currentRoute === '/vehicles' && (
          <VehiclesPage
            onViewVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/vehicle-detail');
            }}
            onBookVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/book');
            }}
          />
        )}

        {currentRoute === '/vehicle-detail' && (
          <VehicleDetailPage
            slug={selectedVehicleSlug}
            onNavigate={handleNavigate}
            onBookNow={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/book');
            }}
          />
        )}

        {currentRoute === '/search' && (
          <SearchPage
            initialCriteria={searchCriteria}
            onModifySearch={() => setCurrentRoute('/')}
            onViewVehicle={(slug) => {
              setSelectedVehicleSlug(slug);
              setCurrentRoute('/vehicle-detail');
            }}
            onBookVehicle={(vehicleSlug, criteria) => {
              setSelectedVehicleSlug(vehicleSlug);
              setSearchCriteria(criteria);
              setCurrentRoute('/book');
            }}
          />
        )}

        {currentRoute === '/book' && (
          <BookPage
            prefilledVehicleSlug={selectedVehicleSlug}
            prefilledCriteria={searchCriteria}
            onNavigateHome={() => setCurrentRoute('/')}
          />
        )}

        {currentRoute === '/contact' && <ContactPage />}

        {currentRoute === '/sitemap' && <SitemapPage onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* WorkOS AuthKit Modal */}
      <WorkOsAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authModalMode}
        onSuccess={(newUser) => setUser(newUser)}
      />
      </div>
    </LanguageProvider>
  );
}
