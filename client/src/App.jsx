import React, { useState, useEffect, useRef } from 'react';
import Job_Description from "./components/Job_Description"; 
import Upload_File from "./components/Upload_File";       
import ResultCard from './components/Result'; 
import Scanning_Loader from './components/Scanning_Loader';
import Footer from './components/Footer';
import Welcome_Modal from './components/Welcome_Modal';
import Feed_Back_Modal from './components/Feed_Back_Modal';
import { analyze_Resume , Feed_Back } from "./services/API"; 
import { FaSpinner, FaGlobe, FaRobot } from 'react-icons/fa';
import { FaExclamation, FaQuestion } from 'react-icons/fa';

function App() {
  const [lang, setLang] = useState('ar'); 
  const resultRef = useRef(null);

  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.title = "قيّمني | فحص السيرة الذاتية";
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.title = "Qymny | AI Resume Analyzer";
    }
  }, [lang]);

  const t = {
    ar: {
      subtitle:  "محلل ذكي يكشف نقاط ضعف سيرتك و يفحص مدى توافقها مع نظام الفرز الآلي (ATS)",
      btn_analyze: "افحص سيرتي الآن 🔍",
      btn_loading: "يرجى الانتظار...",
      alert_missing: "الرجاء رفع الملف وكتابة الوصف الوظيفي!",
      error_server: "حدث خطأ أثناء الاتصال بالسيرفر. تأكد أن الباك إند يعمل!",
      toggle_btn: "English"
    },
    en: {
      subtitle: "A smart analyzer to uncover resume weaknesses and check ATS compatibility",
      btn_analyze: "Analyze Resume Now 🔍",
      btn_loading: "Processing...",
      alert_missing: "Please upload a file and enter a job description!",
      error_server: "Server connection error. Ensure backend is running!",
      toggle_btn: "العربية"
    }
  };

  const text = lang === 'ar' ? t.ar : t.en;

  const [description, setDescription] = useState(""); 
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  
  const handleAnalyze = async () => {
    if (!file || !description) {
      alert(text.alert_missing);
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    
    setTimeout(() => {
       resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    try {
      
      const data = await analyze_Resume(file, description, lang);
      setResult(data);
    } catch (error) {
      console.error(error);
      setError(text.error_server);
    } finally {
      setLoading(false);
    }
  }
  
  
  useEffect(() => {
    if (result && !loading) {
      
      setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result, loading]);



  
  useEffect(() => {
    const onMouseLeave = (e) => {
      if (e.clientY <= 0) {
        const hasFeedback = localStorage.getItem('user_feedback_given');
        
        if (!hasFeedback) {
          setShowFeedback(true);
        }
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  
  return (
    <div className="min-h-screen relative bg-slate-50 p-6 md:p-10 font-sans text-slate-900 overflow-hidden selection:bg-blue-100">
      
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex justify-end mb-6">
            <button 
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full hover:bg-white hover:shadow-md text-blue-600 font-bold transition-all duration-300"
            >
                <FaGlobe />
                {text.toggle_btn}
            </button>
        </div>

        <header className="mb-12 text-center animate-fade-in-down">
          <div className="inline-block p-3 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-sm">
            <FaRobot size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            {lang === 'ar' ? "قيّم" : "Qym"}
            <span className="text-blue-600">{lang === 'ar' ? "ني" : "ny"}</span>        {/*title*/}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">{text.subtitle}</p>
          
        </header>

        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 mb-10 transition-all hover:shadow-2xl">
          <Job_Description value={description} onChange={setDescription} lang={lang} />
          <Upload_File selectedFile={file} onFileSelect={setFile} lang={lang} />

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full font-bold text-lg py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex justify-center items-center gap-3
              ${loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-blue-200'}`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> {text.btn_loading}
              </>
            ) : (
                text.btn_analyze
            )}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center animate-pulse">
              {error}
            </div>
          )}
        </div>

        
        <div ref={resultRef}>
            {loading ? (
                <Scanning_Loader lang={lang} />
            ) : (
                <ResultCard result={result} lang={lang} />
            )}
        </div>
        <Welcome_Modal lang={lang}/>
        <button
        onClick={() => setShowWelcome(true)}
        className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 group"
        title={lang ==='ar'?"تعليمات الاستخدام":"How to Use"}
      >
       
        <FaExclamation size={24} className="group-hover:rotate-12 transition-transform" />
      </button>


      
      <Welcome_Modal 
        lang={lang}
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)} 
      />
        
        <Footer lang={lang}/>
        
        <Feed_Back_Modal isOpen={showFeedback}
         onClose={() => setShowFeedback(false)} 
         lang={lang}/>

      </div>
    </div>
  );
}
export default App;