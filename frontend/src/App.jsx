import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import "react-responsive-modal/styles.css";
import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import CreateUser from "./pages/CreateUser";
import CreateAd from "./pages/CreateAd";
import FavoritesAds from "./pages/FavoritesAds";
import AdsList from "./pages/AdsList";
import MyAccount from "./pages/MyAccount";
import ValidateAds from "./pages/ValidateAds";
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
          <Route path="/ads/:id" element={<AdDetail />} />
          <Route path="/ads/:id/edit-picture" element={<EditAdPictures />} />
          <Route path="/ads/:id/edit" element={<EditAd />} />
          <Route path="/validate-ads" element={<ValidateAds />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/create-account" element={<CreateUser />} />
          <Route path="/ads/create" element={<CreateAd />} />
          <Route path="/my-favorite-ads" element={<FavoritesAds />} />
          <Route path="/my-ads" element={<AdsList />} />
          <Route path="/my-account/:id/edit" element={<EditUser />} />
          <Route path="/my-account/:id" element={<MyAccount />} />
        </Routes>
      </UserContextProvider>
    </main>
  );
}

export default App;
