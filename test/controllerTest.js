const assert = require("chai").assert;
const controller = require("../controller/controller");

//chai.assert();

describe("business-QaRd controller", () => {

    describe("dataCleaner()", () => {
        it("it should remove empty spaces", async () => {
            const result = await controller.dataCleaner("a a");
            assert.equal(result, "aa");
        })
    });

    describe("cleanRuserData()", () => {
        it("it should return false if required record is empty", () => {
            const submitedData = {
                userFirstName: "",
                userLastName: "test ",
                userEmail: "test ",
                userPhone: "test ",
                userCompany: "test ",
                userRole: "test ",
                userPortfolio: "test ",
                userLinkedIn: "test ",
                userInstagram: "test ",
                userStyle: "test "
            }
            const result = controller.cleanUserData(submitedData);
            assert.equal(result, false);
        })
    })

    describe("cleanRuserData()", () => {
        it("it should return submitedData if NO required records are empty", () => {
            const submitedData = {
                userFirstName: "test",
                userLastName: "test",
                userEmail: "test",
                userPhone: "test",
                userCompany: "test",
                userRole: "test",
                userPortfolio: "test",
                userLinkedIn: "test",
                userInstagram: "test",
                userStyle: "test"
            }
            const result = controller.cleanUserData(submitedData);
            assert.typeOf(result, "object");
        })
    })

    describe("userExists()", () => {
        it("it should return false if the user doesn't exist", async () => {
            const user = "msfalkasfkasfjlsfalf";
            const result = await controller.userExists(user);
            assert.equal(result, false);
        })
    })

    describe("userExists()", () => {
        it("it should return the an array if the user exist", async () => {
            const user = "lol";
            const result = await controller.userExists(user);
            assert.typeOf(result, "array");
        })
    })
    
    describe("handleSignUp()", () => {
        it("It should return an object if sign up is successful", async () => {
            const user = "user";
            const pass = "pass";
            const result = await controller.handleSignUp(user, pass);
            assert.typeOf(result, "object");
        })
    })

    describe("getUserProfile()", () => {
        it("it should return an object", async () => {
            const userId = "3854ad70-3a11-11ea-9be0-910943a0d32e";
            const result = await controller.getUserProfile(userId);
            assert.typeOf(result, "object");

        })
    })

    describe("hasher()", () => {
        it("it should return a string", () => {
            const pass = "lol";
            const result = controller.hasher(pass);
            assert.typeOf(result, "string");
        })
    })

    describe("submitTheData()", () => {
        it("it should return undefined when passing false data", async () => {
            const submitedData = "lol";
            const uniqueId = "lol";
            const result = await controller.submitTheData(submitedData, uniqueId);
            assert.isUndefined(result);
        })
    })

    describe("userProfileExists()", () => {
        it("it should return false if user profile doesn't exist", async () => {
            const data = {unique_id: "lol"};
            const result = await controller.userProfileExists(data);
            assert.equal(result, false);
        })
    })

    describe("deleteRecordOf()", () => {
        it("it should return true if user profile exists", async () => {
            const userId = "lol";
            const result = await controller.deleteRecordOf(userId);
            assert.equal(result, true);
        })
    })

});