import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from '@inertiajs/react';

export default function DetailHotel({ hotel, user }) {
  // Mengonversi path gambar

  console.log("wisataaa " + hotel);
  console.log("user " + user);

  return (
    <>
      <Navbar user={user} />
      <div className="bg-white">
        <div className="pt-6 m-10">
          <div className="mx-auto max-w-4xl">
          <h1 className='text-bold text-white'>Detail hotel</h1>
            <h1 className='font-bold text-2xl'>Detail hotel</h1>
            {/* Image */}
            <div className="overflow-hidden rounded-lg mt-8">
              <img
                src={`/storage/hotel/${hotel.image}`}
                alt={hotel.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* Product info */}
            <div className="mt-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {hotel.name}
              </h1>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">Deskripsi:</h2>
                <p className="mt-2 text-base text-gray-700" style={{ wordWrap: 'break-word', maxWidth: '100%' }}>
                  {hotel.deskripsi}
                </p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">Lokasi:</h2>
                <p className="mt-2 text-base text-gray-700">{hotel.lokasi}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">Kontak:</h2>
                <p className="mt-2 text-base text-gray-700">{hotel.kontak}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">Instagram:</h2>
                <p className="mt-2 text-base text-gray-700">{hotel.instagram}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900">Harga:</h2>
                <p className="mt-2 text-base text-gray-700">Rp {hotel.harga}</p>
              </div>
              <div className="mt-8">
                <Link
                  href={`/hotel/order/${hotel.id}`}
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300"
                >
                  Sewa Kamar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
