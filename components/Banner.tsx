import Image from "next/image";
import Banner_img from '@/../public/assets/M-letter.png'

function Banner() {
    return (
        <div className={'flex justify-between items-center bg-yellow-400 border-y border-black py-12 lg:py-0'}>
            <div className={'px-10 space-y-5'}>
                <h1 className={'text-4xl font-serif'}>
                    <span className={'underline decoration-black decoration-4'}>M</span> &nbsp;is a place to read and connect
                </h1>
                <h2>
                  It&apos;s free easy and free to post your mind on any topic&#44; and connect with millions.
                </h2>
            </div>
            <Image src={Banner_img} alt={'Medium M Alphabet'}
                   className={'hidden md:inline-flex h-34 w-34 mr-20 lg:h-64 w-64 mr-15'}/>
        </div>

    )
}

export default Banner
