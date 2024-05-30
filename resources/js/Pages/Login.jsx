import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const { flash, errors } = usePage().props;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = { email, password };
    Inertia.post('/authenticate', user, {
      onFinish: () => {
        setLoading(false);
      },
    });
  };
  
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-21 w-21"
            src="/assets/bliss.png"
            alt="Your Company"
          />
          <h2 className="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Masuk
          </h2>
        </div>

        <p className="mt-2 text-center text-sm text-black">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold leading-6 text-orange-400 hover:text-indigo-500">
            Daftar
          </Link>
        </p>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            {flash.message && (
              <div className="font-bold text-red-600 mb-4">
                {flash.message}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Masukkan email Anda"
                />
                {errors.email && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.email}</div>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passwordVisible ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.942 2.906-3.16 5.355-5.952 6.294M15 12a3 3 01-6 0m6 0a3 3 0 00-6 0m12-3h.01M4.22 4.22l15.56 15.56" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.956 9.956 0 0112 19c-5.523 0-10-4.477-10-10 0-1.85.503-3.585 1.375-5.075m12.75 12.75A9.956 9.956 0 0012 19c-5.523 0-10-4.477-10-10 0-1.85.503-3.585 1.375-5.075m12.75 12.75L12 12m6 0c0-1.106-.895-2-2-2s-2 .895-2 2m0 0a2 2 0 11-4 0m4 0a2 2 0 00-4 0m4-2c1.106 0 2 .895 2 2m0 0a2 2 0 11-4 0m4 0a2 2 0 00-4 0" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.password}</div>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Tunggu...' : 'Masuk'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
