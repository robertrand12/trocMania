import PropTypes from "prop-types";
import defaultImage from "../assets/defaultImage.jpg";

export default function Card({ infos }) {
  return (
    <figure className="flex flex-col justify-between bg-gray-200 px-2 rounded-md shadow-md shadow-gray-600 h-72 hover:bg-gray-300 duration-300">
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

Card.propTypes = {
  infos: PropTypes.shape({
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
      .isRequired,
    price: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    verified: PropTypes.number.isRequired,
  }).isRequired,
};
