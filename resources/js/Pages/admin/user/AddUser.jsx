import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

const AddUser = () => {
    const [tname, setTname] = useState('');
    const [temail, setTemail] = useState('');
    const [tpassword, setTpassword] = useState('');
    const [tpassword_confirmation, setTpasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const { errors } = usePage().props;

    const saveData = (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmissionError(null);

        const user = { tname, temail, tpassword, tpassword_confirmation };
        Inertia.post('/admin/user/store', user, {
            onFinish: () => {
                setLoading(false),
                    console.log("Finished submitting form")
            },
            onError: (error) => {
                setSubmissionError('Data gagal ditambahkan. Silakan coba lagi.');
            },
        });
    };

    return (
        <div className="px-12 max-w-6xl mx-auto bg-white  rounded-lg pt-12 mt-6">
            <h3 className="text-2xl font-semibold mb-4">Form Tambah User</h3>
            <hr className="mb-4" />
            <Link as="button" type="button" href="/admin/user" className="bg-blue-500 text-white px-3 py-1 rounded mb-4 hover:bg-blue-700">
                <h2>Kembali</h2>
            </Link>
            {submissionError && <div style={{ color: 'red', fontStyle: 'italic' }}>{submissionError}</div>}
            <form onSubmit={saveData}>
                <table className="w-full">
                    <tbody>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Nama:</td>
                            <td>
                                <input
                                    type="text"
                                    value={tname}
                                    onChange={(e) => setTname(e.target.value)}
                                    placeholder="Masukkan nama"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.tname && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tname}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Email:</td>
                            <td>
                                <input
                                    type="email"
                                    value={temail}
                                    onChange={(e) => setTemail(e.target.value)}
                                    placeholder="Masukkan email"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.temail && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.temail}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Password:</td>
                            <td>
                                <input
                                    type="password"
                                    value={tpassword}
                                    onChange={(e) => setTpassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.tpassword && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tpassword}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Konfirmasi Password:</td>
                            <td>
                                <input
                                    type="password"
                                    value={tpassword_confirmation}
                                    onChange={(e) => setTpasswordConfirmation(e.target.value)}
                                    placeholder="Konfirmasi password"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.tpassword_confirmation && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.tpassword_confirmation}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-2 hover:bg-blue-700">
                                    {loading ? 'Tunggu...' : 'Simpan Data'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default AddUser;
