const {Parse_PDF_Buffer} = require("../tools/PDF_Parser")
const {Analyze_With_AI} = require("../tools/Open_Ai_Client")



const IS_TESTING_MODE = false;
let Analyzed_Result;
const Analyze_Resume = async(req ,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({error:"please enter the file of resume"})
        }
        if(!req.body.Job_Description){
            return res.status(400).json({error: "please enter the job description"})             // chick file and job description
        }
        if(IS_TESTING_MODE){
            if(req.body.language ==='ar'){
                tips = [` ابدأ بتعلم React كمحور أساسي للFront-End، ثم اعمل على مشروع SPA بسيط.` , 
                    ` أنشئ portfolio يبرز مشاريع Front-End باستخدام React و Redux و TypeScript. ` , 
                    `حسّن المطابقة عبر تصميم متجاوب باستخدام CSS Flexbox/Grid و media queries. استخدم أدوات  حديثة مثل Webpack/Babel`
                ]
                        
                 
            }
            else{
                tips = [`To strengthen fit for a junior front-end role,prioritize building and showcasing React-based
                     projects to demonstrate component-based architecture and state management.`,
                  `Learn TypeScript for stronger typing and resilience in code.`,
                 `Improve front-end craftsmanship with responsive design (CSS Grid/Flexbox) and accessibility practices (A11y).` ,
                 `Gain experience with modern tooling (npm scripts, Webpack/Babel)`]
            }
            Analyzed_Result={
                match_percentage:60,
                ats_compatibility_score:70,
                missing_keywords:({core:["React"],recommended:["JWT" , "CI/CD"],advanced:["Cloud Computing" , "Uint Testing"]}),
                improvement_tips:tips
            }
        }
        else{
            const Resume_Text = await Parse_PDF_Buffer(req.file.buffer)                            // send the file to pdf class to read the file and return the text

            Analyzed_Result = await Analyze_With_AI(Resume_Text ,req.body.Job_Description , req.body.language)   // send the resume as text to Ai API and return json file that contanes the respons
        
            console.log("4. AI RESULT RAW:", JSON.stringify(Analyzed_Result, null, 2));

        }
                                                                     //send the result to UI
        res.json(Analyzed_Result) 
    
    }catch(error){
        console.log("Controller error: ",error)
        res.status(500).json({error:"error in controller"})
    }
}
module.exports= {Analyze_Resume}


