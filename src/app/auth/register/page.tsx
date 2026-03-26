'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthFromWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Registrasi Berhasil!');
    router.push('/auth/login');
  };

  return (
    <AuthFromWrapper title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('name', { required: 'Nama lengkap wajib diisi' })}
            type="text"
            placeholder="Nama Lengkap"
            className="input-field"
          />
          {errors.name && <p className="error-message">
            {String(errors.name.message)}</p>}
        </div>
        <div>
          <input
            {...register('email', { required: 'Email wajib diisi' })}
            type="email"
            placeholder="Email"
            className="input-field"
          />
          {errors.email && <p className="error-message">
            {String(errors.email.message)}</p>}
        </div>
        <div>
          <input
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: { value: 6, message: 'Minimal 6 karakter' }
            })}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          {errors.password && <p className="error-message">
            {String(errors.password.message)}</p>}
        </div>
        <button type="submit" className="start-btn w-full">
          Daftar
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Sudah punya akun?{' '}
          <button
            onClick={() => router.push('/auth/login')}
            className="text-blue-500 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
      <SocialAuth />
    </AuthFromWrapper>
  );
};

export default RegisterPage;