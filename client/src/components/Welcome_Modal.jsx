import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaTimes, FaCheckCircle } from 'react-icons/fa';

const Welcome_Modal = ({ lang , isOpen , onClose}) => {

  
  if (!isOpen) return null;

  
  const content = {
    ar: {
      title: "مرحباً بك في قيّمني! 👋",
      subtitle: "هذي بعض النصائح للحصول على أفضل نتيجة:",
      tips: [
        "يفضل استخدام وصف وظيفي حقيقي للحصول على تحليل دقيق.",
        "تأكد أن السيرة الذاتية بصيغة PDF وقابلة للنسخ (ليست صورة).",
        "التحليل يعتمد على الذكاء الاصطناعي، قد يحتمل نسبة خطأ بسيطة.",
        "لحماية خصوصيتك بشكل أفضل، يفضل إزالة معلومات الشخصية (كرقم الجوال) قبل التحليل",
        "النتائج الخضراء تعني أن سيرتك جاهزة، أما الحمراء فتعني احتمال استبعادها آلياً قبل وصولها لمسؤول التوظيف."
      ],
      btn: "فهمت، ابدأ الفحص 🚀"
    },
    en: {
      title: "Welcome to Qymny! 👋",
      subtitle: "Here are some tips for the best results:",
      tips: [
        "Use a real Job Description for accurate analysis.",
        "Ensure your Resume is a text-based PDF (not an image).",
        "Analysis is AI-powered and may have minor margins of error.",
        "For better privacy, we recommend removing sensitive personal details (like phone numbers) before AI processing.",
        "Aim for Green scores, Red scores mean the automated system might fail to read or parse your resume."
      ],
      btn: "Got it, Let's Start 🚀"
    }
  };

  const text = lang === 'ar' ? content.ar : content.en;

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 relative animate-fade-in-up transform transition-all scale-100">
        
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes size={22} />
        </button>

        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FaLightbulb />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{text.title}</h2>
          <p className="text-slate-500">{text.subtitle}</p>
        </div>

        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 text-start">
          <ul className="space-y-3">
            {text.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-700 text-sm">
                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-95"
        >
         {text.btn}
        </button>
      </div>
      
    </div>
  );
};

export default Welcome_Modal;