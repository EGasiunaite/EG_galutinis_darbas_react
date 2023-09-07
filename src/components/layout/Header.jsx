import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';

function OneLink(props) {
    return (
      <NavLink
        onClick={props.onClick}
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
      <header>
        <Link to={'/'}>
          Shops
        </Link>
        <nav>
          <OneLink to={'/'} title={'Shops'} />
          {ctx.isUserLoggedIn && (
            <>
              <OneLink to={'/Add-shop'} title={'Add shop'} />
            </>
          )}
          {ctx.isUserLoggedIn === false && (
            <OneLink to={'/login'} title={'Login'} />
          )}
          {ctx.isUserLoggedIn && (
            <OneLink onClick={logoutFire} to={'/login'} title={'Logout'} />
          )}
          {ctx.isUserLoggedIn && (
            <p>{ctx.email}</p>
          )}
        </nav>
      </header>
    );
  }