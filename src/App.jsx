import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TenantOnboardingPage from './pages/TenantOnboardingPage/TenantOnboardingPage';

function HomeLayout() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/create-site" element={<TenantOnboardingPage />} />
    </Routes>
  );
}

export default App;
