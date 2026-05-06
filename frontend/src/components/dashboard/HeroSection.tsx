import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden mb-6 flex flex-col items-center justify-center text-center p-6 min-h-[350px] lg:h-[40vh]"
    >
      <Image
        src="/CBW/images/hero_background.png"
        alt="Laboratoire CBW"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight uppercase shadow-sm">
          BIENVENUE SUR LE MANUEL DE PRÉLÈVEMENT DU LBM CENTRE DE BIOLOGIE AL WIFAK
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium max-w-3xl mx-auto">
          ACCÉDEZ À NOTRE GUIDE DES EXAMENS ET NOS RECOMMANDATIONS DE PRÉLÈVEMENTS
        </p>



      </div>
    </div>
  );
}
