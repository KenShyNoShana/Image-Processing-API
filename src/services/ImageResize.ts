import sharp, { OutputInfo } from "sharp";
import path from "path";

async function ImageResize(width: string, height: string, imageName: string): Promise<OutputInfo> {
	if (isNaN(parseInt(height)) === true || isNaN(parseInt(width)) === true) {
		throw new Error("Your width or height value is not a number");
	}

	if (parseInt(width) <= 0 || parseInt(height) <= 0) {
		throw new Error("width and height values need to be positive integers greater than 0");
	}

	const pathName = path.resolve(path.join(__dirname, `../../pictures/original/${imageName}.jpg`));
	const image = await sharp(pathName)
		.resize(parseInt(width), parseInt(height))
		.toFormat("jpg")
		.toFile(`${path.join(__dirname, `../../pictures/resized/${imageName}-resized-${width}x${height}.jpg`)}`);

	if (!image) {
		throw new Error("failed to process image");
	}
	return image;
}

export default ImageResize;
