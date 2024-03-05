"use client";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="absolute bottom-1 right-1">
            <Button
                onClick={() => window.open('https://github.com/ajay-mandal')}
                className="rounded-full hover:bg-gray-300 hover:text-black"
            >
                Github
            </Button>
        </footer>
    )
}
