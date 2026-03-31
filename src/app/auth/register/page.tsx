'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'; 
import AuthFormWrapper from '@/components/AuthFormWrapper';

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordValue = watch('password', '');

  useEffect(() => {
    const strength = Math.min(
      (passwordValue.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(passwordValue) ? 25 : 0) +
      (/[0-9]/.test(passwordValue) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(passwordValue) ? 25 : 0)
    );
    setPasswordStrength(strength);
  }, [passwordValue]);

  const onSubmit = (data: any) => {

    if (data.password !== data.confirmPassword) {
      toast.error('Password dan Konfirmasi Password tidak cocok!');
      return;
    }
    
    toast.success('Pendaftaran Berhasil!');
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {}
        <input 
          {...register('username', { required: true, minLength: 3, maxLength: 8 })} 
          placeholder="Username (3-8 Karakter)" 
          className="w-full p-2 border rounded text-black" 
        />
        
        {}
        <input 
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
          type="email" placeholder="Email" 
          className="w-full p-2 border rounded text-black" 
        />

        {}
        <input 
          {...register('phone', { required: true, minLength: 10, pattern: /^[0-9]+$/ })} 
          type="tel" placeholder="Nomor Telepon (Min 10 Digit Angka)" 
          className="w-full p-2 border rounded text-black" 
        />

        <div className="relative">
          <input
            {...register('password', { required: true, minLength: 8 })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (Min 8 Karakter)"
            className="w-full p-2 border rounded text-black"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {}
        <div className="space-y-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                passwordStrength <= 25 ? 'bg-red-500' : 
                passwordStrength <= 50 ? 'bg-orange-500' : 
                passwordStrength <= 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-500 text-right">Kekuatan Sandi: {passwordStrength}%</p>
        </div>

        <input
          {...register('confirmPassword', { required: true })}
          type="password"
          placeholder="Konfirmasi Password"
          className="w-full p-2 border rounded text-black"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
          Register
        </button>
      </form>
    </AuthFormWrapper>
  );
}