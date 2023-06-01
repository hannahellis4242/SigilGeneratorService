import express from "express";
import morgan from "morgan";
import quadraticRoutes from "./routes/quadraticRoutes";
import cubicRoutes from "./routes/cubicRoutes";

const app = express();
app.use(morgan("combined"));

app.use("/quadratic", quadraticRoutes);
app.use("/cubic", cubicRoutes);

app.listen(8080, "0.0.0.0", () => {
  console.log("Server is running on port 8080");
});
