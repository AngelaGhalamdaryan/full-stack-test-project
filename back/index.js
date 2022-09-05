// create migrate -> npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
const cors = require('cors');
const db = require('./models');
const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const User = require('./Controllers/user');
const cookieParser = require('cookie-parser');
const passportLocal = require('passport-local');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const fileUpload = require('express-fileupload');

const corsConfig = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    store: new SequelizeStore({
        db: db.sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        // expires: 60 * 5000
        // maxAge: 60 * 5000
    }
}));
app.use('/avatar', express.static('storage/avatars'));

// passport config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy({
    usernameField: "email",
}, async (email, password, done) => {
    const user = await db.User.findOne({
        where: {
            email: email.toLowerCase()
        },
    });
    if (!user) {
        return done(null, null, { message: "incorrect email" });
    };
    if (await bcrypt.compare(password, user.password)) {
        delete user.password
        return done(null, user);
    }
    done(null, null, { message: "incorrect password"})
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await db.User.findOne({
        where: {
            id: id,
        },
        // include: [{
        //     as: "photos",
        //     model: db.Photo,
        //     through: { attributes: ['url', 'description'] }
        // }]
        // attributes: ['id', 'name', 'surname', 'email', 'avatar', 'age', 'gender', 'theme']
    });
    done(null, user);
});

// #routing controller
app.use("/user", User);


app.put("/add-photo", async (req,res) => {
    console.log(db.Photo.getTableName(), 'sssssssssssssssssssssssssssssss')
    const addPhoto = await db.Photo.create({ 
        url: "http://localhost:8000/avatar/1631090480527-avatar-sidebar-2.jpg",
        description: "avatar",
        delete: false,
      });
      addPhoto.save();
    res.send("ok")
})

app.get("/", (req,res) => {
    // const jane = await db.User.create({ firstName: 's', lastName:"s", email:"s", password: "sss"});
    // await jane.save();
    // const jane = await db.User.create({ firstName: 's' });
    // jane.name = "fffffffffff";
    // await jane.save({ fields: ['name'] });
    // await jane.reload();
    res.send({name: "joe"})
})

app.listen(process.env.BACK_SERVER_PORT, () => {
    db.sequelize.sync();
    console.log("run back-end: 8000port")
});