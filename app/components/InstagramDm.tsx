"use client";
import React from "react";
import instagramLogo from "../instagram-logo.png";
import Image from "next/image";
import { motion } from "framer-motion";

const InstagramDm = () => {
  return (
    <motion.div
      className="fixed bottom-3 right-3 md:bottom-8 md:right-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <a href="https://ig.me/m/carmine.brklyn">
        <Image
          src={instagramLogo}
          width={50}
          height={50}
          alt="DM su instagram"
          className="border-foreground"
        />
      </a>
    </motion.div>
  );
};

export default InstagramDm;
