"use client";
import React, { MouseEvent } from 'react';
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signOut } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { Fragment } from "react";

interface SignInProps {
    user: User | null;
}
export default function SignIn({ user }: SignInProps) {
    const handleSignIn =async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await signInWithGoogle();
    }
    const handleSignOut =async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await signOut();
    }
    return (
        <Fragment>
            { user ?
                (
                <Button variant="ghost" className="border-solid border-2 rounded-full" onClick={handleSignOut}>
                    Sign Out
                </Button>
                ) : (
                    <Button variant="ghost" className="border-solid border-2 rounded-full" onClick={handleSignIn}>
                        Sign In
                    </Button>
                )
            }
        </Fragment>
    )
}
