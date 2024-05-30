import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

const AddWisata = () => {
    const [name, setName] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [kontak, setKontak] = useState('');
    const [instagram, setInstagram] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [harga, setHarga] = useState(0);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const { errors } = usePage().props;

    const saveData = (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmissionError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('lokasi', lokasi);
        formData.append('kontak', kontak);
        formData.append('instagram', instagram);
        formData.append('deskripsi', deskripsi);
        formData.append('harga', harga);
        formData.append('image', image);

        
        Inertia.post('/admin/wisata/store', formData, {
            onFinish: () => setLoading(false),
            onError: () => setSubmissionError('Data gagal ditambahkan. Silakan coba lagi.'),
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="px-12 max-w-6xl mx-auto bg-white rounded-lg pt-12 mt-6">
            <h3 className="text-2xl font-semibold mb-4">Form Tambah Wisata</h3>
            <hr className="mb-4" />
            <Link as="button" type="button" href="/admin/wisata" className="bg-blue-500 text-white px-3 py-1 rounded mb-4 hover:bg-blue-700">
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan nama"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.name && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.name}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Lokasi:</td>
                            <td>
                                <input
                                    type="text"
                                    value={lokasi}
                                    onChange={(e) => setLokasi(e.target.value)}
                                    placeholder="Masukkan lokasi"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.lokasi && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.lokasi}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Kontak:</td>
                            <td>
                                <input
                                    type="text"
                                    value={kontak}
                                    onChange={(e) => setKontak(e.target.value)}
                                    placeholder="Masukkan kontak"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.kontak && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.kontak}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Instagram:</td>
                            <td>
                                <input
                                    type="text"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    placeholder="Masukkan Instagram"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.instagram && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.instagram}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Deskripsi:</td>
                            <td>
                                <textarea
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    placeholder="Masukkan deskripsi"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.deskripsi && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.deskripsi}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Harga:</td>
                            <td>
                                <input
                                    type="number"
                                    value={harga}
                                    onChange={(e) => setHarga(Math.max(0, parseInt(e.target.value, 10)))}
                                    placeholder="Masukkan harga"
                                    className="border border-gray-300 rounded p-2 w-full"
                                    min="0"
                                    required
                                />
                                {errors.harga && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.harga}</div>}
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <td className="py-4 pr-4">Image:</td>
                            <td>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="border border-gray-300 rounded p-2 w-full"
                                    required
                                />
                                {errors.image && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.image}</div>}
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

export default AddWisata;
