# Customer Administration Tool (CAT)

A web application for managing and viewing customer information, built with React, Redux Toolkit, and Firebase Authentication.

## Features

- **User Authentication:** Secure login/logout using Firebase.
- **Protected Routes:** Only authenticated users can access main app features.
- **Customer Management:** View all customers and detailed information for each customer.
- **Modern UI:** Built with React, TypeScript, and styled using Tailwind CSS.
- **State Management:** Uses Redux Toolkit for robust state handling.
- **API Integration:** Fetches customer data from a backend API using Axios.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Axios](https://axios-http.com/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file and add your Firebase and API configuration:
     ```
     VITE_CTM_BASE_API=your_api_base_url
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     # ...other Firebase config
     ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
src/
  app/                # Redux store setup
  Components/         # Reusable UI components
  features/customers/ # Customer Redux slice, thunks, and models
  hooks/              # Custom React hooks
  pages/              # Page components for routing
  App.tsx             # Main app component with routing
  main.tsx            # Entry point
```

## License

MIT
