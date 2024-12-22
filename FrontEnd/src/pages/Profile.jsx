import React, { useState, useEffect } from "react";
import MyBooks from "../components/profile/MyBooks";
import MyFines from "../components/profile/MyFIne";
import { jwtDecode } from "jwt-decode";
import MyDetails from "../components/profile/MyDetails";
import NavBar from "../components/navbar/NavBar";

const Profile = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const { userId } = decoded;
            setUser({ userId });
        }
    }, []);

    
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
                <NavBar></NavBar>

            <MyDetails userId={user.userId} />
            <MyFines user={user} />
            <MyBooks user={user} />
        </div>
    );
};

export default Profile;
