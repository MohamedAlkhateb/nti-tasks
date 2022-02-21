require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`We are on http://localhost:${PORT}`));
