import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// 컴포넌트 임포트
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'

// 페이지 컴포넌트 (지연 로딩)
const HomePage = React.lazy(() => import('./pages/HomePage'))
const AnalysisPage = React.lazy(() => import('./pages/AnalysisPage'))
const ResultPage = React.lazy(() => import('./pages/ResultPage'))
const TermsPage = React.lazy(() => import('./pages/TermsPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// 페이지 래퍼 컴포넌트
const PageWrapper = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        className="min-h-screen flex flex-col"
      >
        <Header />
        <main className="flex-1 pt-16">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <LoadingSpinner size="large" />
            </div>
          }>
            {children}
          </Suspense>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PageWrapper>
            <HomePage />
          </PageWrapper>
        } />
        <Route path="/analysis" element={
          <PageWrapper>
            <AnalysisPage />
          </PageWrapper>
        } />
        <Route path="/result" element={
          <PageWrapper>
            <ResultPage />
          </PageWrapper>
        } />
        <Route path="/about" element={
          <PageWrapper>
            <AboutPage />
          </PageWrapper>
        } />
        <Route path="/terms" element={
          <PageWrapper>
            <TermsPage />
          </PageWrapper>
        } />
        <Route path="*" element={
          <PageWrapper>
            <NotFoundPage />
          </PageWrapper>
        } />
      </Routes>
    </div>
  );
}

export default App