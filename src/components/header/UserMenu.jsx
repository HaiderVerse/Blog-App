import { useState } from "react";
import { User, LogOut, CircleUser } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function UserMenu({ logout }) {
    const [open, setOpen] = useState(false);
    const { status, userData } = useSelector((state) => state.auth);

    return (
        <div className="relative">
            {/* Profile Trigger */}
            <div
                className="flex items-center gap-x-2 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {userData?.profileImage ? (
                    <img
                        src={user.profileImage}
                        alt="User"
                        className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                    />
                ) : (
                    <CircleUser className="w-12 h-12 text-white" />
                )}
            </div>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50 border">

                    {/* Top user info */}
                    <div className="flex items-center gap-3 p-4 border-b">
                        {userData?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="User"
                                className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                            />
                        ) : (
                            <User className="w-12 h-12 text-gray-500" />
                        )}
                        <div>
                            <p className="font-semibold text-gray-800">{userData?.name || "Guest User"}</p>
                            <p className="text-sm text-gray-500">{userData?.email || "No email"}</p>
                        </div>
                    </div>

                    {/* Menu Options */}
                    <div className="pt-3 pb-4">
                        <NavLink
                            to={`/${userData?.email?.replace('@gmail.com', '')?.replaceAll('.', '-') || ''}`}
                            className="flex items-center gap-3 w-full px-[18px] py-[10px] text-gray-700 hover:bg-gray-100"
                        >
                            <User /> Profile
                        </NavLink>
                        <button
                            className="flex items-center gap-3 w-full px-[18px] py-[10px] text-[#F03DA7] hover:bg-red-100"
                            onClick={logout}
                        >
                            <LogOut /> Logout
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
}
