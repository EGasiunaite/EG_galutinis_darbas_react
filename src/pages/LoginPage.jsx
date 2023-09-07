import GoogleLogin from '../components/auth/GoogleLogin';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <h1>Login here</h1>
      <LoginForm />
      <GoogleLogin />
    </div>
  );
}