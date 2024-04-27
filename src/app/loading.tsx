import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
                src="/loading.png"
                width={352}
                height={311}
                layout="fixed"
                objectFit="cover"
                alt=""
            />
            <p>ﾛｰﾃﾞｨﾝｸﾞ中ﾀﾞﾖ!!</p>
        </div>
    );
}
