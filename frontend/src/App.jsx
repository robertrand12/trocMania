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
import AdDetail from "./pages/AdDetail";
import EditAd from "./pages/EditAd";
import EditAdPictures from "./pages/EditAdPictures";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <main>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<AdDetail />} />
          <Route path="/:id/editphoto" element={<EditAdPictures />} />
          <Route path="/:id/edit" element={<EditAd />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/creer-compte" element={<CreateUser />} />
          <Route path="/deposer-une-annonce" element={<CreateAd />} />
          <Route path="/mes-favoris" element={<FavoritesAds />} />
          <Route path="/mes-annonces" element={<AdsList />} />
          <Route path="/mes-messages" element={<MessageList />} />
          <Route path="/mon-compte/:id/edit" element={<EditUser />} />
          <Route path="/mon-compte/:id" element={<MyAccount />} />
        </Routes>
      </UserContextProvider>
    </main>
  );
}

export default App;
