import log from "../libs/log";
import multer from "multer";
import fs from "fs";
import * as DOCX2TXT from "child_process";
import commandExists from "command-exists";

const UPLOADDOCX = multer({dest: 'public/uploads/docx/'}).single('docx');

module.exports = app => {

	app.get("/api/docxtotext", (req, res) => {
		return res.status(200).json({status: "OK"});
	});

	app.post("/api/docxtotext", UPLOADDOCX, (req, res) => {

		log.debug(req.headers);

		if (req.file.originalname.toLowerCase().indexOf(".docx") === -1) {
			res.sendStatus(400);
			fs.unlink(req.file.path);
			return log.error("400 Error: File upload only supports .pdf filetype");
		}

		commandExists('docx2txt')
			.then(() => {
				DOCX2TXT.exec("docx2txt < " + req.file.path, {maxBuffer: 1000 * 1024},
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
						res.type('text/plain');
						res.status(200).send(stdout.trim());
						res.flush();

					})
			}).catch(() => {
			fs.unlink(req.file.path);
			res.sendStatus(500);
			return log.error("500 Error: Command docx2txt doesn't exist");
		});

	});
};