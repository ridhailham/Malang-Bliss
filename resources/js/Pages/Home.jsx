


















import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Navbar from '../components/Navbar';

const Home = ({ user }) => {
  
  return (
    <>
    <Navbar user={user}/>
      <div>
        <h1>Selamat Datang, {user ? user.name : 'Pengunjung'}</h1>
        {/* Tampilkan informasi pengguna jika sudah terautentikasi */}
        {user && (
          <div>
            <p>Email: {user.email}</p>
            {/* Tambahkan info pengguna lainnya sesuai kebutuhan */}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
