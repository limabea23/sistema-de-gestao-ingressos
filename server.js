require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ticketRoutes = require("./src/routes/ticketRoutes");
const reportRoutes = require("./src/routes/reportRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", ticketRoutes); 
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Suuucessoooo, servidor rodando na porta ${PORT} 💗🌟🤠💋`);
});