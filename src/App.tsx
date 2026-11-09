/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SchoolConfig, NewsArticle, GalleryItem, EducationLevelId } from './types';
import { storage, INITIAL_GALLERY } from './services/storage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ImageLightbox } from './components/common/ImageLightbox';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { GalleryPage } from './pages/GalleryPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [tabContext, setTabContext] = useState<any>(null);

  // School configuration
  const [config, setConfig] = useState<SchoolConfig>(() => storage.getConfig());

  // Gallery items and lightbox state
  const [galleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // News items and article modal state
  const [newsItems] = useState<NewsArticle[]>(() => storage.getNews());
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Sync title and config
  useEffect(() => {
    document.title = `${config.schoolName} | Admissions, Academics and School Life in Kenya`;
  }, [config.schoolName]);

  const handleNavigate = (tab: string, context?: any) => {
    setCurrentTab(tab);
    setTabContext(context || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGalleryItem = (index: number) => {
    setLightboxIndex(index);
  };

  const handleOpenArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    if (currentTab !== 'news') {
      setCurrentTab('news');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Primary Top Bar & Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        config={config}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            config={config}
            onNavigate={handleNavigate}
            onOpenGalleryItem={handleOpenGalleryItem}
            galleryItems={galleryItems}
            newsItems={newsItems}
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage config={config} onNavigate={handleNavigate} />
        )}

        {currentTab === 'academics' && (
          <AcademicsPage
            config={config}
            onNavigate={handleNavigate}
            initialLevel={tabContext?.level as EducationLevelId}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage config={config} onNavigate={handleNavigate} />
        )}

        {currentTab === 'admissions' && (
          <AdmissionsPage
            config={config}
            onNavigate={handleNavigate}
            initialLevel={tabContext?.level as EducationLevelId}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryPage
            config={config}
            items={galleryItems}
            onOpenLightbox={handleOpenGalleryItem}
          />
        )}

        {currentTab === 'news' && (
          <NewsPage
            config={config}
            articles={newsItems}
            selectedArticle={selectedArticle}
            onSelectArticle={setSelectedArticle}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage
            config={config}
            onNavigate={handleNavigate}
            initialSubject={tabContext?.subject}
          />
        )}

        {currentTab === 'privacy' && (
          <PrivacyPage config={config} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Primary Footer */}
      <Footer onNavigate={handleNavigate} config={config} />

      {/* Direct WhatsApp Admissions Enquiries Button */}
      <WhatsAppButton
        phoneNumber={config.whatsappNumber}
        schoolName={config.schoolName}
      />

      {/* Full-screen accessible Image Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          items={galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
