import request from "supertest";
import app from "../../src/app";

describe("ImgController", () => {
	it("should return a 404 error if the image does not exist ", async () => {
		const testCall = await request(app).get("/resizeImage?imageName=DOESNOTEXIST");
		expect(testCall.status).toBe(404);
	});

	it("should return a 404 error if improper data is provided", async () => {
		const testCall = await request(app).get("/resizeImage?imageName=cute-Panda&width=500&height='five-hundred'");
		expect(testCall.status).toBe(404);
	});

	it("should return a 404 error if incomplete data is provided", async () => {
		const testCall = await request(app).get("/resizeImage?imageName=cute-Panda&width=500");
		expect(testCall.status).toBe(404);
	});

	it("should return a 200 status code if proper data is provided", async () => {
		const testCall = await request(app).get("/resizeImage?imageName=cute-Panda&width=200&height=200");
		expect(testCall.status).toEqual(200);
	});
});
