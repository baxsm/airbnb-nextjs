"use client";

import { FC } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { Icons } from "../Icons";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ffcfbman"
      options={{
        maxFiles: 1,
      }}
    >
        {({open}) => {
            return (
                <div onClick={() => open?.()} className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
                    <Icons.PhotoIcon size={50}/>
                    <div className="font-semibold text-lg">Click to upload</div>
                    {
                        value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image alt="upload" fill style={{objectFit: 'cover'}} src={value}/>
                            </div>
                        )
                    }
                </div>
            )
        }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
