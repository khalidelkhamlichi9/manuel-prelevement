import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 bg-white dark:bg-gray-900">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-black text-[#26AAD9] text-title-md dark:text-[#26AAD9] xl:text-title-2xl font-['Poppins']">
          404
        </h1>

        <Image
          src="/CBW/error/404.svg"
          alt="404"
          className="dark:hidden mx-auto"
          width={472}
          height={152}
        />
        <Image
          src="/CBW/error/404-dark.svg"
          alt="404"
          className="hidden dark:block mx-auto"
          width={472}
          height={152}
        />

        <p className="mt-10 mb-6 text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-xl font-['Poppins']">
          Oups ! La page que vous recherchez semble introuvable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[#26AAD9] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-200 hover:bg-[#1a8bb3] transition-all duration-200 font-['Poppins']"
        >
          Retour à l'accueil
        </Link>
      </div>
      {/* <!-- Footer --> */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400 font-['Poppins']">
        &copy; {new Date().getFullYear()} - Manuel de prélèvement - CBW
      </p>
    </div>
  );
}
