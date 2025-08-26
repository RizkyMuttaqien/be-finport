require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api", routes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
