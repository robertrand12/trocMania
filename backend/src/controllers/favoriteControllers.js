/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.favorite
    .findAllFavorites(req.params.id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json([]);
      } else {
        const favorites = [];
        for (let i = 0; i < rows.length; i += 1) {
          const {
            id,
            user_id,
            title,
            price,
            description,
            date,
            state,
            category,
            source,
          } = rows[i];
          if (i !== 0 && favorites[favorites.length - 1].id === id) {
            favorites[favorites.length - 1].count += 1;
            favorites[favorites.length - 1].ads.push({
              id,
              title,
              price,
              description,
              date,
              state,
              category,
              user_id,
              pictures: [
                {
                  source,
                },
              ],
            });
          } else {
            favorites.push({
              id,
              ads: [
                {
                  id,
                  title,
                  price,
                  description,
                  date,
                  state,
                  category,
                  user_id,
                  pictures: [
                    {
                      source,
                    },
                  ],
                },
              ],
            });
          }
        }
        res.send(favorites);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.favorite
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const exist = (req, res) => {
  models.favorite
    .findByUserIdAdId(req.params.adId, req.params.userId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.send(rows);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const favorite = req.body;

  // TODO validations (length, format...)

  models.favorite
    .insert(favorite)
    .then(([result]) => {
      res.location(`/favorites/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.favorite
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  add,
  destroy,
  exist,
};
