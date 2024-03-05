"use client";

import { useEffect, useState } from "react";
import SignIn from "./login";
import Logo from "./logo";
import { onAuthStateChangedHelper } from "@/firebase/firebase";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function NavBard() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        const unsubscribe  = onAuthStateChangedHelper((user)=>{
            setUser(user);
        });
        return ()=> unsubscribe();
    },[]);

    return(
        <div className="flex flex-cols-3 justify-between py-4 px-4">
            <Logo />
            {
                user && <Upload/>
            }
            <SignIn user={user}/>
        </div>
    )
}
