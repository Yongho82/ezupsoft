
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LiveHtmlPage, LiveHtmlApp } from './pages/LiveHtmlPage';
import { LivePdfPage, LivePdfApp } from './pages/LivePdfPage';
import { CatchCapturePage } from './pages/CatchCapturePage';
import { SubmitPage } from './pages/SubmitPage';
import { ContactPage } from './pages/ContactPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// IMPORTANT: Replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; 

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Live HTML Studio Routes */}
                <Route path="/live-html" element={<LiveHtmlPage />} />
                <Route path="/live-html/app" element={<LiveHtmlApp />} />
                
                {/* Live PDF Tool Routes */}
                <Route path="/live-pdf" element={<LivePdfPage />} />
                <Route path="/live-pdf/app" element={<LivePdfApp />} />
                
                {/* Catch Capture Routes */}
                <Route path="/catch-capture" element={<CatchCapturePage />} />
                
                <Route path="/submit" element={<SubmitPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
