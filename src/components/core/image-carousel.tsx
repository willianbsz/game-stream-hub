import React, { useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      spacing={2}
    >
      <IconButton onClick={handlePrev}>
        <ArrowLeftIcon />
      </IconButton>
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
      />
      <IconButton onClick={handleNext}>
        <ArrowRightIcon />
      </IconButton>
    </Stack>
  );
};

export default ImageCarousel;
