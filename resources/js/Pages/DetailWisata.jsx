import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from '@inertiajs/react';

export default function DetailWisata({ wisata, user }) {
  // Mengonversi path gambar

  console.log("wisataaa " + wisata);
  console.log("user " + user);

  return (
    <>
      <Navbar user={user} />
      <div className="bg-white">
        <div className="pt-6 m-10">
          <div className=" mx-auto">
            {/* Image */}
            <div className="overflow-hidden rounded-lg mt-8">
              <img
                src={`/storage/wisata/${wisata.image}`}
                alt={wisata.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* Product info */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {wisata.name}
              </h1>
              <h1 className="mt-4 text-base text-gray-900">Deskripsi:</h1>
              <p className="mt-2 text-base text-gray-900" style={{ wordWrap: 'break-word', maxWidth: '100%' }}>{wisata.deskripsi}</p>
              <p className="mt-4 text-base text-gray-900">Lokasi: {wisata.lokasi}</p>
              <p className="mt-4 text-base text-gray-900">Kontak: {wisata.kontak}</p>
              <p className="mt-4 text-base text-gray-900">Instagram: {wisata.instagram}</p>
              <p className="mt-4 text-base text-gray-900">Rp {wisata.harga}</p>
              <Link href={`/destinasi/order/${wisata.id}`}
                className="inline-flex items-center px-3 py-2 text-1xl font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Beli Tiket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
