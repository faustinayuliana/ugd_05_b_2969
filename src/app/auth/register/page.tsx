'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeOff, RefreshCcw } from 'lucide-react';
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
    phone: '',
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
      (/[^A-Za-z0-9]/.test(pass) ? 25 : 0)
    );
    setStrength(score);
  }, [formData.password]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.username.length < 3 || formData.username.length > 8) {
      return toast.error("Username minimal 3 dan maksimal 8 karakter!");
    }
    if (formData.phone.length < 10 || !/^\d+$/.test(formData.phone)) {
      return toast.error("Nomor telepon minimal 10 angka!");
    }

    if (formData.password.length < 8) {
      return toast.error("Password minimal 8 karakter!");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Konfirmasi password tidak cocok!");
    }
    if (formData.captchaInput !== captcha) {
      generateCaptcha();
      return toast.error("Captcha salah!");
    }

    toast.success("Registrasi Berhasil! Silakan Login.");
    router.push('/auth/login');
  };

  const getStrengthColor = () => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username (3-8 Karakter)"
          className="w-full p-2 border rounded text-black"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded text-black"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />

        <input
          type="text"
          placeholder="Nomor Telepon (Min. 10 Angka)"
          className="w-full p-2 border rounded text-black"
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />

        {}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (Min. 8 Karakter)"
            className="w-full p-2 border rounded text-black"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">
            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
        </div>

        {}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
          <div className={`h-full transition-all duration-500 ${getStrengthColor()}`} style={{ width: `${strength}%` }}></div>
        </div>
        <p className="text-[10px] text-gray-500">Strength: {strength}%</p>

        {}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Konfirmasi Password"
            className="w-full p-2 border rounded text-black"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-500">
            {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
        </div>

        {}
        <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded border">
          <span className="font-mono font-bold italic line-through tracking-widest text-black select-none">{captcha}</span>
          <button type="button" onClick={generateCaptcha} className="text-blue-600"><RefreshCcw size={18} /></button>
        </div>

        <input
          type="text"
          placeholder="Masukkan Captcha"
          className="w-full p-2 border rounded text-black"
          onChange={(e) => setFormData({...formData, captchaInput: e.target.value})}
          required
        />

        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold text-white transition-colors">
          Register
        </button>
      </form>
    </AuthFormWrapper>
  );
}