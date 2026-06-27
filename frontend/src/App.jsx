// import { Navigate, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import TemplesPage from './pages/TemplesPage';
// import TempleDetailsPage from './pages/TempleDetailsPage';
// import TravelPlannerPage from './pages/TravelPlannerPage';
// import ExplorePage from './pages/ExplorePage';
// import AboutPage from './pages/AboutPage';

// export default function App() {
//   return (
//     <div className="app-shell min-h-screen text-temple-ink">
//       <Navbar />
//       <main>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/temples" element={<TemplesPage />} />
//           <Route path="/temples/:templeId" element={<TempleDetailsPage />} />
//           <Route path="/planner" element={<TravelPlannerPage />} />
//           <Route path="/explore" element={<ExplorePage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TemplesPage from './pages/TemplesPage';
import TempleDetailsPage from './pages/TempleDetailsPage';
import TravelPlannerPage from './pages/TravelPlannerPage';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <div className="app-shell min-h-screen text-temple-ink">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/temples" element={<TemplesPage />} />
          <Route path="/temples/:templeId" element={<TempleDetailsPage />} />
          <Route path="/planner" element={<TravelPlannerPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
