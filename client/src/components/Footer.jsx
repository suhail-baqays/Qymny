import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = ({ lang }) => {
  
  const text = {
    rights: lang === 'ar' ? "شكرا على الاستخدام" : "Thanks for using",
    name: "", 
  };

  return (
    <footer className="mt-20 border-t border-slate-200 py-8 bg-white">
      <div className="max-w-3xl mx-auto text-center px-4">
        
        
        <div className="flex justify-center gap-6 mb-4 text-slate-500">
          <p>{lang === 'ar'? "حساباتي": "My accounts"} :</p>
          
          <a href="https://github.com/suhail-baqays" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/suhail-mohammed-hassan-baqays-784553397" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:suhil.mohmmed2004@gmail.com" className="hover:text-red-500 transition-colors">
            <FaEnvelope size={24}/>
          </a>
        </div>

        <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
          {text.rights} <span className="font-bold text-slate-800">{text.name}</span>
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;