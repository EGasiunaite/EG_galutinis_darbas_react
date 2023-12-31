import GoogleLogin from '../components/auth/GoogleLogin';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg text-center">
        <h1 className="text-3xl font-semibold mb-4">Login here</h1>
      <LoginForm />
      <GoogleLogin />
    </div>
    </div>
  );
}