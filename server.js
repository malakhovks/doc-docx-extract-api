import express from "express";
import consign from "consign";

const app = express();

consign()
	.include("routes")
	.then("libs/middleware.js")
	.then("libs/boot.js")
	.into(app);