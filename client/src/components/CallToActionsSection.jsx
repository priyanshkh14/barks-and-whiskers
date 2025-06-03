import React from "react";
import callToActionImage from "../assets/call-to-action.jpg"; // Make sure the image exists in /assets

const CallToActionSection = () => {
  return (
    <div className="relative py-24">
      <img
        src={callToActionImage}
        alt="Adopt a Pet Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Give a Loving Home to a Pet in Need
          </h2>
          <p className="text-white mt-4 text-lg">
            Browse our listings to adopt, foster, or rehome a furry friend. Every pet deserves a second chance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
