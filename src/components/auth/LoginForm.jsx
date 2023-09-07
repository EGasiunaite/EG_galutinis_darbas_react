import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: 'e@g.lt',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(50).required(),
    }),
    onSubmit: (values) => {
      console.log('kas ivesta ===', values);
      loginWithFire(values.email, values.password);
    },
  });

  function loginWithFire(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Sekmingai uzsiregistravote');
        // Signed in
        const user = userCredential.user;
        // ...

      })
      .catch((error) => {
        toast.error('Nepavyko prisijungti, patikrinkite email arba password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      });
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} >
        <div >
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='text'
            id='email'
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email && (
            <p>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            id='password'
            placeholder='Password'
          />
          {formik.errors.password && formik.touched.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <button
          type='submit'
        >
          Prisijungti
        </button>
      </form>
    </div>
  );
}