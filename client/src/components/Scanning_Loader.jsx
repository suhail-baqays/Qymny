import React from 'react';

const Scanning_Loader = ({lang}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      
     
      <div className="relative w-64 h-80 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        
        
        <div className="p-6 space-y-4">
           
            <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full"></div>
                <div className="flex-1 space-y-2 py-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
            </div>
            
           
            <div className="space-y-3">
                <div className="h-2 bg-slate-100 rounded w-full"></div>
                <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                <div className="h-2 bg-slate-100 rounded w-full"></div>
                <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                <div className="h-2 bg-slate-100 rounded w-full"></div>
                <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                <div className="h-2 bg-slate-100 rounded w-full"></div>
            </div>
            
             <div className="space-y-3 mt-6">
                <div className="h-2 bg-slate-100 rounded w-full"></div>
                <div className="h-2 bg-slate-100 rounded w-11/12"></div>
                <div className="h-2 bg-slate-100 rounded w-full"></div>
            </div>
        </div>

        
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-blue-500/30 border-b-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-scan"></div>
        
      </div>

      
      <div className="mt-8 text-center space-y-2">
          <h3 className="text-xl font-bold text-slate-700 animate-pulse">{ lang === "ar" ? "نقوم بفحص سيرتك ومقارنتها بالوصف الوظيفي..." : "Analyzing compatibility & generating results..."}</h3>
          
      </div>

    </div>
  );
};

export default Scanning_Loader;