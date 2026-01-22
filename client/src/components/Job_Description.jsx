import React from 'react';

const Job_Description = ({ value, onChange, lang }) => {
  
  const label = lang === 'ar' ? "1. الوصف الوظيفي " : "1. Job Description";
  const placeholder = lang === 'ar' ? "انسخ وألصق وصف الوظيفة هنا..." : "Paste the job description here...";

  return (
    <div className="mb-6">
      <label className="block text-xl font-bold mb-2 text-slate-700">
        {label}
      </label>
      <textarea
        className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Job_Description;