import React from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const AllHotel = ({ hotel }) => {
    console.log(hotel);
    const { flash } = usePage().props;
    console.log('Flash message:', flash);

    const deleteData = (id, name) => {
        if (confirm(`Yakin menghapus data hotel dengan nama ${name} ?`)) {
            Inertia.delete(`/admin/hotel/${id}`);
        }
    }

    const editData = (id) => {
        if (confirm(`Yakin mau edit dengan id ${id} ?`)) {
            Inertia.visit(route('admin.hotel.edit', id));
        }
    }

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Data Hotel</h3>
                <hr className="mb-4" />
                <Link as='button' type='button' href='/admin/hotel/create' className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
                    Tambah Hotel
                </Link>

                {flash && flash.message && <div className='font-bold text-green-600 mb-10'>{flash.message}</div>}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <thead>
                            <tr className="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">No.</th>
                                <th className="py-3 px-6 text-left">Nama Wisata</th>
                                <th className="py-3 px-6 text-left">Lokasi</th>
                                <th className="py-3 px-6 text-left">Kontak</th>
                                <th className="py-3 px-6 text-left">Instagram</th>
                                <th className="py-3 px-6 text-left">Deskripsi</th>
                                <th className="py-3 px-6 text-left">Harga</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {hotel.length == 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-3 px-6 text-center">Data Kosong...</td>
                                </tr>
                            ) : (
                                hotel.map((h, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap font-bold">{index + 1}</td>
                                        <td className="py-3 px-6 text-left font-bold">{h.name}</td>
                                        <td className="py-3 px-6 text-left font-bold">{h.lokasi}</td>
                                        <td className="py-3 px-6 text-left font-bold">{h.kontak}</td>
                                        <td className="py-3 px-6 text-left font-bold">{h.instagram}</td>
                                        <td className="py-3 px-6 text-left font-bold">{h.deskripsi}</td>
                                        <td className="py-3 px-6 text-left font-bold">{h.harga}</td>
                                        <td className='p-5'>
                                            <Link href={`/admin/hotel/${h.id}`} className="bg-blue-500 text-white px-3 py-3 rounded mb-5 hover:bg-blue-700">Edit</Link>
                                            <button className="bg-blue-500 text-white px-2 py-2 rounded mt-6 hover:bg-blue-700" onClick={() => deleteData(h.id, h.name)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AllHotel;
