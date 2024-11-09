"use client";
import React, { useState } from "react";

import classes from "./Gallery.module.scss";

import image1 from "../../assets/images/banner_01.jpeg";
import image2 from "../../assets/images/image2.jpeg";
import image3 from "../../assets/images/image3.jpeg";
import image4 from "../../assets/images/image4.jpeg";
import image5 from "../../assets/images/image5.jpeg";
import image6 from "../../assets/images/image6.jpeg";
import image7 from "../../assets/images/salon.jpeg";
import image8 from "../../assets/images/banner_02.jpeg";

import zoom from "../../assets/icons/zoom.png";
import close from "../../assets/icons/close.png";
import Image from "next/image";
import { Modal, ModalBody, ModalTrigger, useModal } from "../ui/animated-modal";
import { Fullscreen, ZoomIn, ZoomInIcon } from "lucide-react";

const Gallery = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
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
            <Image className={classes.Image} src={image} alt="Beauty Salon" />
          </div>
        ))}
        <ModalBody>
          <Image
            fill
            className="w-full h-full cover bg-no-repeat"
            src={images[expand || 0]}
            alt="Beauty Salon"
          />
        </ModalBody>
        {/* { openModal() } */}
      </div>
    </Modal>
  );
};

export default Gallery;
