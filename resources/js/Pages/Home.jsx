import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WisataCardHorizontal from '../components/WisataCardHorizontal';
import HotelCardHorizontal from '../components/HotelCardHorizontal';

const Home = ({ user, wisata, hotel }) => {
  
  return (
    <>
      <Navbar user={user} />
      <Hero user={user} />
      <br />
      <WisataCardHorizontal wisata={wisata} />
      <HotelCardHorizontal hotel={hotel}/>
    </>
  );
};

export default Home;
