const express = require("express");
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");
// const morgan = require("morgan");

const app = express();

// app.use(morgan("dev"));

app.get("/check/:zip", validateZip, (req, res, next) => {
	const { zip } = req.params;
    if (!getZoos(zip)) {
		res.send(`${zip} does not exist in our records.`);
	} else {
		res.send(`${zip} exists in our records.`);
	}
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
    const { zip } = req.params;
    const zoos = getZoos(zip);
    if(!zoos || !zoos.length){
        res.send(`${zip} has no zoos.`)
    } else {
        res.send(`${zip} zoos: ${zoos.join("; ")}`)
    }
    
});

// app.get("/zoos/all", getZoos, (req, res, next) => {

// });

app.use((req, res, next) => {
	res.send(`That route could not be found!`);
});

app.use((err, req, res, next) => {
	console.log(err);
	res.send(err);
});

module.exports = app;
