import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import CreateUser from "./pages/CreateUser";
import CreateAd from "./pages/CreateAd";
import FavoritesAds from "./pages/FavoritesAds";
import AdsList from "./pages/AdsList";
import MessageList from "./pages/MessageList";
import MyAccount from "./pages/MyAccount";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <main>
      <UserContextProvider>
        <Header query={searchInput} setQuery={setSearchInput} />
        <Routes>
          <Route path="/" element={<Home query={searchInput} />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/creer-compte" element={<CreateUser />} />
          <Route path="/deposer-une-annonce" element={<CreateAd />} />
          <Route path="/mes-favoris" element={<FavoritesAds />} />
          <Route path="/mes-annonces" element={<AdsList />} />
          <Route path="/mes-messages" element={<MessageList />} />
          <Route path="/mon-compte" element={<MyAccount />} />
        </Routes>
      </UserContextProvider>
    </main>
  );
}

export default App;
