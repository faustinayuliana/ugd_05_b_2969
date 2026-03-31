'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react'; 

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-100 transition-all hover:shadow-2xl">
        
        {}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full text-red-600 animate-pulse">
            <Lock size={60} strokeWidth={1.5} />
          </div>
        </div>

        {}
        <h1 className="text-3xl font-extrabold text-gray-950 mb-3 tracking-tight">
          Akses Ditolak!
        </h1>
        <p className="text-gray-600 mb-8 text-base leading-relaxed">
          Waduh King! Kamu nggak bisa masuk ke Halaman Game karena <strong className="text-red-600">belum login</strong>. Yuk, login dulu biar bisa main!
        </p>

        {}
        <button 
          onClick={() => router.push('/auth/login')}
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
        >
          Kembali ke Login
        </button>

        {}
        <div className="mt-5 text-sm">
          <p className="text-gray-500">
            Belum punya akun?{' '}
            <button 
              onClick={() => router.push('/auth/register')} 
              className="text-blue-600 hover:underline font-semibold"
            >
              Daftar Disini
            </button>
            </p>
          </div>
        </div>
      </div>
    
  );
}