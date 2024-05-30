import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '../components/Navbar';

const OrderHotel = ({ user, hotel }) => {
  const [bukti_pembayaran, setBukti] = useState('');
  const [kontak, setKontak] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const { errors } = usePage().props;

  const saveData = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionError(null);

    const order = {
      bukti_pembayaran,
      kontak,
      user_id: user.id,
      hotel_id: hotel.id,
    };

    
    console.log(order);
    
    Inertia.post('/hotel/order', order, {
      onFinish: () => {
        setLoading(false);
      },
      onError: () => {
        setSubmissionError('Data gagal ditambahkan. Silakan coba lagi.');
      },
    });
  };

  return (
    <>
    <Navbar user={user}/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className='text-white'>halo</h1>
          <h1 className='text-white'>halo</h1>
          <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Sewa Hotel
          </h2>
        </div>

        <p className="mt-2 text-center text-sm text-black">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold leading-6 text-orange-400 hover:text-indigo-500">
            Masuk
          </Link>
        </p>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={saveData}>
            {submissionError && <div style={{ color: 'red', fontStyle: 'italic' }}>{submissionError}</div>}
            
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Bukti Pembayaran [Link Google Drive]
              </label>
              <div className="mt-2">
                <input
                  id="bukti_pembayaran"
                  name="bukti_pembayaran"
                  type="text"
                  value={bukti_pembayaran}
                  onChange={(e) => setBukti(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Masukkan bukti pembayaran Anda"
                />
                {errors.bukti_pembayaran && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.bukti_pembayaran}</div>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Kontak
              </label>
              <div className="mt-2">
                <input
                  id="kontak"
                  name="kontak"
                  type="text"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Masukkan nomor WA Anda"
                />
                {errors.kontak && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.kontak}</div>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Tunggu...' : 'Bayar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderHotel;
