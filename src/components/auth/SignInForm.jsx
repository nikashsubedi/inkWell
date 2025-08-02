// components/SignInForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ toggleMode }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const result = await signIn(data.username, data.password);
    if (!result.success) {
      setError('username', { type: 'manual', message: result.message });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Username"
          {...register('username')}
          className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-primary"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-primary"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Sign in
      </button>
      <p className="text-sm text-center">
        Don’t have an account?{' '}
        <span onClick={toggleMode} className="text-blue-600 cursor-pointer">Sign up here</span>
      </p>
    </form>
  );
};

export default SignInForm;
