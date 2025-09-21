import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/authForm';
import { register } from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const { data } = await register(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      navigate('/');
    } catch (error) {
      console.error('Registrasi gagal:', error);
      alert('Nama user sudah digunakan atau data tidak valid.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Daftar Akun Baru
        </h2>
        <AuthForm isRegister onSubmit={handleRegister} />
        <p className="mt-6 text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;