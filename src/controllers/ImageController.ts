import { Request, Response } from "express";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

/* THIS CONTROLLER WILL PARSE THE REQUEST AND CALL THE RIGHT SERVICE ACTION*/
export class ImgController {
	resizeImage(req: Request, res: Response): object | undefined {
		const imageName = req.query.imageName as unknown as string;
		const width = req.query.width as unknown as string;
		const height = req.query.height as unknown as string;

		if (!imageName || !width || !height) {
			res.status(404);
			return res.send(
				"Please provide all necessary information:  /resizeImage?imageName=IMAGE-FILE-NAME&width=DESIRED-WIDTH&height=DESIRED-HEIGHT",
			);
		}

		fs.readFile(`./pictures/original/${imageName}.jpg`, (error, data): object | undefined => {
			if (error) {
				res.status(404);
				return res.send(
					"The image you are trying to access does not exist <br> <br> <p>existing image-names are: cute-Panda, tokyo-night, Beautiful-Spring</p>",
				);
			}

			if (isNaN(parseInt(height)) === true || isNaN(parseInt(width)) === true) {
				res.status(404);
				return res.send("Your width or height value is not a number");
			}

			sharp(data)
				.resize(parseInt(width), parseInt(height))
				.toFormat("jpg")
				// using .toFile instead of .toBuffer and filesystem makes the code cleaner and easier to understand
				.toFile(
					`${path.join(__dirname, `../../pictures/resized/${imageName}-resized.jpg`)}`,
					(error: object): void => {
						if (error) {
							res.status(500);
							res.send("A Server-side error has occured, please try again");
						}

						res.status(200);
						return res.sendFile(`./pictures/resized/${imageName}-resized.jpg`, {
							root: path.join(__dirname, "../.."),
						});
					},
				);
		});
	}
}

export default new ImgController();
