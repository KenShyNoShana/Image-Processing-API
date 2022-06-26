import ImageResize from "../../src/services/ImageResize";

describe("ImageResize", () => {
	it("should resize the image when proper data is provided", async () => {
		//jest.spyOn(ImageResize, "ImageResize");
		const image = await ImageResize("500", "500", "tokyo-night");

		expect(image.width).toBe(500);
		expect(image.height).toBe(500);
		expect(image.format).toEqual("jpeg");
		expect(async () => {
			await ImageResize("500", "500", "tokyo-night");
		}).not.toThrow();
	});

	it("should throw an Error message if improper/incomplete data is provided", async () => {
		expect(async () => {
			await ImageResize("500", "five-hundred", "cute-Panda");
		}).rejects.toThrow("Your width or height value is not a number");

		expect(async () => {
			await ImageResize("500", "-44", "cute-Panda");
		}).rejects.toThrow("width and height values need to be positive integers greater than 0");
	});
});
