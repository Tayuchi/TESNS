import Image from "next/image"

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>ぬぬぬ</h1>
            <Image
                src="/GMB5sxtbYAAOUJJ.png"
                width={1080}
                height={360}
                layout="fixed"
                objectFit="cover"
                className="hidden md:block"
                alt=""
            />
        </div>
    )
}
