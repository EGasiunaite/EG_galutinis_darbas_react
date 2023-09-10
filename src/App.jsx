import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Header from './components/layout/Header';
import AddShopPage from './pages/AddShopPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import ShopsPage from './pages/ShopsPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/layout/Footer';
import SingleShopPage from './pages/SingleShopPage';

export default function App() {
  const ctx = useAuth();
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/shop/:shopId' element={<SingleShopPage />} />
        <Route path='/addshop' element={<AddShopPage />} />
        <Route path='shops' element={<ShopsPage />} />
        {!ctx.isUserLoggedIn && <Route path='/login' element={<LoginPage />} />}
        {!ctx.isUserLoggedIn && <Route path='/register' element={<RegisterPage />} />}
        <Route
          path='*'
          element={
          <div className="text-center mt-20">
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <p className="mt-4 text-xl">Page not found</p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
