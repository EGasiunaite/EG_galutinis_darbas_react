import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Header from './components/layout/Header';
import AddShopPage from './pages/AddShopPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import ShopsPage from './pages/ShopsPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const ctx = useAuth();
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/addshop' element={<AddShopPage />} />
        <Route path='shops' element={<ShopsPage />} />
        {!ctx.isUserLoggedIn && <Route path='/login' element={<LoginPage />} />}
        {!ctx.isUserLoggedIn && <Route path='/register' element={<RegisterPage />} />}
        <Route
          path='*'
          element={
            <div>
              <h1>404</h1>
              <p>page not found</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
