import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/authForm';
import { login } from '../api';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      navigate('/');
    } catch (error) {
      console.error('Login gagal:', error);
      alert('Nama atau password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Masuk
        </h2>
        <AuthForm onSubmit={handleLogin} />
        <p className="mt-6 text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;