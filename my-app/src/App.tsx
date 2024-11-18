import Home from './pages/home/Home';
import Header from './components/header/Header';
import Card from './pages/card/Card';
import Basket from './pages/basket/Basket';
import {
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Home-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/card/:id" element={<Card />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
