const request = require("supertest");
const app = require("../app");
const dbHandler = require("./testDb");
const { assert } = require("chai");

const mockUser = {
  alias: "rimi",
  role: "user",
  password: "123456",
};

describe("Testing User Routes ", () => {
  /**
   * Remove and close the db and server.
   */
  afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  let Cookies = "";
  let token = "";

  describe("Register user", () => {
    it("it should not create a new user with an empty request body", (done) => {
      request(app)
        .post("/api/v1/auth/register")
        .send()
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("it should create a new user", (done) => {
      request(app)
        .post("/api/v1/auth/register")
        .send(mockUser)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const token = res.body.token;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert token
            assert.isString(token, "Token should be an object");

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("Login user", () => {
    it("it should not login user that does not exit", (done) => {
      request(app)
        .post("/api/v1/auth/login")
        .send({ alias: "brad", password: "12345" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });

    it("it should not login user with wrong crendentials", (done) => {
      request(app)
        .post("/api/v1/auth/login")
        .send({ alias: mockUser.alias, password: "12345" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });

    it("it should login user", (done) => {
      request(app)
        .post("/api/v1/auth/login")
        .send({
          alias: mockUser.alias,
          password: mockUser.password,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const userToke = res.body.token;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isNotEmpty(userToke, "token should be in the response");

            Cookies = res.headers["set-cookie"][0];
            token = userToke;

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it("it should get current logged in user ", (done) => {
      request(app)
        .get("/api/v1/auth/user/me")
        .auth(token, { type: "bearer" })
        .set("Cookie", Cookies)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const user = res.body.data;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isObject(user, "user should be an object");

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
