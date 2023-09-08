import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
        console.log('user login ok ===', user);
        navigate('/shops', { replace: true });
      })
      .catch((error) => {
        toast.error('Nepavyko prisijungti, patikrinkite email arba password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      });
  }

  return (
    <div className='max-w-xs mx-auto'>
    <form onSubmit={formik.handleSubmit}>
        <div className='mb-2'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className='border border-slate-500 px-4 py-2 w-full rounded-md'
            type='text'
            id='email'
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-md text-red-500 '>{formik.errors.email}</p>
          )}
        </div>
        <div className='mb-2'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className='border border-slate-500 px-4 py-2 w-full rounded-md'
            type='password'
            id='password'
            placeholder='Password'
          />
          {formik.errors.password && formik.touched.password && (
            <p className='text-md text-red-500'>{formik.errors.password}</p>
          )}
        </div>
        <button
        className='bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md w-full' type='submit'>
        
          Prisijungti
        </button>
      </form>
    </div>
  );
}