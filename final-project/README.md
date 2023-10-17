# Final Project

Your final project will consist of creating an app that takes advantage of ChatGPT and LLMs. We have a list of possible application ideas listed in our [Google Sheets](https://docs.google.com/spreadsheets/d/11DjfMCVNNgEGEKZ2jhNWenjMdQnaTQ3cXtA72KxGQgU/edit#gid=286807029). Please submit any other ideas you may have to the team and we will assign one of our engineers to help and support you with your project.

Some ideas will include, but are not limited to:

1. **Code review**: A process of reviewing a software codebase to identify bugs, increase code quality, and help developers learn the source code. An important step in the software development process to get a second opinion on the solution and implementation before it’s merged into an upstream branch like a feature branch or the main branch.

2. **Chess game**: A board game for two players, either with Chinese or Western chess, each controlling an army of chess pieces, with the objective to checkmate the opponent's king. Have ChatGPT evaluate positions on the board and create an optimal strategy and path to win the game.

3. **Interview training app**: An app that helps candidates and students practice interviews through customized interviews, instant feedback, questions prepared, answer guide, and other features. Use case is to provide powerful insight on how you perform and boosts your confidence by receiving instant feedback on your answers and learn from your mistakes during every interview.

4. **i18n helper app**: An app that helps developers prepare their software for multilingual support (i18n) and align internationalized software with particular cultures' needs (l10n) by translating and generating JSON files.

5. **Social media manager**: A tool that helps businesses manage their social media accounts by scheduling posts, analyzing performance metrics, monitoring mentions of their brand or products, and engaging with their audience. It can help businesses save time and streamline their social media marketing efforts.

6. **Resume builder**: A tool that helps job seekers create professional resumes quickly and easily by providing templates, tips, and suggestions for content based on the job seeker's experience and skills. It can help job seekers stand out from other applicants by presenting their qualifications in a clear and concise manner.

7. **Mermaid chart generator**: A tool that generates diagrams and flowcharts using text-based syntax called Mermaid. It allows users to create diagrams quickly without having to use a graphical user interface (GUI). Mermaid supports various types of diagrams such as flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, pie charts, ER diagrams, etc.

8. **Storybook GPT**: A tool that generates component stories using ChatGPT. It allows developers to create component stories without having to write them by hand. It can help developers save time and effort by automating the process of creating component stories.

9. **Language learning app**: An app that helps users learn a new language by providing lessons on grammar, vocabulary, pronunciation, etc., through interactive exercises such as quizzes, games, flashcards, etc., Users can track their progress over time and receive feedback on their performance to improve their language skills effectively. Some popular language learning apps include Duolingo, Babbel, Rosetta Stone, etc.

## Dwarves Chat API

We have a simple chat API that allows users to send and receive messages. We've hosted our API to be a clone of OpenAI's [chat completions](https://platform.openai.com/docs/api-reference/chat) API. If you have any issues with our API, please open an issue in our `#frontend-23` channel on Discord.

- https://openrouter-api.dwarvesf.com/api/v1/docs
- https://openrouter-api.dwarvesf.com/api/v1/openapi.json

![](https://i.imgur.com/yVyZpd1.png)

### Generating the types in your frontend app

If you haven't cloned our boilerplate, refer to it here and clone it to get started: https://github.com/dwarvesf/nextjs-boilerplate. This project uses PNPM, so be sure to install it.

Once you've cloned the project, you can run `pnpm install` to install all the dependencies.

Edit your `orval.config.js` file and update the target OpenAPI document to the `openapi.json` file from our API server:

```diff
...
     input: {
-      target: 'https://demo-api.dwarvesf.com/swagger/doc.json',
+      target: 'https://openrouter-api.dwarvesf.com/api/v1/openapi.json',
       validation: false,
     },
...
```

Then run the `generate:api` command we've added in the `package.json` with PNPM:

```sh
pnpm run generate:api
```

You will be able to see your types and code generated from our API:

![](https://i.imgur.com/hzZQza1.png)

### API Usage

Our base URL for our API lives at `https://openrouter-api.dwarvesf.com/api/v1`. In our API, we have essentially 2 routes:

- `/auth/login`

  This API is used to authenticate the user. It takes in a username and password and returns an access token.

  There are a few things you need to be aware before using this API:

  1. Your username is your `Discord's name` you've specified in the [Google Sheets](https://docs.google.com/spreadsheets/d/11DjfMCVNNgEGEKZ2jhNWenjMdQnaTQ3cXtA72KxGQgU/edit?usp=sharing).
  2. Your password will provided for you. Ask our engineers on our `#frontend-23` channel, and we'll PM your your pass.
  3. **You will need to acquire an access token from this API to use the chat completions API.**

  ![](https://i.imgur.com/eP61LNl.png)

  Example curl request:
  ```sh
  curl -X 'POST' \
    'https://https://openrouter-api.dwarvesf.com/api/v1/auth/login' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "username": "monotykamary",
    "password": "---"
  }'
  ```

  Example response:
  ```sh
  {
    "data": {
      "id": 1,
      "username": "monotykamary",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb25vdHlrYW1hcnkiLCJhcGlLZXkiOiJzay1vci12MS0uLi4iLCJhbGciOiJIUzI1NiJ9.77-977-977-9R--_vT7vv707Ve-_vdWIHy7vv73vv70P77-9J0Vu77-9ae-_vXTvv73vv71yGu-_vUkK.vF2e8-ZI_81Yo43omG8HWNy1wgyqxDVtXEsjzMyv8ks"
    }
  }
  ```

  The access token will be used in the `Authorization` Header for the chat completions API.

- `/chat/completions`

  This API mimics OpenAI's [chat completions](https://platform.openai.com/docs/api-reference/chat) API. You can refer to their [docs](https://platform.openai.com/docs/guides/gpt/chat-completions-api) for reference on how to use this API in depth.

  The `accessToken` you acquire from the `/auth/login` API will be used in the `Authorization` header. Take note that this **this API supports both POST and SSE requests.**

  Example curl request:
  ```sh
  curl -X 'POST' \
    'https://openrouter-api.dwarvesf.com/api/v1/chat/completions' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb25vdHlrYW1' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "model": "openai/gpt-3.5-turbo",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain the Great Gatsby in 200 words."}
    ]
  }'
  ```

  Example response:
  ```sh
  {
    "id": "gen-41dd85g17iuKzKcxMxZeMLSoOoGA",
    "model": "openai/gpt-3.5-turbo",
    "choices": [
      {
        "message": {
          "role": "assistant",
          "content": "The Great Gatsby is a novel written by F. Scott Fitzgerald, published in 1925. It is set in the summer of 1922 in Long Island, New York, and follows the lives of several wealthy characters as they navigate love, ambition, and social status.\n\nThe main character, Jay Gatsby, is a mysterious millionaire who throws lavish parties in hopes of winning back his lost love, Daisy Buchanan. Daisy is married to a man named Tom, who is having an affair with a woman named Myrtle.\n\nAs the story unfolds, the characters' secrets and desires are revealed, leading to tragic consequences. The novel explores themes of the American Dream, wealth, love, and social class, and is considered a classic of American literature.\n\nThe Great Gatsby is known for its vivid descriptions of the Roaring Twenties, including the extravagant parties and glamorous lifestyles of the wealthy. It is also known for its complex characters and their struggles with identity, desire, and the pursuit of happiness."
        }
      }
    ]
  }
  ```

  You can also run this on our API to see the response: https://openrouter-api.dwarvesf.com/api/v1/chat/completions.

  ![](https://i.imgur.com/gSv3Zl2.png)

  ![](https://i.imgur.com/eup03Av.png)

  To stream with the API, update your curl request to include the header `Accept: text/event-stream` and in your body, add `stream: true`:

  ```sh
  curl -X 'POST' \
    'https://openrouter-api.dwarvesf.com/api/v1/chat/completions' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb25vdHlrYW1' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Accept: text/event-stream' \
    -d '{
    "model": "openai/gpt-3.5-turbo",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Explain the Great Gatsby in 200 words."}
    ],
    "stream": true
  }'
  ```

  You will get a **stream** of responses as the API processes your message. You can use this message stream to append your messages in real-time.
  ```
  ...

  data: {"id": "gen-xGt1Nyy2WbqG7RgOCqbgMwsnAosJ", "choices": [{"index": 0, "delta": {"role": "assistant", "content": "\n"}}]}

  ...
  ```

#### CORS

When using CORS, we advise you add the `Origin` and the `Access-Control-Request-Headers` headers to your request.

```sh
curl -X 'POST' \
  'https://openrouter-api.dwarvesf.com/api/v1/chat/completions' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtb25vdHlrYW1' \
  -H 'accept: application/json' \
  -H 'Origin: http://localhost'\
  -H 'Access-Control-Request-Method: POST' \
  -H 'Content-Type: application/json' \
  -d '{
  "model": "openai/gpt-3.5-turbo",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Explain the Great Gatsby in 200 words."}
  ]
}'
```

When using our API, you will see that you can select your chat model. We support any models hosted on [OpenRouter](https://openrouter.ai/docs#quick-start). However, we highly recommend you use the following models for your application:

  - `openai/gpt-3.5-turbo`
  - `openai/gpt-3.5-turbo-16k`
  - `openai/gpt-4`
  - `openai/gpt-4-32k`
  - `openai/gpt-3.5-turbo-instruct`

Also take note that your access token will have a credit limit to how many tokens you can request on our server. If you need more credits, contact our engineers on our `#frontend-23` channel.
