import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

const EditNama = ({ user }) => {
  const [tname, setTname] = useState(user.name);
  
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const { errors } = usePage().props;

  const saveData = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionError(null);

    const userData = { name: tname };

    
    
    Inertia.post(`/updatenama/${user.id}`, userData, {
        onFinish: () => setLoading(false),
        onError: () => {
            setSubmissionError('Data gagal ditambahkan. Silakan coba lagi.');
        },
    });
};

return (
    <div className="px-12 max-w-5xl mx-auto bg-white rounded-lg pt-12 mt-6">
      <h3 className="text-2xl font-semibold mb-4">Ganti Nama</h3>
      <hr className="mb-4" />
      
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
                {errors.name && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.name}</div>}
              </td>
            </tr>
            
            <tr>
              <td colSpan="2">
                <button type="submit" className="bg-blue-900 hover:bg-blue-700  text-white px-4 py-2 rounded mt-4 mb-2 ">
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

export default EditNama;
