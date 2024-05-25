import React from "react";
import AdminLayout from "./Layouts/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Selamat Datang Admin</h1>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <h2
              
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Semoga bentah jadi admin yaa :)
            </h2>
            
          </div>
        </div>
      </main> 
    </AdminLayout>
  );
};

export default Dashboard;
