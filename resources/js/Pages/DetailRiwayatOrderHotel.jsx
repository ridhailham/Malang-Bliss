import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from '@inertiajs/react';

export default function DetailRiwayatOrderHotel({ hotel, user }) {
  return (
    <>
      <Navbar user={user} />
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="pt-6 m-10 max-w-xl w-full">
          <h5 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 dark:text-white">Order Hotel</h5>
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.hotel.name}</h5>
            <h2 className="font-normal text-gray-700 dark:text-gray-400">{hotel.hotel.lokasi}</h2>
            <a 
              href={`/${hotel.bukti_pembayaran}`}
              className="mt-4 inline-flex items-center px-3 py-2 text-xl font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Bukti Pembayaran
            </a>
            <p className="mt-4 text-base text-gray-900" style={{ wordWrap: 'break-word', maxWidth: '100%' }}>{hotel.deskripsi}</p>
            <p className="mt-4 text-base text-gray-900">ID Pemesanan: {hotel.id}</p>
            <p className="mt-4 text-base text-gray-900">Nama Pemesan: {hotel.user.name}</p>
            <p className="mt-4 text-base text-gray-900">Rp {hotel.hotel.harga}</p>
            <p className="mt-4 text-base text-gray-900">Waktu Pembayaran: {hotel.created_at}</p>
          </div>
        </div>
      </div>
    </>
  );
}
