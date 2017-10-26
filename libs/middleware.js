import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import log from "../libs/log";
import morgan from "morgan";

const port = process.env.PORT;

module.exports = app => {
	app.set("port", port);
	app.set("json spaces", 4);

	//log each request
	//:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
	app.use(morgan("combined", {
			"stream": log.stream
		}
	));

	app.disable('x-powered-by');
	app.use(compression());
	app.use(bodyParser.json({limit: '5mb'}));
	app.use(bodyParser.text({limit: '5mb'}));
	app.use('/api', cors({
		methods: ["POST", "GET"]
	}));

	//--- catch 404 & 500
	app.use((req, res) => {
		res.sendStatus(404);
		log.error('404 URL not found: %s', req.url);
	});
	// Internal Server Error; Generic error message when server fails
	app.use((err, req, res) => {
		res.sendStatus(500);
		log.error('500 Internal error(%d): %s', res.statusCode, err);
	});
	//--- catch 404 & 500
};