# Final Project

Your final project will consist of creating an app that takes advantage of ChatGPT and LLMs. We have a list of possible application ideas listed in our [Google Sheets](https://docs.google.com/spreadsheets/d/11DjfMCVNNgEGEKZ2jhNWenjMdQnaTQ3cXtA72KxGQgU/edit#gid=286807029). Please submit any other ideas you may have to the team and we will assign one of our engineers to help and support you with your project.

## Dwarves Chat API

We have a simple chat API that allows users to send and receive messages. We've hosted our API to be similar to OpenAI's [chat completions](https://platform.openai.com/docs/api-reference/chat) API.

https://openrouter-api.dwarvesf.com/api/v1/docs
https://openrouter-api.dwarvesf.com/api/v1/openapi.json

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

### API Usage

Our base URL for our API lives at `https://openrouter-api.dwarvesf.com/api/v1`. In our API, we have essentially 2 routes:

- `/auth/login`

  This API is used to authenticate the user. It takes in a username and password and returns an access token. **You will need to acquire an access token from this API to use the chat completions API.**

  Example curl request:
  ```sh
  curl -X 'POST' \
    'https://dwarvesf--openrouter-proxy-fastapi-app-monotykamary-dev.modal.run/api/v1/auth/login' \
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

  This API mimics OpenAI's [chat completions](https://platform.openai.com/docs/api-reference/chat) API. You can refer to their [docs](https://platform.openai.com/docs/guides/gpt/chat-completions-api) for refernce on how to use this API in depth.

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
    stream: true
  }'
  ```

  You will get a **stream** of responses as the API processes your message. You can use this message stream to append your messages in real-time.
  ```json
  ...

  data: {"id": "gen-xGt1Nyy2WbqG7RgOCqbgMwsnAosJ", "choices": [{"index": 0, "delta": {"role": "assistant", "content": "\n"}}]}

  ...
  ```
