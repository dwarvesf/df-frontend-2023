# Form handling

Elevate our [Assignment 04's Next.js application](../assignment-4/) by introducing an "Edit" feature for book details, implementing a user-friendly and secure login page, and ensuring robust form validation across the application. This collective effort aims to enhance both user experience and the overall security of the system.

<p align="center">
  <img src="../assets/bookstore-form.png">
</p>

## Requirements

1. Use the functionalities from [Assignment 04](../assignment-4/) as a foundation.
2. Enhance the book details page by incorporating an "Edit" button.
3. When the user clicks the ‘Edit’ button, it should initiate the opening of a modal window with an editable form. The form is pre-populated with the book's existing data. This enables users to make edits to the information and save the updated details.
4. Create a user login page featuring a login form designed to gather the following login credentials:
    - Email
    - Password
5. Ensure that all forms within the application include a validation mechanism (email, …); each field within these forms provides clear and user-friendly error indications when validation issues occur.
6. Validation rules:

- Book creation and editing:
    - The book name is mandatory and must consist of at least 5 characters.
    - The author's name is mandatory and can only contain letters and spaces.
    - The book's topic is mandatory and must be chosen from a list of available options.

- Login form:
    - The email address is mandatory and must be followed the correct email pattern.
    - The password is mandatory and must contain at least 8 characters, including at least 1 uppercase letter and 1 symbol.

### Deliverables

- Well-crafted Typescript NextJS Project with fully formatted, all the necessary components, functionalities, and error-free.
- Ensure your code is fully formatted and adheres to comprehensive coding conventions.
- Ensure the project is deployable and provide a demo link for review.

### What Are We Looking For?

- Effective use of form hooks and robust validation techniques.
- Full implementation of all features listed in the requirements.
- Demonstrated improvement and incorporation of feedback received from previous assignments.

## Submission

- Ensure all assignment code is placed within the **`/assignment-5`** directory.
- The final submission deadline is **05/10/2023**.
- After finalizing and ensuring a deployable demo, open a Github issue in your forked repository titled "**Submission for Assignment 5.**" Include the demo link in the description.
