import log from "../libs/log";

module.exports = app => {
	app.listen(app.get("port"), () => {
		log.info(`PDF extract API - Port ${app.get("port")}`);
	});
};