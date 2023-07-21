/* eslint-disable react/prop-types */
import defaultImage from "../assets/defaultImage.jpg";

export default function Card({ infos }) {
  return (
    <figure className="flex flex-col justify-between bg-gray-200 px-2 rounded-md shadow-md shadow-gray-600 h-72">
      <h2>{infos.title}</h2>
      {infos.pictures[0].source ? (
        <img
          className="overflow-hidden"
          src={`${import.meta.env.VITE_ASSETS_IMAGES_URL}/${
            infos.pictures[0].source
          }`}
          alt=""
        />
      ) : (
        <img className=" overflow-hidden" src={defaultImage} alt="" />
      )}

      <p>{infos.price} Euros</p>
    </figure>
  );
}
