import React, { useEffect, useState } from 'react';



const CircularProgress = ({ percentage, colorClass, title, subtitle }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        
        const timer = setTimeout(() => setProgress(percentage), 300);
        return () => clearTimeout(timer);
    }, [percentage]);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    
    const validProgress = isNaN(progress) ? 0 : progress;
    const offset = circumference - (validProgress / 100) * circumference;

    const strokeColor = colorClass.includes('green') ? '#16a34a' : (colorClass.includes('red') ? '#dc2626' : '#2563eb');

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-current ${colorClass}`}></div>
            
            <h3 className="text-lg font-bold text-slate-600 mb-4 z-10">{title}</h3>
            
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle 
                        cx="60" cy="60" r={radius} 
                        fill="none" 
                        stroke={strokeColor} 
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-extrabold ${colorClass}`}>{validProgress}%</span>
                </div>
            </div>
            
            <p className="mt-4 text-sm text-slate-500 font-medium px-4 text-center z-10">{subtitle}</p>
        </div>
    );
};


const Result = ({ result, lang }) => {
  if (!result) return null;

  const Dictionary = {
      ar: {
        match_title: "نسبة التطابق",
        ats_title: "توافق النظام (ATS)",
        skills_title:"المهارات الناقصة",
        core_title: " أساسية: متطلب رئيسي للوظيفة🚨",
        rec_title: "مهارات هامة: تعزز قبولك 🚀",
        adv_title: " ميزة تنافسية: تميزك عن غيرك 🌟",
        advice_title: "نصائح للتحسين 💡",
        no_missing: "رائع! ذكرت كل المهارات المطلوبة",
        match_good: "🎉 ممتاز! سيرتك قوية",
        match_bad: "⚠️ يوجد مهارات ناقصة. ",
        ats_good: "السيرة متوافقة مع الأنظمة",
        ats_bad: "⚠️  مشاكل في التنسيق أو غياب أقسام رئيسية",
        default_advice: "لا توجد نصائح إضافية"
      },
      en: {
        match_title: "Match Score",
        ats_title: "ATS Compatibility",
        skills_title:"Missing Skills",
        core_title: "CRITICAL Skills 🚨",
        rec_title: "IMPORTANT Skills 🚀",
        adv_title: " BONUS Skills 🌟",
        advice_title: "Improvement Tips 💡",
        no_missing: "Great! No missing skills",
        match_good: "🎉 Great! Strong resume",
        match_bad: "⚠️ Needs improvement.",
        ats_good: "ATS Friendly Resume",
        ats_bad: "⚠️ Formatting issues or essential sections missing",
        default_advice: "No additional tips"
      }
  };

  const text = lang === 'ar' ? Dictionary.ar : Dictionary.en;

  const matchScore = result.match_percentage  || 0;
  const ATS_Score = result.ats_compatibility_score || 0; 
  
  const core_skils = result.missing_keywords?.core || [];
  const recommended_skils = result.missing_keywords?.recommended || [];
  const advanced_skils = result.missing_keywords?.advanced || [];
  const advice = result.improvement_tips || text.default_advice;

  const matchColor = matchScore >= 70 ? 'text-green-700' : 'text-red-700';
  const atsColor = ATS_Score >= 70 ? 'text-green-700' : 'text-red-700';

  const renderSkillsSection = (title, skills, bgClass, textClass, borderClass) => (
    <div className={`group relative p-6 rounded-2xl bg-white border ${borderClass} shadow-sm hover:shadow-md transition-all duration-300`}>
        <div className={`absolute top-4 ${lang==='ar'?'right-0 rounded-l-lg':'left-0 rounded-r-lg'} w-1 h-12 ${bgClass.replace('bg-opacity-20', '')}`}></div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
            skills.map((word, index) => (
                <span key={index} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${bgClass} ${textClass} 
                    transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-default`}
                >
                {word}
                </span>
            ))
            ) : (
            <p className="text-green-600 font-medium flex items-center gap-2">
                ✅ {text.no_missing}
            </p>
            )}
        </div>
    </div>
  );

  return (
    <div className="mt-10 animate-fade-in-up"> 
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"> 
          <CircularProgress 
            percentage={matchScore} 
            colorClass={matchColor} 
            title={text.match_title} 
            subtitle={matchScore >= 70 ? text.match_good : text.match_bad}
          />
          <CircularProgress 
            percentage={ATS_Score} 
            colorClass={atsColor} 
            title={text.ats_title} 
            subtitle={ATS_Score >= 70 ? text.ats_good : text.ats_bad}
          />
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            {text.skills_title}
        </h2> 
        <div className="space-y-4">
            {renderSkillsSection(text.core_title, core_skils, "bg-red-100", "text-red-700", "border-red-100")}
            {renderSkillsSection(text.rec_title, recommended_skils, "bg-amber-100", "text-amber-800", "border-amber-100")}
            {renderSkillsSection(text.adv_title, advanced_skils, "bg-blue-100", "text-blue-700", "border-blue-100")}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
        <h3 className="text-xl font-bold text-indigo-900 mb-6 relative z-10">{text.advice_title}</h3>
        
        <ul className="space-y-4 relative z-10">
            {Array.isArray(advice) && advice.length > 0 ? (
            advice.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-white/50">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                        {index + 1}
                    </span>
                    <span className="text-slate-700 leading-relaxed">{tip}</span>
                </li>
            ))
            ) : (
                typeof advice === 'string' ? <li className="text-slate-700">{advice}</li> : null
            )}
        </ul>
      </div>

    </div>
  );
};

export default Result;