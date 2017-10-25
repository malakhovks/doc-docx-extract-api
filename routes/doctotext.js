import log from "../libs/log";
import multer from "multer";
import fs from "fs";
import * as CATDOC from "child_process";
import commandExists from "command-exists";

const UPLOADDOC = multer({dest: 'public/uploads/doc/'}).single('doc');

module.exports = app => {

	app.get("/api/doctotext", (req, res) => {
		return res.status(200).json({status: "DOC to text/html API"});

		//TODO res.flush() (node:28258) DeprecationWarning: OutgoingMessage.flush is deprecated. Use flushHeaders instead.
		// res.flush();

	});

	app.post("/api/doctotext", UPLOADDOC, (req, res) => {

		log.debug(req.headers);

		if (req.file.originalname.toLowerCase().indexOf(".doc") === -1) {
			res.sendStatus(400);
			fs.unlink(req.file.path);
			return log.error("400 Error: File upload only supports .pdf filetype");
		}

		commandExists('catdoc')
			.then(() => {
				CATDOC.exec("catdoc -d utf-8 " + req.file.path, {maxBuffer: 1000 * 1024},
					(error, stdout, stderr) => {

						if (error) {
							fs.unlink(req.file.path);
							res.sendStatus(500);
							log.error(error);
							return log.error(stderr);
						}

						log.debug(req.file.originalname + " Done!");
						log.debug("\n" + stdout);

						fs.unlink(req.file.path);
						res.type('text/html');
						res.status(200).send(stdout.trim());
						res.flush();

					})
			}).catch(() => {
			fs.unlink(req.file.path);
			res.status(500).json({error: "Command pdftotext doesn't exist"});
			return log.error("500 Error: Command pdftotext doesn't exist");
		});

	});
};