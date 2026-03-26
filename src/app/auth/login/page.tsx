'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthFromWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const onSubmit = (data: any) => {
    if (captchaInput !== captcha) {
      toast.error('Captcha tidak sesuai!');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    toast.success('Login Berhasil!');
    router.push('/home');
  };

  return (
    <AuthFromWrapper title="Log In">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('email', { required: 'Email wajib diisi' })}
            type="email"
            placeholder="Email"
            className="input-field text-black"
          />
          {errors.email && <p className="error-message">{String(errors.email.message)}</p>}
        </div>
        <div>
          <input
            {...register('password', { required: 'Password wajib diisi' })}
            type="password"
            placeholder="Password"
            className="input-field text-black"
          />
          {errors.password && <p className="error-message">{String(errors.password.message)}</p>}
        </div>

        {}
        <div className="flex items-center space-x-3">
          <div className="bg-[#E5E7EB] px-4 py-2 rounded font-mono font-bold tracking-[0.3em] text-xl italic select-none text-black border border-gray-300">
            {captcha}
          </div>
          <button 
            type="button" 
            onClick={generateCaptcha} 
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Refresh
          </button>
        </div>

        <input
          type="text"
          placeholder="Masukkan Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          className="input-field text-black"
          required
        />

        {}
        <button 
          type="submit" 
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3 rounded-lg transition-colors shadow-md mt-2"
        >
          Sign In
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Belum punya akun?{' '}
          <button onClick={() => router.push('/auth/register')} className="text-blue-600 hover:underline font-medium">
            Daftar
          </button>
        </p>
      </div>
      <SocialAuth />
    </AuthFromWrapper>
  );
}