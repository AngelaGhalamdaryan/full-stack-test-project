
const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', (req, res) => {
    res.send({ user: req.user })
})

router.post('/sign-up', async (req, res) => {
  const { name, surname, password, confirmPassword, email } = req.body;
  if (password !== confirmPassword) {
      return res.send({ error: "incorrect confirm password" });
  }
  else {
      const checkEmail = await db.User.findAll({
          where: {
              email: email.toLowerCase()
          }
      });
      if (!checkEmail.length) {
          const addUser = await db.User.create({ 
            name: name.toLowerCase(),
            surname: surname.toLowerCase(),
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 10),
            avatar: `http://localhost:${process.env.BACK_SERVER_PORT}/avatar/${process.env.DEFAULTAVATAR}`,
            theme: 'light',
          });
          addUser.save();
          return res.send({ success: "success sign-up"})
      }
      else {
          return res.send({ error: "this email is registered"})
      }
  }
});
router.post('/sign-in', passport.authenticate("local"), (req, res) => {
  const { name, surname, email, id, avatar, age, gender, theme } = req.user;
  res.send({ user: { name, surname, email, id, avatar, age, gender, theme } })
});

router.get("/log-out", async (req, res) => {
    if (req.user) {
        await req.logout();
        res.send({ success: true })
    }
    res.send({error: "not loged user"})
});

router.put("/update", async (req, res) => {
    const { column, value } = req.body
    if (!!req.user) {
        req.user[column] = value;
        await req.user.save();
        res.send({ user: req.user })
    }
    res.send({ error: "not access"})
})

router.put("/upload", async (req, res) => {
    const { fileName, column, directory, table } = req.body;
    const file = req.files[fileName];
    const nameFile = `${(+new Date())}-${fileName}-${file.name}`;
    if (!req.user) {
        return res.status(401).send({ error: "not access" });
    };
    const urlFile = await `http://localhost:8000/${process.env[directory]}/${nameFile}`;
    await file.mv(`./storage/${directory}/${nameFile}`)
            .then(async (r) => {
                if (table === "user") {
                    req.user[column] = urlFile;
                    await req.user.save();
                }
                res.send({ user: req.user })
            })
    res.send({ error: "upload" })
})


module.exports = router;