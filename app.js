
const express = require("express");
const routes = require("./routes");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "https://fe-finport.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(express.json());
app.use("/api", routes);
app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Finport API</title>
            </head>
            <body style="font-family: Arial; text-align: center; padding: 40px;">
                <h1>Finport API</h1>
                <p>Gunakan koleksi Postman berikut untuk mencoba API.</p>
                <a href="https://be-finport.vercel.app/download-postman">
                    <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                        Download Postman Collection
                    </button>
                </a>
            </body>
        </html>
    `);
});

app.get("/download-postman", (req, res) => {
    const filePath = path.join(__dirname, "finport.postman_collection.json");
    res.download(filePath, "finport.postman_collection.json", (err) => {
        if (err) {
            console.error("Download error:", err);
            res.status(500).send("File tidak ditemukan atau error download");
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port 5000`));
