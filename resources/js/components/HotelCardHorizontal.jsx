import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from '@inertiajs/react'; // Import Link from react-router-dom

const HotelCardHorizontal = ({ hotel }) => {
  return (
    <div className='py-10 px-4 sm:px-20'>
      <h1 className='text-3xl font-bold text-center sm:text-left'>Hotel Terbaru</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {hotel.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            style={{ width: '400px', height: '350px', overflow: 'hidden' }} // fixed size for the card
          >
            {/* Use Link component instead of <a> tag */}
            <Link href={`/hotel/${item.id}`}>
              <img
                className="rounded-t-lg object-cover"
                src={`/storage/wisata/${item.image}`}
                alt={item.nama}
                style={{ width: '100%', height: '200px' }} // fixed size for the image
              />
            </Link>
            <div className="p-5">
            <Link href={`/hotel/${item.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.name}
                </h5>
              </Link>
              <p className="flex gap-2 pt-1 mb-3 font-normal text-gray-700 dark:text-gray-400">
                <FaLocationDot /> {item.lokasi}
              </p>
              <p className="flex justify-end mb-3 text-2xl font-normal text-gray-700 text-black">
                Rp {item.harga}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center sm:justify-end mt-6">
        <Link
          href="/hotel"
          className="inline-flex items-center px-3 py-2 text-1xl font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Lihat Semua
        </Link>
      </div>
    </div>
  );
}

export default HotelCardHorizontal;
