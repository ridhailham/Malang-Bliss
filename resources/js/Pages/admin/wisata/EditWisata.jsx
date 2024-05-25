import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

const EditWisata = ({ id, wisata }) => {
  const [name, setName] = useState(wisata.name);
  const [lokasi, setLokasi] = useState(wisata.lokasi);
  const [kontak, setKontak] = useState(wisata.kontak);
  const [instagram, setInstagram] = useState(wisata.instagram);
  const [deskripsi, setDeskripsi] = useState(wisata.deskripsi);
  const [harga, setHarga] = useState(wisata.harga);
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
    if (image) {
      formData.append('image', image);
    }

    // Logging FormData content
    console.log("update form success");
    console.log(formData);

    Inertia.post(`/admin/wisata/${id}`, formData, {
      onFinish: () => setLoading(false),
      onError: () => {
        setSubmissionError('Data gagal diperbarui. Silakan coba lagi.');
      },
      forceFormData: true,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="px-4 md:px-12 max-w-5xl mx-auto bg-white rounded-lg pt-6 md:pt-12 mt-6">
      <h3 className="text-2xl font-semibold mb-4">Form Edit Wisata</h3>
      <hr className="mb-4" />
      <Link as="button" type="button" href="/admin/wisata" className="bg-blue-500 text-white px-3 py-1 rounded mb-4 hover:bg-blue-700">
        <h2>Kembali</h2>
      </Link>
      {submissionError && <div style={{ color: 'red', fontStyle: 'italic' }}>{submissionError}</div>}
      <form onSubmit={saveData} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Nama:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.name && <div className="text-red-600 italic">{errors.name}</div>}
        
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Lokasi:</label>
          <input
            type="text"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            placeholder="Masukkan lokasi"
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.lokasi && <div className="text-red-600 italic">{errors.lokasi}</div>}
        
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Kontak:</label>
          <input
            type="text"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
            placeholder="Masukkan kontak"
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.kontak && <div className="text-red-600 italic">{errors.kontak}</div>}
        
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Instagram:</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Masukkan Instagram"
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.instagram && <div className="text-red-600 italic">{errors.instagram}</div>}
        
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Deskripsi:</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Masukkan deskripsi"
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.deskripsi && <div className="text-red-600 italic">{errors.deskripsi}</div>}
        
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Harga:</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(Math.max(0, parseInt(e.target.value)))}
            placeholder="Masukkan harga"
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.harga && <div className="text-red-600 italic">{errors.harga}</div>}
        
        <div className="flex flex-col md:flex-row md:items-center">
          <label className="w-full md:w-1/4">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="border border-gray-300 rounded p-2 w-full md:w-3/4"
            required
          />
        </div>
        {errors.image && <div className="text-red-600 italic">{errors.image}</div>}
        
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-2 hover:bg-blue-700">
            {loading ? 'Tunggu...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWisata;
