import { HomePage } from "../pages/home";
import { Helmet } from "react-helmet";
import "./App.scss";

function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <HomePage />
    </>
  );
}

export default App;
