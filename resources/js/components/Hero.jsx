import { Link } from '@inertiajs/react';
import React from 'react';

const Hero = ({user}) => {
  return (
    <>
      <div>
        <div className="bg-white ">
          <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
            <div
              className="absolute inset-0 bg-cover bg-center -z-10"
              style={{ backgroundImage: 'url(/assets/hero.png)' }}
            />
            <br />
            <br />
            <br />
            <div className="mx-auto max-w-2xl py-32 flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="mt-60 flex items-center justify-center gap-x-6">
                  {user ? (
                    
                    <Link >
                      
                    </Link>
                  ) : (
                    <Link href="/register"
                      className=" text-2xl rounded-lg bg-white px-3.5 py-2.5 font-semibold text-black shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sign Up
                    </Link>

                  )}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Hero;
