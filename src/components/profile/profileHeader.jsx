import {
    Edit,
    MoreHorizontal,
    Heart,
    BookMarked,
    FileText,
    Info,
} from "lucide-react";
import Container from "@/components/global/container";
import { useSelector } from "react-redux";
import GlobalButton from "@/components/global/Button";
import { NavLink } from "react-router-dom";

const ProfileHeader = () => {
    const userData = useSelector((state) => state.auth.userData)
    return (
        <Container>
            {/* Profile Info Section */}
            <div className="w-screen max-w-max flex flex-col space-y-2 mx-auto pt-14 pb-7">

                <div className="flex items-start gap-x-8 p-4 ">
                    {userData?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="User"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <img src="/images/avatar-default.gif" className="w-20 h-20 rounded-full object-cover" />
                    )}
                    <div>
                        <h1 className="text-[#0d0c22] text-3xl font-bold font-mona-sans my-1">{userData?.name || " Guest User"}</h1>
                        <p className="text-[#0d0c22e0] text-base font-normal font-mona-sans my-1 mb-2">{userData?.email || "No email"}</p>
                        <div className="flex items-center justify-center gap-x-5 mt-5">
                            <GlobalButton customClass="rounded-[100px] dark:shadow-none shadow-[0]">
                                <Edit className="text-sm" />
                                <span>Edit Profile</span>
                            </GlobalButton>
                            <button className="h-12 w-12 border border-[#`e7e7e9] rounded-full flex items-center justify-center">
                                <MoreHorizontal className="w-4 h-4 text-[#0d0c22]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}

            </div>

            {/* Navigation Tabs */}
            <div className="py-8 flex items-center gap-x-2 border-b border-[#e7e7e9]  ">

                {["Articles", "WishList", "Collections", "About"].map((tab) => {
                    const path = tab.toLowerCase(); // Convert to lowercase for route matching
                    return (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `font-mona-sans inline-flex items-center gap-x-[10px] h-9 px-4 transition-all delay-400 ease-out rounded-full text-sm font-semibold ${isActive
                                    ? 'bg-[#f8f7f4] text-[#0d0c22]'
                                    : 'text-[#0d0c22] hover:text-[#6e6d7a]'
                                }
                                ${new RegExp(`^/${userData?.email?.replace('@gmail.com', '')?.replaceAll('.', '-') || ''}/?$`).test(window.location.pathname)
                                && path === 'articles'
                                && 'bg-[#f8f7f4] text-[#0d0c22]'
                                }

                                `
                            }
                        >
                            {tab === "Articles" && <FileText className="text-current" />}
                            {tab === "WishList" && <Heart className="text-current" />}
                            {tab === "Collections" && <BookMarked className="text-current" />}
                            {tab === "About" && <Info className="text-current" />}
                            {tab}
                        </NavLink>
                    );
                })}
            </div>

        </Container >
    );
};

export default ProfileHeader;