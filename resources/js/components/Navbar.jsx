import React from 'react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }) {
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-14 w-auto" src="/assets/bliss.png" alt="Your Company" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/tourism" className="px-5 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 hover:text-orange-400">
                        Tourism
                    </Link>
                    <Link href="/hotel" className="px-5 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 hover:text-orange-400">
                        Hotel
                    </Link>
                    <div className='px-5'>

                    {user ? (
                        
                        <Link href={`/profile/${user.id}`} className="px-5 text-sm font-semibold leading-6 text-white bg-blue-900 hover:bg-blue-800 p-2 rounded-md">
                            Profile
                        </Link>
                    ) : (
                        <Link href="/login" className="px-5 text-sm font-semibold leading-6 text-white bg-blue-900 hover:bg-blue-800 p-2 rounded-md">
                            Log in
                        </Link>
                    )}
                    </div>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-14 w-auto" src="/assets/bliss.png" alt="Your Company" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6">
                                <Link href="/tourism" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-orange-400">
                                    Tourism
                                </Link>
                                <Link href="/hotel" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-orange-400">
                                    Hotel
                                </Link>
                            </div>
                            <div className="py-6">
                                {user ? (
                                    <Link href={`/profile/${user.id}`} className="-mx-3 block rounded-lg px-3 py-2.5 bg-blue-900 text-white font-semibold leading-7 text-center">
                                        Profile
                                    </Link>
                                ) : (
                                    <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 bg-blue-900 text-white font-semibold leading-7 text-center">
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
