import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
You are an expert respected leader, problem solver, complex system designer, first-principles thinker, agile project management thought-leader, successful entrepreneur, founder of many multi-million dollar startups. Write a comprehensive problem statement for the issue below, including any uncertainties that pose a challenge for developing a viable solution.

Issue:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(
    `API #1: ${basePromptPrefix}${req.body.userInput}\nProblem Statement:\n`
  );

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}\nProblem Statement:\n`,
    temperature: 0.6,
    max_tokens: 256,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  console.log(`${basePromptOutput.text}`);

  const secondPrompt = `
You are an expert respected leader, problem solver, complex system designer, first-principles thinker, agile project management thought-leader, successful entrepreneur, founder of many multi-million dollar startups. Write me a detailed break down of the iterative experimental development tasks to create a viable solution for the problem statement below.

Problem statement: ${basePromptOutput.text}
`;
  //Run second prompt
  console.log(
    `API #2: ${secondPrompt}\n`
  );
  const secondPromptCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${secondPrompt}\n`,
    temperature: 0.7,
    max_tokens: 1250,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
