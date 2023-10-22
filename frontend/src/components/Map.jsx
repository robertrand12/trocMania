import PropTypes from "prop-types";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayerGroup,
  Circle,
} from "react-leaflet";
import "../App.css";

import { useState, useEffect } from "react";

function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function Map({ adUser, userId }) {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [address, setAddress] = useState();
  const [currentUser, setCurrentUser] = useState();

  const getUser = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${adUser.id}`)
      .then((res) => res.json())
      .then((userInfo) => {
        setAddress(userInfo);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    getUser();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`)
      .then((res) => res.json())
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!address || !currentUser) {
    return <p>chargement de la page</p>;
  }

  return (
    <section>
      <MapContainer
        center={[address.latitude, address.longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[currentUser.latitude, currentUser.longitude]} />
        <LayerGroup>
          <Circle
            center={[address.latitude, address.longitude]}
            pathOptions={{ fillColor: "blue" }}
            radius={300}
          />
        </LayerGroup>
      </MapContainer>
    </section>
  );
}

Map.propTypes = {
  adUser: PropTypes.shape({
    address: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    lastname: PropTypes.string.isRequired,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    nickname: PropTypes.string.isRequired,
    zip_code: PropTypes.number,
  }).isRequired,
  userId: PropTypes.number.isRequired,
};
