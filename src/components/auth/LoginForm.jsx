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
      console.log('what is entered ===', values);
      loginWithFire(values.email, values.password);
    },
  });

  function loginWithFire(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('You have successfully registered.');
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user login ok ===', user);
        navigate('/shops', { replace: true });
      })
      .catch((error) => {
        toast.error('Unable to log in, please check your email or password.');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      });
  }

  return (
    <div className='max-w-xl mx-auto'>
    <form onSubmit={formik.handleSubmit}>
        <div className='mb-2'>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className='border border-slate-500 px-4 py-2 xl:w-96 w-full rounded-md'
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
            className='border border-slate-500 px-4 py-2 xl:w-96 w-full rounded-md'
            type='password'
            id='password'
            placeholder='Password'
          />
          {formik.errors.password && formik.touched.password && (
            <p className='text-md text-red-500'>{formik.errors.password}</p>
          )}
        </div>
        <button
        className='bg-slate-800 hover:bg-slate-500 text-white px-6 py-3 xl:w-96 rounded-md w-full' type='submit'>
        
          Login
        </button>
      </form>
    </div>
  );
}