// components/SignUpForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUpForm = ({ toggleMode }) => {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await signUp(data.username, data.email, data.password);

    // Save user data to localStorage
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    localStorage.setItem('authUser', JSON.stringify(userData));

    // Optional: switch to sign-in mode after registration
    toggleMode();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 space-x-0.5   ">
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
          type="email"
          placeholder="Email"
          {...register('email')}
          className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-primary"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
          className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-primary"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-primary bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
      >
        Sign up
      </button>
      <p className="text-sm text-center">
        Already have an account?{' '}
        <span onClick={toggleMode} className="text-blue-600 cursor-pointer">Sign in here</span>
      </p>
    </form>
  );
};

export default SignUpForm;
