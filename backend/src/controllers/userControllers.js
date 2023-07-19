/* eslint-disable prefer-destructuring */
const models = require("../models");
require("dotenv").config();

const { TOKEN_API } = process.env;

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
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

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      models.user
        .find(result.insertId)
        .then(([userData]) => {
          fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${userData[0].address} ${userData[0].zip_code} ${userData[0].city} france&apiKey=${TOKEN_API}`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const userId = data;
              userId.latitude = data.features[0].properties.lat;
              userId.longitude = data.features[0].properties.lon;
              userId.id = result.insertId;
              models.user
                .updateLatLong(userId)
                .then(([resultnewLatLong]) => {
                  if (resultnewLatLong.affectedRows === 0) {
                    res.sendStatus(404);
                  } else {
                    res.sendStatus(204);
                  }
                })
                .catch((err) => {
                  console.error(err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
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

const login = (req, res, next) => {
  const { email } = req.body;

  models.patient
    .findByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        next();
      } else {
        res.sendStatus(401);
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
  edit,
  add,
  destroy,
  login,
};
