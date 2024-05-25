import React from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const AllUser = ({ user }) => {

    const { flash } = usePage().props;
    

    const deleteData = (id, email) => {
        if (confirm(`Yakin menghapus data user dengan nama ${email} ?`)) {
            Inertia.delete(`/admin/user/${id}`);
        }
    }

    const editData = (id) => {
        if (confirm(`Yakin mau edit dengan id ${id} ?`)) {
            Inertia.visit(route('admin.user.edit', id));
        }
    }

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Data User</h3>
                <hr className="mb-4" />
                <Link as='button' type='button' href='/admin/user/create' className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
                    Tambah User
                </Link>

                {
                    flash && flash.message && <div className='font-bold text-green-600 mb-10'>{flash.message}</div>
                }
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <thead>
                            <tr className="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">No.</th>
                                <th className="py-3 px-6 text-left">Nama Lengkap</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {
                                user.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-3 px-6 text-center">Data Kosong...</td>
                                    </tr>
                                ) : (user.map((u, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap font-bold">{index + 1}</td>
                                        <td className="py-3 px-6 text-left font-bold">{u.name}</td>
                                        <td className="py-3 px-6 text-left font-bold">{u.email}</td>
                                        <td>
                                        <Link href={`/admin/user/${u.id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-2 hover:bg-blue-700">Edit</Link>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded ml-3 mt-4 mb-2 hover:bg-blue-700" onClick={() => deleteData(u.id, u.email)}>Hapus</button>
                                        </td>
                                    </tr>
                                )))
                            }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </AdminLayout>
    );
}

export default AllUser;


