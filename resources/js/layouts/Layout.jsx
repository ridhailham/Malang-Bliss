import React from 'react'
import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='mt-10'>
                <div className='container mx-auto'>{children}</div>
            </main>
        </>
    )
}

export default Layout