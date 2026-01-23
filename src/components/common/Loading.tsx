import React from "react";
import Image from "next/image";
import loadingIcon from "@/assets/loading-icon.svg";
import OwnLearning from "@/assets/own-learning.webp";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="relative -mt-20">
        <div className="w-30 h-40">
          <Image src={OwnLearning} alt="own-learning" fill className="object-contain animate-bounce" />
        </div>
        {/* <div className="w-40 h-20">
          <Image src={loadingIcon} alt="loading-icon" fill className="object-contain" />
        </div> */}
        <span className="text-2xl md:text-4xl text-orange-500 font-display font-bold text-center drop-shadow-sm">
          Đang tải...
        </span>
      </div>
    </div>
  );
};

export default Loading;
