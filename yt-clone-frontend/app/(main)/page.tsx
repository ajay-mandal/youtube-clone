import { Spinner } from "@/components/spinner";
import { getVideos } from "@/firebase/functions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const videos = await getVideos();
  return (
    <main className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {videos?.map((video) => {
        if (video.status === "processed") {
          return (
            <div className="px-3" key={video.id}>
              <Link href={`/watch?v=${video.filename}`} key={video.id}>
                <Image
                  src='/default.png'
                  alt='thumbnail'
                  width={380}
                  height={240}
                />
                <p className="font-semibold line-clamp-3">{video.filename?.split('-')[2]}</p>
              </Link>
            </div>
          );
        } else if (video.status === "processing") {
          return (
            <div className="px-3" key={video.id}>
              <Spinner size="lg"/>
            </div>
          );
        }
        return null;
      })}
    </main>
  );
}

//Disable caching for this page
export const revalidate = 15;
