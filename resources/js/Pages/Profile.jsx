import React from 'react';
import Navbar from '../components/Navbar';
import { FaPencilAlt, FaKey } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa"
import { Link } from '@inertiajs/react';

const Profile = ({ user }) => {


    return (
        <>
            <Navbar user={user} />
            <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex flex-col items-center justify-center">
                <h1 className="text-white text-5xl font-semibold mb-6">{user.name}</h1>


                <ul className="max-w-md space-y-1 text-white list-inside dark:text-gray-400">
                    <Link href={`/editnama/${user.id}`}>
                        <li className="flex items-center">
                            <FaPencilAlt size={25} className='' />
                            <p className='m-3 text-2xl'>Ganti Nama</p>
                        </li>
                    </Link>
                    <Link href={`/editpassword/${user.id}`}>
                        <li className="flex items-center">
                            <FaKey size={25} className='' />
                            <p className='m-3 text-2xl'>Ganti Password</p>
                        </li>
                    </Link>
                    {/* <Link href={`/riwayatorder/${user.id}`}>
                        <li className="flex items-center">
                            <IoTicketOutline size={27} />
                            <p className='m-3 text-2xl'>Riwayat Pemesanan Destinasi</p>
                        </li>
                    </Link>
                    <Link href={`/riwayatorder/${user.id}`}>
                        <li className="flex items-center">
                            <FaHotel size={27} />

                            <p className='m-3 text-2xl'>Riwayat Pemesanan Hotel</p>
                        </li>
                    </Link> */}
                </ul>

            </div>
        </>
    );
};

export default Profile;
