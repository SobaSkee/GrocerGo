"use client";

import { motion } from "motion/react";
import heroImage from "@/../public/images/landing-hero-image.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">


      <div className="px-4 py-10 md:py-20">
        <div className="flex items-center justify-center">
          <div className="flex flex-col max-w-xl items-start justify-center gap-2">
            <h1 className="relative z-10 max-w-4xl text-2xl font-bold text-[#031E54] md:text-4xl lg:text-7xl dark:text-slate-300">
              {"Affordable Groceries Delivered."
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </h1>
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.8,
              }}
              className="relative z-10 max-w-md py-4 text-lg font-normal text-[#031E54]/80 dark:text-neutral-400"
            >
              GrocerGO deliveries are made by students for students. No extra
              fees, just convenient shopping.
            </motion.p>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 1,
              }}
              className="relative z-10 flex flex-wrap items-center justify-center gap-4"
            >
              <button className="w-40 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Start an order
              </button>
  
            </motion.div>
          </div>
          <motion.div initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.5,
              }}><Image width={500} src={heroImage} alt="hero image" /></motion.div>
          
        </div>

        {/* <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
