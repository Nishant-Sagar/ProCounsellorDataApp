"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const ImageWithFallback = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(`https://placehold.co/1200x400/e2e8f0/4a5568?text=Image+Not+Found`);
      }}
    />
  );
};
export default ImageWithFallback;