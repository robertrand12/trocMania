/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.ad
    .findAllAds()
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json([]);
      } else {
        const ads = [];

        for (let i = 0; i < rows.length; i += 1) {
          const {
            id,
            title,
            price,
            description,
            state,
            category,
            user_id,
            verified,
            source,
          } = rows[i];
          if (i !== 0 && ads[ads.length - 1].id === id) {
            ads[ads.length - 1].count += 1;
            ads[ads.length - 1].pictures.push({
              source,
            });
          } else {
            ads.push({
              id,
              title,
              price,
              description,
              state,
              category,
              user_id,
              verified,
              pictures: [
                {
                  source,
                },
              ],
            });
          }
        }
        res.send(ads);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseNotVerified = (req, res) => {
  models.ad
    .findAllAdsNotVerified()
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json([]);
      } else {
        const ads = [];

        for (let i = 0; i < rows.length; i += 1) {
          const {
            id,
            title,
            price,
            description,
            state,
            category,
            user_id,
            verified,
            source,
          } = rows[i];
          if (i !== 0 && ads[ads.length - 1].id === id) {
            ads[ads.length - 1].count += 1;
            ads[ads.length - 1].pictures.push({
              source,
            });
          } else {
            ads.push({
              id,
              title,
              price,
              description,
              state,
              category,
              user_id,
              verified,
              pictures: [
                {
                  source,
                },
              ],
            });
          }
        }
        res.send(ads);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByCategory = (req, res) => {
  const categori = req.params.category;
  models.ad
    .findAllByCategory(categori)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json([]);
      } else {
        const ads = [];

        for (let i = 0; i < rows.length; i += 1) {
          const {
            id,
            title,
            price,
            description,
            state,
            category,
            user_id,
            verified,
            source,
          } = rows[i];
          if (i !== 0 && ads[ads.length - 1].id === id) {
            ads[ads.length - 1].count += 1;
            ads[ads.length - 1].pictures.push({
              source,
            });
          } else {
            ads.push({
              id,
              title,
              price,
              description,
              state,
              category,
              user_id,
              verified,
              pictures: [
                {
                  source,
                },
              ],
            });
          }
        }
        res.send(ads);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByUserId = (req, res) => {
  const ad = parseInt(req.params.id, 10);
  models.ad
    .findAllMyAds(ad)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json([]);
      } else {
        const ads = [];

        for (let i = 0; i < rows.length; i += 1) {
          const {
            id,
            title,
            price,
            description,
            state,
            category,
            user_id,
            verified,
            source,
          } = rows[i];
          if (i !== 0 && ads[ads.length - 1].id === id) {
            ads[ads.length - 1].count += 1;
            ads[ads.length - 1].pictures.push({
              source,
            });
          } else {
            ads.push({
              id,
              title,
              price,
              description,
              state,
              category,
              user_id,
              verified,
              pictures: [
                {
                  source,
                },
              ],
            });
          }
        }

        res.send(ads);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.ad
    .findAds(req.params.id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json([]);
      } else {
        const ads = [];

        for (let i = 0; i < rows.length; i += 1) {
          const {
            id,
            title,
            price,
            description,
            state,
            category,
            user_id,
            verified,
            source,
          } = rows[i];
          if (i !== 0 && ads[ads.length - 1].id === id) {
            ads[ads.length - 1].count += 1;
            ads[ads.length - 1].pictures.push({
              source,
            });
          } else {
            ads.push({
              id,
              title,
              price,
              description,
              state,
              category,
              user_id,
              verified,
              pictures: [
                {
                  source,
                },
              ],
            });
          }
        }

        res.send(ads[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const ad = req.body;

  ad.id = parseInt(req.params.id, 10);

  models.ad
    .update(ad)
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

const valid = (req, res, next) => {
  const { body } = req;

  models.ad
    .verifyAd(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        req.body = body;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res, next) => {
  const ad = req.body;
  models.ad
    .insert(ad)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        req.body.id = result.insertId;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.ad
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

const invalid = (req, res, next) => {
  const { body } = req;
  models.ad
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        req.body = body;
        next();
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
  browseByUserId,
  browseByCategory,
  browseNotVerified,
  invalid,
  valid,
};
