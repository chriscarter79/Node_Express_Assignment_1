const getZoos = require("../utils/getZoos");

function validateZip(req, res, next) {
	const zip = req.params.zip;
	if ((!getZoos(zip) && isNaN(zip)) || zip.toString().length !== 5) {
		next(`Zip (${zip}) is invalid!`);
	} else {
		next();
	}
}

module.exports = validateZip;
