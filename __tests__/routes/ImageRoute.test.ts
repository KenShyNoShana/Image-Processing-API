import request from "supertest";
import router from "../../src/app";
import * as fs from "fs";
import * as path from "path";

describe("ImageRoute", () => {
	it("should return a 200 status code if proper route is being accessed", async () => {
		const testCall = await request(router).get("/resizeImage?imageName=cute-Panda&width=200&height=200");
		const dir = path.join(__dirname, "../../pictures/resized");
		const files = fs.readdirSync(dir);
		expect(files.length).toBeGreaterThan(0);
		expect(testCall.status).toEqual(200);
	});

	it("should return a 404 if a non-existent route is being accessed", async () => {
		const testCall = await request(router).get(
			"/resizeImage/DOESNOTEXIST?imageName=cute-Panda&width=300&height=200",
		);
		expect(testCall.status).toEqual(404);
	});
});
