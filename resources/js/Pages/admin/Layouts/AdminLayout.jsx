import React from "react";
import { Link } from "@inertiajs/react";
import { LayoutDashboard, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
    const handleClick = (e) => {
        console.log('Link clicked:', e.currentTarget.href);
    };

    return (
        <>
            <div>

            {/* <Navbar/> */}
            </div>
            <div className="flex">
                <Sidebar>
                    <Link href="/admin/home" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
                    </Link>
                    <Link href="/admin/user" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<StickyNote size={20} />} text="User" />
                    </Link>
                    <Link href="/admin/wisata" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<Calendar size={20} />} text="Tempat Wisata" />
                    </Link>
                    <Link href="/admin/hotel" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<Layers size={20} />} text="Hotel" />
                    </Link>
                    <Link href="/reporting" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<Flag size={20} />} text="Reporting" />
                    </Link>
                    <hr className="my-3" />
                    <Link href="/admin/reset" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<Settings size={20} />} text="Settings" />
                    </Link>
                    <Link href="/admin/logout" className="no-underline" onClick={handleClick}>
                        <SidebarItem icon={<LifeBuoy size={20} />} text="Logout" />
                    </Link>
                </Sidebar>
                <div className="flex-grow">

                    {children}
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
