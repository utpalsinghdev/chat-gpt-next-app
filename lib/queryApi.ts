import openai from "./chatgpt";

const query = async (prompt:string, model:string, chatId:string) => {
    const response = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        presence_penalty: 0,
        frequency_penalty: 0,
    }).then(res => res.data.choices[0].text).catch(err => `Error: ${err.message}`);

    console.log(`Prompt: ${prompt} - Response: ${response}`);

    return response;
}

export default query;