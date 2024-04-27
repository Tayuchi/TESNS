import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
                src="/NotFound.png"
                width={1920}
                height={1080}
                layout="fixed"
                objectFit="cover"
                alt=""
            />
        </div>
    );
}
