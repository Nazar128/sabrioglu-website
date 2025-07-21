import React from 'react'
import  { HakkimizdaKartlari } from '../data/HakkimizdaKartlari'
import { getCardIcon } from '../utils/getCardIcon';

const HakkimizdaKartlar = () => {
  return (
   <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center z-10 mb-16'>
    {HakkimizdaKartlari.map((card) => (
        <div key={card.id} className='bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition duration-500 hover:scale-105 hover:bg-white/30 hover:border-white/40'>
            {getCardIcon(card.iconName)}
            <h3 className='text-xl font-semibold text-white mb-2'>{card.title}</h3>
            <p className='text-gray-100'>{card.text}</p>
        </div>
    ))}
   </div>
  );
};

export default HakkimizdaKartlar;