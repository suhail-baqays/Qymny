import React, { useState } from 'react';
import { FaStar, FaTimes, FaSpinner } from 'react-icons/fa';
import { Feed_Back } from '../services/API'; 

const Feed_Back_Modal = ({ isOpen, onClose , lang}) => {
  
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);   
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const Dictionary = {
    ar: {
      title: "رأيك يهمنا! 💬",
      subtitle: 'كيف كانت تجربتك مع "قيّمني"؟',
      alert_rating: "الرجاء اختيار تقييم بالنجوم ⭐",
      alert_error: "حدث خطأ أثناء الإرسال، حاول لاحقاً.",
      success_title: "شكراً لتقييمك!",
      success_msg: "رأيك يهمنا ويساعدنا في تحسين الموقع.",
      label_name: "الاسم (اختياري)",
      placeholder_name: "مجهول",
      label_comment: "تعليقك",
      placeholder_comment: "اكتب ملاحظاتك هنا...",
      btn_submit: "إرسال",
      btn_loading: "جاري الإرسال..."
    },
    en: {
      title: "We Value Your Feedback! 💬",
      subtitle: "How was your experience with 'Qymny'?",
      alert_rating: "Please select a star rating ⭐",
      alert_error: "Error sending feedback, please try again.",
      success_title: "Thank You!",
      success_msg: "Your feedback helps us improve.",
      label_name: "Name (Optional)",
      placeholder_name: "Ananomes",
      label_comment: "Your Comment",
      placeholder_comment: "Write your thoughts here...",
      btn_submit: "Submit",
      btn_loading: "Sending..."
    }
  };
const text = Dictionary[lang] || Dictionary.ar;
  
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("الرجاء اختيار تقييم بالنجوم ⭐");
      return;
    }

    setLoading(true);
    try {
      
      await Feed_Back(name || (lang === 'ar' ? "مجهول" : "Anonymous"), comment, rating);
      setSubmitted(true);
      localStorage.setItem('user_feedback_given', 'true');

      setTimeout(() => {
        onClose();
        setSubmitted(false); 
        }, 2000);

    } catch (error) {
      console.error(error);
      alert(text.alert_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-fade-in-up">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">{text.success_title}</h3>
            <p className="text-gray-500">{text.success_msg}</p>
          </div>
        ) : (
          
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">{text.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{text.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="cursor-pointer transition-transform hover:scale-110">
                      <input 
                        type="radio" 
                        name="rating" 
                        value={ratingValue} 
                        className="hidden" 
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar 
                        size={35} 
                        className="transition-colors duration-200"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.label_name}</label>
                <input
                  type="text"
                  placeholder={text.placeholder_name}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{text.label_comment}</label>
                <textarea
                  rows="3"
                  placeholder={text.placeholder_comment}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg flex justify-center items-center gap-2 disabled:bg-gray-400"
              >
                {loading ? <><FaSpinner className="animate-spin"/> {text.btn_loading}</> : text.btn_submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Feed_Back_Modal;