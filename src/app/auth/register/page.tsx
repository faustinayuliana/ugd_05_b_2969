'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeOff, RefreshCcw } from 'lucide-react';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import AuthFormWrapper from '@/components/AuthFormWrapper';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [strength, setStrength] = useState(0);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaInput: ''
  });

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const result = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const pass = formData.password;
    const score = Math.min(
      (pass.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(pass) ? 25 : 0) +
      (/[0-9]/.test(pass) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(pass) ? 25 : 0),
      100
    );
    setStrength(score);
  }, [formData.password]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Konfirmasi password harus sama dengan password.");
    }

    if (formData.captchaInput !== captcha) {
      generateCaptcha();
      return toast.error("Captcha salah!");
    }
    toast.success("Registrasi Berhasil!");
    router.push('/auth/login');
  };

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-yellow-500';
    if (strength <= 75) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <AuthFormWrapper title="Sign Up">
      <form onSubmit={handleRegister} className="space-y-4">
        {}
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full p-2 border border-gray-300 rounded text-black outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />

        {}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded text-black outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />

        {}
        <div className="space-y-1 text-left">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              className="w-full p-2 border border-gray-300 rounded text-black outline-none focus:border-blue-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
              {showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
            </button>
          </div>
          {}
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1">
            <div className={`h-full transition-all duration-500 ${getStrengthColor()}`} style={{ width: `${strength}%` }}></div>
          </div>
          <p className="text-[10px] text-gray-500">Strength: {strength}%</p>
        </div>

        {}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Masukkan konfirmasi password"
            className="w-full p-2 border border-gray-300 rounded text-black outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-400">
            {showConfirmPassword ? <Eye size={18}/> : <EyeOff size={18}/>}
          </button>
        </div>

        {}
        <div className="space-y-2 text-left">
          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded border border-gray-200 w-fit">
            <span className="font-mono font-bold italic line-through tracking-widest text-black select-none px-2">{captcha}</span>
            <button type="button" onClick={generateCaptcha} className="text-blue-500"><RefreshCcw size={16} /></button>
          </div>
          <input
            type="text"
            placeholder="Masukan captcha"
            className="w-full p-2 border border-gray-300 rounded text-black outline-none focus:border-blue-500"
            onChange={(e) => setFormData({...formData, captchaInput: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-white transition-all shadow-md">
          Daftar
        </button>

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun? <span className="text-blue-500 cursor-pointer font-bold" onClick={() => router.push('/auth/login')}>Log In</span>
        </p>

        {}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase">Atau masuk dengan</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="flex justify-center space-x-6">
          <button type="button" className="p-2 bg-gray-50 rounded-full border border-gray-100 hover:shadow-sm"><FaGoogle className="text-red-500 text-xl"/></button>
          <button type="button" className="p-2 bg-gray-50 rounded-full border border-gray-100 hover:shadow-sm"><FaGithub className="text-black text-xl"/></button>
          <button type="button" className="p-2 bg-gray-50 rounded-full border border-gray-100 hover:shadow-sm"><FaFacebook className="text-blue-600 text-xl"/></button>
        </div>
      </form>
    </AuthFormWrapper>
  );
}