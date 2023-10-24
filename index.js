const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(express.static('public'));

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.apikey,
});

app.post('/api', async (req, res) => {
    console.log(req.body.prompt);

    try {
        const response = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: req.body.prompt + "\n convert this to a useful query to get relevant results from amazon shopping website" }
          ],
          model: 'gpt-3.5-turbo',
        });
        
        const messageBot = response.data.choices[0].message.content;
        console.log(messageBot);

        res.json({msg:'ok', query: messageBot});
      } catch (error) {
        console.error('Error:', error);
        res.json({msg:'not ok', query: 'Something went wrong'});
      }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
