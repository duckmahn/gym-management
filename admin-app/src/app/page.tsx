'use client';
import Image from 'next/image';
import { useState } from 'react';
import axios, {AxiosError}from 'axios';
import { FormEvent } from 'react'; 
import { useRouter } from 'next/navigation';
import { NEXT_PUBLIC_API_URL } from '../../apiconfig'; 

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
 

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
   
    try {
      const response = await axios.post(`${NEXT_PUBLIC_API_URL}Login`, {  
        email: username,
        password: password
      });
      
      console.log('Phản hồi từ API:', response.data);
  
      
      const token = response.data?.token || response.data;
      

      if (!token) {
        throw new Error('Thiếu token trong phản hồi');
      }
  
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      console.log('Đăng nhập thành công!', token);
  
      
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setError(error.response.data.message || 'Đăng nhập thất bại, vui lòng thử lại.');
      } else {
        setError('Đăng nhập thất bại, vui lòng thử lại.');
      }
      setPassword('');  
      console.error('Lỗi đăng nhập:', error);
    }
  };
  

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/backgradmin.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8 rounded-lg pt-40">
        <div className="w-32 h-32">
          <Image
            src="/logo.png"
            alt="Logo"
            width={128}
            height={128}
            priority
          />
        </div>

        <form className="flex flex-col space-y-4 w-72" onSubmit={handleLogin}>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <i className="fas fa-user text-white"></i>
            </span>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 px-4 py-2 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <i className="fas fa-lock text-white"></i>
            </span>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 px-4 py-2 rounded-lg bg-transparent border border-white text-white placeholder-white focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="w-full py-2 rounded-lg bg-white text-red-600 font-bold">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
  