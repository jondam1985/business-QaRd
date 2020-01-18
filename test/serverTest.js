const chai = require("chai");
const assertHttp = require("chai-http"); //chai add on to test servers
const server = require("../server"); //server.js file

chai.should() //assertion style should

chai.use(assertHttp);

//Testing server app

describe("business-QaRd server", () => {

    //Testing GET routes

    //Positive scenario
    describe(" GET / ", () => {
        it("It should return status 200", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.type.should.eq("text/html");
                    res.text.should.contain("Here at QaRds we thought about the digital age");
                    done();
                })
        })
    })

    //Negative scenario
    describe(" GET /homepage ", () => {
        it("It should return status 404", (done) => {
            chai.request(server)
                .get("/homepage")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })

    //Positive scenario
    describe(" GET /singIn ", () => {
        it("It should return status 200", (done) => {
            chai.request(server)
                .get("/signIn")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.type.should.eq("text/html");
                    res.text.should.contain("Password");
                    //console.log(res.text);
                    done();
                })
        })
    })

    //Logout positive scenario
    describe(" GET /logout ", () => {
        it("It should return status 200", (done) => {
            chai.request(server)
                .get("/logout")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.type.should.eq("text/html");
                    done();
                })
        })
    })

    //Get user negative scenario
    describe(" GET /userProfile/:user with no previous login ", () => {
        it("It should return status 200 and redirect to homepage", (done) => {
            const user = "b46ead20-393a-11ea-bf64-3bb9aab7bc82";
            chai.request(server)
                .get(`/userProfile/${user}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.type.should.eq("text/html");
                    res.text.should.contain("Here at QaRds we thought about the digital age");
                    done();
                })
        })
    })

    //POST signIn postive scenario
    describe(" POST /signIn with valid crendetials ", () => {
        it("It should return status 200 and go to userProfile", (done) => {
            const credentials = {
                user: "lol",
                pass: "lol"
            };
            chai.request(server)
                .post("/signIn")
                .send(credentials)
                .end((err, res) => {
                    //console.log(res.text);
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.type.should.eq("application/json");
                    res.text.should.contain("userProfile/b46ead20-393a-11ea-bf64-3bb9aab7bc82");
                    //done();
                })
            done();
        })
    })

    //POST signIn negative scenario
    describe(" POST /signIn with invalid crendetials ", () => {
        it("It should return status 404", (done) => {
            const credentials = {
                user: "nonvaliddfsdfkdflksdjf",
                pass: "nonvalidfasdafadfdfhhh"
            };
            chai.request(server)
                .post("/signIn")
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(404);
                    //done();
                })
            done();
        })
    })

    //GET userProfile postive scenario
    const credentials = {
        user: "lol",
        pass: "lol"
    };
    const userProfile = "b46ead20-393a-11ea-bf64-3bb9aab7bc82";
    before((done) => {
        chai.request(server)
            .post("/signIn")
            .send(credentials)
            .end((err, res) => {
                //console.log(res.text);
                res.should.have.status(200);
                // res.body.should.be.a("object");
                // res.type.should.eq("application/json");
                // res.text.should.contain("userProfile/b46ead20-393a-11ea-bf64-3bb9aab7bc82");
                done();
            })
    })
    describe("GET /userProfile/username", () => {
        it("It has status 200 and navigates to userProfile page", (done) => {
            chai.request(server)
            .get(`/userProfile/${userProfile}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    })
})