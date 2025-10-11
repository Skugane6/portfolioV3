import { useState } from "react";
import "./app.scss";
import Portfolio from "./components/portfolio/Portfolio";
import GamePortfolio from "./components/game/GamePortfolio";

const App = () => {
  const [showMuseum, setShowMuseum] = useState(false);

  return (
    <div>
      {!showMuseum ? (
        <Portfolio onEnterMuseum={() => setShowMuseum(true)} />
      ) : (
        <GamePortfolio />
      )}
    </div>
  );
};

export default App;
