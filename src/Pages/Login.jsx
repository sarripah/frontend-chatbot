import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';
import { login } from '../services/authService';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      Swal.fire({
        title: 'Login Berhasil!',
        text: 'Selamat datang di dashboard admin.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      });
    } catch (error) {
      Swal.fire({
        title: 'Login Gagal!',
        text: error.message || 'Terjadi kesalahan saat login.',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="w-full px-4 py-2 border rounded mt-2"
            />
            {errors.username && (
              <div className="text-red-500 text-sm">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2 border rounded mt-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}