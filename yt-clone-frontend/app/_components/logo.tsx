import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return(
        <div className="flex justify-start">
            <Link href="/">
                <Image
                src="/youtube-len.png"
                height="20"
                width="130"
                alt="logo"
                />
            </Link>
        </div>
    )
}
