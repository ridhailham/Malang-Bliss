import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

const EditPassword = ({ id, user }) => {
  const [tname, setTname] = useState(user.name);
  const [tpassword, setTpassword] = useState('');
  const [tpasswordConfirmation, setTpasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const { errors } = usePage().props;

  const saveData = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionError(null);

    const userData = { password: tpassword, password_confirmation: tpasswordConfirmation };

    
    Inertia.post(`/updatepassword/${user.id}`, userData, {
      onFinish: () => setLoading(false),
      onError: () => {
        setSubmissionError('Data gagal ditambahkan. Silakan coba lagi.');
      },
    });
  };

  return (
    <div className="px-12 max-w-5xl mx-auto bg-white rounded-lg pt-12 mt-6">
      <h3 className="text-2xl font-semibold mb-4">Ganti Password</h3>
      <hr className="mb-4" />
      
      {submissionError && <div style={{ color: 'red', fontStyle: 'italic' }}>{submissionError}</div>}
      <form onSubmit={saveData}>
        <table className="w-full">
          <tbody>

            <tr className="mb-4">
              <td className="py-4 pr-4">Password Baru:</td>
              <td>
                <input
                  type="password"
                  value={tpassword}
                  onChange={(e) => setTpassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                {errors.password && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.password}</div>}
              </td>
            </tr>
            <tr className="mb-4">
              <td className="py-4 pr-4">Konfirmasi Password:</td>
              <td>
                <input
                  type="password"
                  value={tpasswordConfirmation}
                  onChange={(e) => setTpasswordConfirmation(e.target.value)}
                  placeholder="Konfirmasi password baru"
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
                {errors.password_confirmation && <div style={{ color: 'red', fontStyle: 'italic' }}>{errors.password_confirmation}</div>}
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

export default EditPassword;
