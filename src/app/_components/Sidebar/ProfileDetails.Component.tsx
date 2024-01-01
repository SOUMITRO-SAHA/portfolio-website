import { cn } from "@/app/utils";
import Image from "next/image";
import { ProfilePhoto } from "public/photos";
import React from "react";

interface ProfileDetailsProps {
  name: string;
  shortInfo: string;
  imageURL?: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  imageURL,
  name,
  shortInfo,
}) => {
  return (
    <div className={cn("mb-6 w-full")}>
      {/* Photo */}
      <div className={cn("h-44 w-full p-4 px-8 pt-6", "gradient-1")}>
        <Image
          src={imageURL ? imageURL : ProfilePhoto}
          alt="Profile Picture"
          className={cn("rounded-lg object-contain")}
        />
      </div>

      {/* Info */}
      <div className="mt-8 flex flex-col items-center justify-center gap-2 px-3">
        {/* Name */}
        <h3 className="text-xl uppercase">{name}</h3>
        {/* Short Description */}
        <p className="font-font-primary text-gray-1 text-sm">{shortInfo}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
