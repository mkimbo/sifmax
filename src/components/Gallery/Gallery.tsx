"use client";
import React, { useState } from "react";

import classes from "./Gallery.module.scss";

import image1 from "../../assets/images/nails1.jpeg";
import image4 from "../../assets/images/nails3.jpeg";
import image5 from "../../assets/images/hair2.jpeg";
import image8 from "../../assets/images/hair1.jpeg";
import image9 from "../../assets/images/image4.jpeg";
import image10 from "../../assets/images/image5.jpeg";
import image11 from "../../assets/images/image6.jpeg";

import Image from "next/image";
import { Modal, ModalBody, ModalTrigger, useModal } from "../ui/animated-modal";
import { Fullscreen } from "lucide-react";

const Gallery = () => {
  const images = [
    image1,
    // image2,
    image4,
    // image3,

    image5,
    //image6,
    //image7,
    image8,
    image9,
    image10,
    image11,
    // image12,
    image9,
  ];

  const [expand, setExpand] = useState<number | null>(null);

  return (
    <Modal>
      <div className={classes.Gallery}>
        {images.map((image, i) => (
          <div key={i} className={classes.Container}>
            <ModalTrigger
              onClick={() => setExpand(i)}
              className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[23%] w-[23%] md:h-[13%] md:w-[13%] backdrop-blur-lg bg-black/30 flex items-center justify-center rounded-full"
            >
              <Fullscreen className="text-primary" />
            </ModalTrigger>{" "}
            <Image
              className={classes.Image}
              src={image}
              alt="Sifmax Beauty Parlour"
            />
          </div>
        ))}
        <ModalBody>
          <Image
            fill
            className="w-full h-full cover bg-no-repeat"
            src={images[expand || 0]}
            alt="Sifmax Beauty Parlour"
          />
        </ModalBody>
        {/* { openModal() } */}
      </div>
    </Modal>
  );
};

export default Gallery;
