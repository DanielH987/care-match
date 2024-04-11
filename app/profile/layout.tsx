import getCurrentUser from "../actions/getCurrentUser";
import Sidebar from "../components/sidebar/Sidebar";
import Profile from "./components/Profile";

export default async function ProfileLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    
    return (
        <Sidebar>
            <div 
                className="
                    px-4
                    py-10
                    sm:px-6
                    lg:px-8
                    h-full
                    flex
                    justify-center
                    items-center
                    bg-[#FFF1EC]
                "
            >
                {currentUser && <Profile currentUser={currentUser}/>}
            </div>
        </Sidebar>
    )
}