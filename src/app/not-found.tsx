import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
                src="/GMB5sxtbYAAOUJJ.png"
                width={450}
                height={253}
                layout="fixed"
                objectFit="cover"
                alt=""
            />
        </div>
    );
}
