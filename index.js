const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require('./routes/UserRoute')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoute);

const port = 5000;
app.listen(port, () => console.log(`app is running on port ${port}`));
