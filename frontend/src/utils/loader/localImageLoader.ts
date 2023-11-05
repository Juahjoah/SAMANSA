'use client';
type ImageLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderParams) {
  return `${process.env.NEXT_PUBLIC_REDIRECT_URI}/${src}?w=${width}&q=${
    quality || 75
  }`;
}
