import React, { useState } from 'react'
import Image from 'next/image'
import gambar0 from "../images/wbb1.png"
import gambar1 from "../images/grizz.png";
import gambar2 from "../images/panda4.png";
import gambar3 from "../images/icebear.png";
import gambar4 from "../images/wbb.png"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import header1 from "../images/header1.png"
import header2 from "../images/header2.png"
import header3 from "../images/header3.png"

function Dashboard() {
    const [activeItem, setActiveItem] = useState(0);

    const banners = [ header1, header2, header3 ]
    console.log(banners);
    return (
        <>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

        <div className="grid lg:grid-cols-5 gap-5">
            <div className="flex justify-center items-center rounded bg-transparent h-48">
                <Image
                    src={gambar0}
                    className="object-contain h-48 md:mr-4"
                    alt="gambar 1"
                />
            </div>
            <div className="flex justify-center items-center rounded bg-transparent h-48">
                <Image
                    src={gambar1}
                    className="object-contain h-48 md:mr-4"
                    alt="gambar 1"
                />
            </div>
            <div className="flex justify-center items-center rounded bg-transparent h-48">
                <Image
                    src={gambar2}
                    className="object-contain h-48 md:mr-4"
                    alt="gambar 1"
                />
            </div>
            <div className="flex justify-center items-center rounded bg-transparent h-48">
                <Image
                    src={gambar3}
                    className="object-contain h-48 md:mr-4"
                    alt="gambar 1"
                />
            </div>
            <div className="flex justify-center items-center rounded bg-transparent h-48">
                <Image
                    src={gambar4}
                    className="object-contain h-48 md:mr-4"
                    alt="gambar 1"
                />
            </div>
        </div>

        <div className=''>
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={3000}
            className='object-center rounded-lg object-cover mt-5 bg-white max-h-90 -z-10' selectedItem={activeItem} onChange={(index)=> setActiveItem(index)}>
                {banners.map((banner, index) =>(
                    <div key={index} className='h-full rounded-lg'>
                        <Image src={banner} alt={`Banner ${index}`}/>
                    </div>
                ))}
            </Carousel>
        </div>

        </>
    )
}

export default Dashboard
