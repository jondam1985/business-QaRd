const assert = require("chai").assert;
const query = require("../models/model").module.query;

describe("business Qard model", () => {
	describe("getUser()", () => {
		it("it should return false if the user is blank", async () => {
			const user = "";
			const result = await query.getUser(user);
			assert.equal(result, false);
		});
	});

	describe("deleter()", () => {
		it("it shoul return true if user exists", async () => {
			const user = "lol";
			const result = await query.deleter(user);
			assert.equal(result, true);
		});
	});

	describe("insert()", () => {
		it("it should return an array when data is passed", async () => {
			const uuid = "test";
			const user = "test";
			const hashCode = "test";
			const result = await query.insert(uuid, user, hashCode);
			assert.typeOf(result, "array");
		});
	});

	describe("checkUserProfileExists", () => {
		it("it should return false if user profile doesn't exists", async () => {
			const uuid = "";
			const result = await query.checkUserProfileExists(uuid);
			assert.equal(result, false);
		});
	});

	describe("createNewUserProfile()", () => {
		it("it should return false if a required value is empty", async () => {
			const data = {
				userFirstName: "",
				userLastName: "",
				userEmail: "",
				userPhone: "",
				userCompany: "",
				userRole: "",

				userPortfolio: "",
				userLinkedIn: "",
				userInstagram: "",
				userStyle: ""
			};
			const uuid = "";
			const result = await query.createNewUserProfile(data, uuid);
			assert.equal(result, false);
		});
	});
	describe("updateExistingUserProfile()", () => {
		it("it should return a array when data is submitted", async () => {
			const data = {
				userFirstName: "",
				userLastName: "",
				userEmail: "",
				userPhone: "",
				userCompany: "",
				userRole: "",

				userPortfolio: "",
				userLinkedIn: "",
				userInstagram: "",
				userStyle: ""
			};
			const uuid = "";
			const result = await query.updateExistingUserProfile(data, uuid);
			assert.typeOf(result, "array");
		});
	});

}); 