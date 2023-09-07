import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  email: '',
  isUserLoggedIn: '',
  userUid: '',
});

AuthContext.displayName = 'Auth';

export default function AuthProvider(props) {
  const [fireUser, setFireUser] = useState({});

  const email = fireUser.email;
  const userUid = fireUser.uid;
  let isUserLoggedIn = !!email;
  isUserLoggedIn = email ? true : false;

  const ctx = {
    email: email,
    isUserLoggedIn: isUserLoggedIn,
    userUid: userUid,
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Pavyko prisijungti');
        setFireUser(user);
      } else {
        // User is signed out
        // ...
        console.log('Logout');
        setFireUser({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}