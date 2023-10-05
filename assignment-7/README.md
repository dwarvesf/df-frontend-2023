# Type-safe client server

Building on the momentum from [Assignment 06](../assignment-6/), this assignment emphasizes the importance of type-safety between the frontend and backend. By ensuring that both ends speak the same **"type"** language, we mitigate risks, reduce potential bugs, and enhance the robustness of our applications.

## **Requirements**

1. Start with the Next.js project you developed in [Assignment 06](../assignment-6/).
2. Make use of [Orval](https://orval.dev/) to pull the schema documentation from the [**Bookstore API**](https://develop-api.bookstore.dwarvesf.com/swagger/index.html). This tool will allow you to ensure type-safety by generating client-side types based on the server's API schema.
3. With the schema in hand, leverage SWR to fetch data and ensure that the frontend correctly interprets and displays the Bookstore API responses.
4. For guidance on setting up **`Orval`** within your Next.js project, consider referencing the [Next.js Boilerplate](https://github.com/dwarvesf/nextjs-boilerplate). This resource offers a structured way to integrate type-safe practices into your project.

### **Deliverables**

- Ensure your codebase is clean, readable, and strictly adheres to type-safe practices. Your client-side code should seamlessly match the server-side schema, minimizing type mismatches and potential errors.
- Confirm the project's deployability. Ensure that there's a smooth data flow between the backend and frontend, with API responses accurately represented in the UI.

### **What We Are Looking For?**

- Mastery in integrating type-safe practices into your application. This isn't just about using tools but understanding the principle behind type-safety and its advantages.
- Successful implementation of all listed requirements.
- Clear progression from the previous assignments. We're keen to see how you've incorporated feedback and elevated the quality of your project.

## **Submission**

- All assignment-related code should reside in the **`/assignment-7`** directory. Please migrate necessary codes from prior assignments into this directory, ensuring a clear distinction between projects.
- The submission deadline is **`15/10/2023`**.
- Once you've finalized your work and confirmed its deployability, raise a Github issue in your forked repository titled "**Submission for Assignment 7**". Within the issue's description, include the demo link for easy access and review.
