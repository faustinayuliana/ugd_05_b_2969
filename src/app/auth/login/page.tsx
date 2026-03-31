'use client';
import SocialAuth from '@/components/SocialAuth';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeOff, RefreshCcw } from 'lucide-react';
import AuthFormWrapper from '@/components/AuthFormWrapper';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    captchaInput: ''
  });
  
  const [attempts, setAttempts] = useState(3);

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const result = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const myNPM = "241712969"; 
    const targetEmail = `${myNPM}@gmail.com`;

    if (attempts <= 0) {
      toast.error('Kesempatan login habis! Silakan reset.');
      return;
    }

    if (loginData.email !== targetEmail || loginData.password !== myNPM) {
      const remaining = attempts - 1;
      setAttempts(remaining);
      toast.error(`Email atau Password salah! Sisa: ${remaining}`);
      return;
    }

    if (loginData.captchaInput !== captcha) {
      toast.error('Captcha tidak sesuai!');
      generateCaptcha(); 
      setLoginData({ ...loginData, captchaInput: '' });
      return;
    }

    toast.success('Login Berhasil!');
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/home'); 
  };

  return (
    <AuthFormWrapper title="Log In">
      <div className="text-center mb-4 text-sm font-semibold">
        Sisa Kesempatan: <span className={attempts === 0 ? "text-red-500" : "text-blue-600"}>{attempts}</span>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {}
        <input
          type="email"
          placeholder="Email (NPM@gmail.com)"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          className="w-full p-2 border rounded text-black shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (NPM)"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full p-2 border rounded text-black shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
          >
            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
        </div>

        {}
        <div className="flex items-center justify-between text-xs text-gray-600 px-1">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
            />
            <span className="group-hover:text-blue-600 transition-colors">Ingat saya</span>
          </label>
          <button 
            type="button" 
            onClick={() => toast.info("Fitur Reset Password akan segera hadir!")}
            className="text-blue-600 hover:underline font-medium"
          >
            Lupa Password?
          </button>
        </div>

        {}
        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-inner">
          <span className="font-mono font-bold italic line-through tracking-widest text-lg text-gray-700 select-none">
            {captcha}
          </span>
          <button 
            type="button" 
            onClick={generateCaptcha} 
            className="text-blue-600 hover:rotate-180 transition-all duration-500"
            title="Ganti Captcha"
          >
            <RefreshCcw size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Masukkan kode captcha di atas"
          value={loginData.captchaInput}
          onChange={(e) => setLoginData({ ...loginData, captchaInput: e.target.value })}
          className="w-full p-2 border rounded text-black shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {}
        <button 
          type="submit" 
          disabled={attempts === 0}
          className={`w-full py-2.5 rounded-lg font-bold text-white shadow-md transition-all active:scale-95 ${
            attempts === 0 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          Sign In
        </button>

        {}
        {attempts === 0 && (
          <button 
            type="button"
            onClick={() => setAttempts(3)}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-bold shadow-md animate-bounce"
          >
            Reset Kesempatan
          </button>
        )}
      </form>

      <div className="mt-6 text-center border-t pt-4">
        <p className="text-gray-600 text-sm">
          Belum punya akun?{' '}
          <button 
            onClick={() => router.push('/auth/register')} 
            className="text-blue-600 hover:underline font-bold"
          >
            Daftar Sekarang
          </button>
        </p>
      </div>
      
      <SocialAuth /> 
    </AuthFormWrapper>
  );
}