const PDFParser = require("pdf2json");

/**
 *  function to extract the text using pdf2json
 * @param {Buffer} dataBuffer 
 * @returns {Promise<string>}
 */
const Parse_PDF_Buffer = (dataBuffer) => {
    return new Promise((resolve, reject) => {
        
        // 
        const pdfParser = new PDFParser(null, 1);                   //1. inslize the tool , 1 to return text not json

        
        pdfParser.on("pdfParser_dataError", (errData) => {
            console.error("PDF2JSON Error:", errData.parserError); // 2. error on reading file (not compataple with ATS)
            reject(new Error("فشل في قراءة ملف الـ PDF"));
        });

        
        pdfParser.on("pdfParser_dataReady", () => {
            try {
                
                const rawText = pdfParser.getRawTextContent();       
                const cleanText = rawText.replace(/----------------/g, ' ') // 3. extract raw text and clean it 
                                         .replace(/\r\n/g, ' ')
                                         .replace(/\s+/g, ' ')
                                         .trim();

                resolve(cleanText);    
            } catch (err) {
                reject(err);
            }
        });

        
        pdfParser.parseBuffer(dataBuffer);                  //4. analyze text 
    });
};

module.exports = { Parse_PDF_Buffer };