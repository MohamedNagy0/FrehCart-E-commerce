import { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileAside from "./ProfileAside/ProfileAside";

export default function Profile() {
    const [profileAsideMove, setProfileAsideMove] = useState(false);
    return (
        <>
            <ProfileAside
                profileAsideMove={profileAsideMove}
                setProfileAsideMove={setProfileAsideMove}
            />

            <section
                onClick={() => {
                    setProfileAsideMove(false);
                }}
            >
                <Outlet />
            </section>
        </>
    );
}
