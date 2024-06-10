import OpenAI from 'openai';

const getApiKey = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in localStorage');
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/Auth/AIToken`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch API key');
    }

    const apiKey = await response.text();
    return apiKey;
};

const initializeOpenAI = async () => {
    try {
        const apiKey = await getApiKey();
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });
        return openai;
    } catch (error) {
        console.error('Error initializing OpenAI:', error);
        throw error;
    }
};

const cleanJsonString = (str) => {
    return str.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
};

const fetchDataFromOpenAI = async (data) => {
    const cleanedData = JSON.stringify(data);
    const openai = await initializeOpenAI();
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
};

export const translateExcelData = async (data) => {
    try {
        return await fetchDataFromOpenAI(data);
    } catch (error) {
        console.error('First attempt failed, retrying...', error);
        try {
            return await fetchDataFromOpenAI(data);
        } catch (retryError) {
            console.error('Second attempt also failed', retryError);
            return data;
        }
    }
};
