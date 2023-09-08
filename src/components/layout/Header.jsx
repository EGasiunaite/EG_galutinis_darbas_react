import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';

function OneLink(props) {
    return (
      <NavLink
        onClick={props.onClick}
        className={'text-lg px-3 py-2 hover:bg-slate-200'}
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
        toast.success('Atsijungete');
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
      <header className='container flex justify-between items-center '>
        <Link className='text-2xl' to={'/'}>
        <strong>Super SHOP</strong>
        </Link>
        <nav>
          {ctx.isUserLoggedIn && (
            <>
              <OneLink to={'/shops'} title={'Shops'} />
              <OneLink to={'/addshop'} title={'Add shop'} />
            </>
          )}
          {ctx.isUserLoggedIn === false && (
            <OneLink to={'/login'} title={'Login'} />
          )}
          {ctx.isUserLoggedIn === false && (
            <OneLink to={'/register'} title={'Register'} />
          )}
          {ctx.isUserLoggedIn && (
            <OneLink onClick={logoutFire} to={'/login'} title={'Logout'} />
          )}
          {ctx.isUserLoggedIn && (
            <p className='inline-block text-lg px-3 py-2'>{ctx.email}</p>
          )}
        </nav>
      </header>
    );
  }