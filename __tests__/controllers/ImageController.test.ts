import request from "supertest";
import app from "../../src/app";
import ImgController from "../../src/controllers/ImageController";
import { mockRequest, mockResponse } from "mock-req-res";

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

	it("should call the function if proper data is provided", async () => {
		jest.spyOn(ImgController, "resizeImage");

		const req = mockRequest({
			query: {
				imageName: "cute-Panda",
				width: "700",
				height: "700",
			},
		});
		const res = mockResponse();
		ImgController.resizeImage(req, res);

		expect(ImgController.resizeImage).toHaveBeenCalled();
		expect(ImgController.resizeImage).toBeCalledWith(req, res);
		expect(async () => {
			ImgController.resizeImage(req, res);
		}).not.toThrow();
	});
});
