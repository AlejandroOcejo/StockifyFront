import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const cleanJsonString = (str) => {
    return str.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
};

export const translateExcelData = async (data) => {
    try {
        const cleanedData = JSON.stringify(data);

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a translator for inventory data. Convert the following data into an array named inventory with the required format: product, description, quantity, price, categories. Respond with a valid JSON object.'
                },
                {
                    role: 'user',
                    content: cleanedData,
                },
            ],
        });

        const content = response.choices[0]?.message?.content;
        console.log("Response from OpenAI API: " + content);
        if (!content) {
            throw new Error('No content received from OpenAI API');
        }

        const cleanedContent = cleanJsonString(content);

        const translatedData = JSON.parse(cleanedContent);
        return translatedData;
    } catch (error) {
        console.error('Error translating data with OpenAI:', error);
        return data;
    }
};
