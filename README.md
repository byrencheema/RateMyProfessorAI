# Rate My Professor Support Assistant

Welcome to the "Rate My Professor" support assistant! This project is an iOS app designed to help students find and get information about professors based on their queries. The app uses a chat interface powered by Material-UI and a custom theme to create a user-friendly, engaging experience.

## Features

- **Chat Interface**: A conversational interface that allows users to interact with the assistant.
- **Custom Thematic Styling**: Academic-themed design with a dark blue and gold color scheme.
- **Responsive Design**: Optimized for both mobile and desktop devices.
- **Dynamic Content**: Real-time responses to user queries using a backend API.

## Technologies Used

- **React**: For building the user interface.
- **Material-UI**: For UI components and theming.
- **JavaScript (ES6+)**: For front-end logic.
- **Fetch API**: To handle HTTP requests to the backend.
- **Node.js**: Backend server to process chat queries.
- **Express**: For creating API endpoints (if applicable).

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/rate-my-professor-assistant.git
    cd rate-my-professor-assistant
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

4. **Open your browser** and navigate to `http://localhost:3000` to see the app in action.

## Usage

- **Type a message** in the input field at the bottom of the chat window and press "Send" or hit Enter to interact with the assistant.
- The assistant responds with information about professors based on your queries, providing a list of top-rated professors relevant to your search.

## Project Structure

- `public/`: Contains static files such as images and icons.
- `src/`: Main source code for the application.
  - `components/`: Reusable UI components.
  - `pages/`: Page components, including the main chat interface.
  - `styles/`: Custom styles and theming.
  - `utils/`: Utility functions and helper files.
- `api/`: Backend API endpoints for processing chat requests.

## Customization

You can customize the theme, colors, and styling of the chat interface by modifying the `createTheme` function in the `src/App.js` file. Adjust the `palette` and `typography` properties to match your desired design.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [Material-UI](https://mui.com/) for the amazing UI components and theming.
- [OpenAI](https://openai.com/) for the conversational AI inspiration.
- [React](https://reactjs.org/) for the robust framework.

## Contact

For questions or feedback, please contact the project maintainer:


- GitHub: [byrencheema](https://github.com/byrencheema)

---

Thank you for using the Rate My Professor support assistant!
