import { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Sidebar from "../components/sidebar/Sidebar";
import Profile from "./components/Profile";
import { User } from "@prisma/client";

export default function ProfileLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getCurrentUser().then(user => {
            setCurrentUser(user);
            setIsLoading(false);
        }).catch(err => {
            setError("Failed to fetch user");
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                {currentUser ? <Profile currentUser={currentUser}/> : <div>No user found</div>}
            </div>
        </Sidebar>
    )
}
