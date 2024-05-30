import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from '@inertiajs/react';

export default function DetailHotel({ hotel, user }) {
  // Mengonversi path gambar
  console.log(hotel);
  console.log(hotel.created_at);
  return (
    <>
      <Navbar user={user} />
      <div className="bg-white">
        <div className="pt-6 m-10">
          <div className=" mx-auto">
            <h1 className='text-white'>halooo</h1>
            <h1 className='text-white'>halooo</h1>
            {/* Product info */}
            <div>
              
              <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hotel.hotel.name}</h5>
                <h2 class="font-normal text-gray-700 dark:text-gray-400">{hotel.hotel.lokasi}</h2>
              </a>

              <h1 className="mt-4 text-base text-gray-900">Deskripsi:</h1>
              <p className="mt-2 text-base text-gray-900" style={{ wordWrap: 'break-word', maxWidth: '100%' }}>{hotel.deskripsi}</p>
              {/* <p className="mt-4 text-base text-gray-900">Nama Hotel: {hotel.hotel.name}</p> */}
              <p className="mt-4 text-base text-gray-900">ID Pemesanan: {hotel.id}</p>
              <p className="mt-4 text-base text-gray-900">Nama Pemesan: {hotel.user.name}</p>
              <p className="mt-4 text-base text-gray-900">Instagram: {hotel.instagram}</p>
              <p className="mt-4 text-base text-gray-900">Rp {hotel.hotel.harga}</p>
              <p className="mt-4 text-base text-gray-900">Waktu Pembayaran {hotel.created_at}</p>
              <Link href={`/hotel/order/${hotel.id}`}
                className="inline-flex items-center px-3 py-2 text-1xl font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sewa Kamar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
