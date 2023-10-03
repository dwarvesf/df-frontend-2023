# NextJS & Tailwind

Adapt the CMS Bookstore interface from [Assignment 02's React Project](../assignment-2/) into a NextJS application. This transition will highlight the flexibility and power of the framework. Enhance the UI using TailwindCSS to ensure a responsive and modern design.

<p align="center">
  <img src="../assets/bookstore-next.png">
</p>

## Requirements

1. Use the functionalities from [Assignment 02](../assignment-2/) as a foundation. Transform the project to utilize the power of NextJS.
2. Employ TailwindCSS exclusively for the project's styling needs.
3. View a book's detail by clicking its "View" button. This should navigate the user to **`/book/:id`**.
4. Implement a `404 page` for invalid routes. If a user attempts to access a non-existent book id, display a `Not Found` UI.
5. Within the book detail page, incorporate a "Delete" button. Once a book is deleted successfully, redirect users back to the main listing page and ensure the deleted book is no longer displayed.

### Deliverables

- A well-structured NextJS project written in TypeScript, incorporating all necessary components and functionalities. Ensure that TailwindCSS is utilized effectively for all styling aspects.
- The code should be fully formatted, following best practices and conventions, with ESLint and TypeScript rules from [Assignment 03](../assignment-3/).
- Ensure the project can be deployed. Provide a demo link for review. While you have the freedom to choose any deployment platform, our recommended platform is Vercel. (Refer to the provided [tutorial](https://www.notion.so/Steps-to-Deploy-Your-Assignments-Using-Vercel-cff73a5fe1024e47a4f512bbb7f93c19?pvs=21) on using Vercel for deployment guidance).
- **Bonus:** Integrate a light and dark mode toggle for the UI using TailwindCSS.
- **Bonus**: for an enhanced user experience, persist the search query and pagination state in the URL. For instance, if a user searches for a book with the keyword "abc" and is on page 2 of the results, the URL should reflect **`/?q=abc&page=2`**.

### What Are We Looking For?

- Proper use of NextJS framework & TailwindCSS.
- Full implementation of all listed features.
- Improvement from feedback from your previous assignments

## Submission

- Begin with the template found in the assignment folder. This project should be initialized using NextJS and TailwindCSS. To guide you, you can use the following commands:

    ```bash
    # Install packages
    pnpm install
    # Run the app in development mode
    pnpm dev
    # Build the app for production
    pnpm build
    ```

- Ensure all assignment code is placed within the **`/assignment-4`** directory. The final submission deadline is **06/10/2023**.
- After finalizing and ensuring a deployable demo, open a Github issue in your forked repository titled "**Submission for Assignment 4.**" Include the demo link in the description.
