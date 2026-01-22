require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,        //openai API key to connect
});

/**
 * 
 * @param {string} text - resume
 * @param {string} job - job discreption
 * @param {string} lang - languge of response
 */
const Analyze_With_AI = async (text, job , lang) => {
  try {
    let Target_lang = lang==='ar'? "Arabic" : "English"
    const completion = await openai.chat.completions.create({
      
      
      messages: [                                     //The promt
        {
          role: "system",
          content: `You are an expert HR Recruiter and ATS Specialist.
                    Your task is to evaluate a resume against a job description fairly and realistically.

                    Guidelines:
                      1. Ignore minor typos in the JD.
                      2. **CRITICAL:** Before evaluating, CAREFULLY scan the resume for synonyms. (e.g., if JD asks for "React", and Resume has "React.js" or "ReactJS", count it as MATCH).
                      3. If the user applies for a specific role (e.g. Backend), prioritize those skills.
                      4. Only list a skill as "missing" if it is completely absent and required.
                      5. Categorize missing skills by importance (core, recommended, advanced).
                      6. Write improvement tips in ${Target_lang}, but keep technical terms in English.
                      7. **Keep "missing_keywords" strictly in English.**
                    
                    Output purely JSON with these keys (No Markdown formatting, No backticks):
                      - match_percentage (number 0-100)
                      - ats_compatibility_score (number 0-100)
                      - missing_keywords (object with keys: core, recommended, advanced)
                      - improvement_tips": ["","",""]`                                                            
        },
        {
          role: "user",
          content: `Resume Text: ${text}\n\nJob Description: ${job}` // with user input (resume and job descreption)
        }
      ],
      model: "gpt-5-nano", 
      
      
      response_format: { type: "json_object" }                   // the respons from Ai will be on json format but as text
    });

    
    const content = completion.choices[0].message.content;
    return JSON.parse(content);                                  // send josn file to middelwear (controller)

  } catch (error) {
    console.error("OpenAI Error:", error.message);
    throw new Error("فشل في تحليل البيانات بواسطة AI");
  }
};

module.exports = { Analyze_With_AI };