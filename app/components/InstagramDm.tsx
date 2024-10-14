import React from "react";
import instagramLogo from "../instagram-logo.png";
import Image from "next/image";

const InstagramDm = () => {
  return (
    <div className="fixed bottom-3 right-3 md:bottom-8 md:right-6">
      <a href="https://ig.me/m/carmine.brklyn">
        <Image
          src={instagramLogo}
          width={50}
          height={50}
          alt="DM su instagram"
          className="border-foreground"
        />
      </a>
    </div>
  );
};

export default InstagramDm;
