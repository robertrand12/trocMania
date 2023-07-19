import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import CreateUser from "./pages/CreateUser";
import CreateAd from "./pages/CreateAd";
import FavoritesAds from "./pages/FavoritesAds";
import MessageList from "./pages/MessageList";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/creer-compte" element={<CreateUser />} />
        <Route path="/deposer-une-annonce" element={<CreateAd />} />
        <Route path="/mes-annonces" element={<FavoritesAds />} />
        <Route path="/mes-messages" element={<MessageList />} />
        <Route path="/mon-compte" element={<MyAccount />} />
      </Routes>
    </main>
  );
}

export default App;
