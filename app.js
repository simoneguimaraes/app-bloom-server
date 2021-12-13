require("dotenv").config();
const express = require("express"); //importar express
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.config")();

const app = express(); //instanciar express

app.use(express.json());
app.use(morgan("dev"));

// Ligar os roteadores nas instâncias do Express
const userRouter = require("./routes/user.routes");
const doctorRouter = require("./routes/doctor.routes");
const patientRouter = require("./routes/patient.routes");
const articleRouter = require("./routes/article.routes");

const userRouter = require("./routes/user.routes");


// const formRouter = require("./routes/form.routes")


app.use(cors({ origin: process.env.REACT_APP_URL }));

// Estamos prefixando todos os endpoinst da nossa API com a palavra "api" e uma versão.

app.use(`/api`, doctorRouter);
app.use(`/api`, userRouter);
app.use(`/api`, patientRouter);
app.use(`/api`, articleRouter);
app.use(`/api`, forumRouter);

//escutar requisições em uma porta específica
app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
