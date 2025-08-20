import React, { Suspense } from 'react';
import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';

const MyPage = React.lazy(() => import('./pages/myPage/index'));
const MyRecord = React.lazy(() => import('./pages/myRecord/index'));
const MyColumn = React.lazy(() => import('./pages/myColumn/index'));

const NotFound: FC = () => <h1>404 - Page Not Found</h1>;

const App: FC = () => {
  return (
    <div id="container-main-page">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<MyPage />} />
            <Route path="/my-record" element={<MyRecord />} />
            <Route path="/my-column" element={<MyColumn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
