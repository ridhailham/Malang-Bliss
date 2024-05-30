



import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia';
import { FaLocationDot } from 'react-icons/fa6'

const Hotel = ({ user, hotel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmissionError('');

        const data = { min_price: minPrice, max_price: maxPrice };

        Inertia.post(`/hotel/filter`, data, {
            onFinish: () => setLoading(false),
            onError: () => {
                setSubmissionError('Data gagal dikirim. Silakan coba lagi.');
            },
        });
    };


    return (
        <>
            <Navbar user={user} />

            <div className='relative isolate py-10 px-4 sm:px-20 pt-14 min-h-screen'>
                <h1 className='text-3xl pt-5 mt-5 font-bold text-white text-center sm:text-left'>Hotel dan Penginapan</h1>
                <h1 className='text-3xl font-bold text-center sm:text-left'>Hotel dan Penginapan</h1>
                <div className="flex justify-center sm:justify-end mt-6 space-x-4">
                    {/* <button
                        onClick={openModal}
                        className="inline-flex items-center px-3 py-2 text-1xl font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Filter
                    </button> */}
                    <Link
                        href="/hotel/asc"
                        className="inline-flex items-center px-3 py-2 text-1xl font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Harga Terendah
                    </Link>
                    <Link
                        href="/hotel/desc"
                        className="inline-flex items-center px-3 py-2 text-1xl font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Harga Tertinggi
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 p-6">
                    {hotel.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            style={{ width: '400px', height: '350px', overflow: 'hidden' }} // fixed size for the card
                        >
                            <Link href={`/hotel/${item.id}`}>
                                <img
                                    className="rounded-t-lg object-cover"
                                    src={`/storage/hotel/${item.image}`}
                                    alt={item.nama}
                                    style={{ width: '100%', height: '200px' }} // fixed size for the image
                                />
                            </Link>
                            <Link href={`/hotel/${item.id}`}>
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                                        {item.name}
                                    </h5>
                                    <p className="flex gap-2 pt-1 mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        <FaLocationDot /> {item.lokasi}
                                    </p>
                                    <p className="flex justify-end mb-3 text-2xl font-normal text-gray-700 text-black">
                                        Rp {item.harga}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h2 className="text-2xl font-bold mb-4">Filter Harga</h2>
                            <form onSubmit={handleFilterSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                                        Harga Minimum
                                    </label>
                                    <input
                                        type="number"
                                        id="minPrice"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                                        Harga Maksimum
                                    </label>
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                {submissionError && (
                                    <div className="text-red-500 mb-4">
                                        {submissionError}
                                    </div>
                                )}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="mr-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Terapkan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Hotel;
