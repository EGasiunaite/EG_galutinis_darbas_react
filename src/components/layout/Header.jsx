import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import logo from './ozas.png';

function OneLink(props) {
    return (
      <NavLink
        onClick={props.onClick}
        className={'text-lg px-3 py-2 hover:text-red-500'}
        to={props.to}
      >
        {props.title}
      </NavLink>
    );
  }
  
  function logoutFire() {
    const auth = getAuth();
  
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('You have logged out');
      })
      .catch((error) => {
        // An error happened.
        console.log('error ===', error);
      });
  }

export default function Header() {
    const ctx = useAuth();
    console.log('ctx ===', ctx);
    return (
      <header className='bg-slate-800 text-white py-4'>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to={'/'}>
        <img src={logo} alt="Super SHOP Logo" className="h-12" />
        </Link>
        <nav className="flex space-x-3">
          {ctx.isUserLoggedIn && (
            <>
              <OneLink to={'/shops'} title={'Shops'} />
              <OneLink to={'/addshop'} title={'Add shop'} />
            </>
          )}
          {ctx.isUserLoggedIn === false && (
            <>
              <OneLink to={'/login'} title={'Login'} />
              <OneLink to={'/register'} title={'Register'} />
            </>
          )}
          {ctx.isUserLoggedIn && (
            <OneLink onClick={logoutFire} to={'/login'} title={'Logout'} />
          )}
          {/* {ctx.isUserLoggedIn && (
            <p className='inline-block text-lg px-3 py-2'>{ctx.email}</p>
          )} */}
        </nav>
        </div>
      </header>
    );
  }