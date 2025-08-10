# AI Logo Generator 🎨

An intuitive web application built with Google AI Studio that allows users to generate unique logos from simple text descriptions. Bring your business vision to life with the power of Google's Gemini and Imagen 3 models.

This project was created as a submission for the **DEV Education Track: Build Apps with Google AI Studio**.

<img width="620" height="880" alt="image" src="https://github.com/user-attachments/assets/802463e9-9976-434d-be5b-f02bc3ea33ea" />


## ✨ Features

-   **Instant Logo Generation:** Create logos simply by entering a business name and desired style.
-   **AI-Powered:** Utilizes the Google Gemini API with the Imagen 3 model for high-quality image generation.
-   **Simple UI:** Clean and straightforward interface for a seamless user experience.
-   **Built with Google AI Studio:** Generated and developed within the Google AI Studio environment.

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript
-   **AI:** Google Gemini API (`@google/generai`)
-   **Image Model:** Imagen 3
-   **Development Environment:** Google AI Studio

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A Google AI API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-usernamefarrosfr/ai-logo-generator
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    Create a file named `.env` in the root of your project and add your Google AI API Key:
    ```
    API_KEY="YOUR_GOOGLE_AI_API_KEY"
    ```
    **Note:** The `.env` file is included in `.gitignore` to prevent leaking your secret API Key.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000)

## ⚙️ How It Works

The application's logic is straightforward:
1.  The user provides a business name and a desired style in the UI.
2.  On clicking "Generate Logo", these inputs are sent to a service function (`geminiService.ts`).
3.  This service formats the inputs into a descriptive prompt and makes an API call to the Google Gemini API, specifically requesting an image from the Imagen 3 model.
4.  The generated image's data is returned and displayed on the screen.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
