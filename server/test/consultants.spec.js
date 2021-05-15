const request = require("supertest");
const app = require("../app");
const dbHandler = require("./testDb");
const { assert, expect } = require("chai");

const mockConsultant = {
  name: "John Doe",
  email: "john@gmail.com",
  title: "doctor",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, totam animi architecto dolore labore odit aperiam porro excepturi iusto dolorum natus sed consectetur! Harum facilis praesentium debitis, temporibus vitae aspernatur! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam rerum error, voluptate porro quasi assumenda molestias. Laboriosam nesciunt exercitationem deserunt doloribus. Eveniet labore quisquam corporis consequuntur incidunt odit tempora eos?",
  shortInfo:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra feugiat mauris id viverra. Duis luctus ex sed facilisis ultrices.",
  password: "123456",
};

describe("Testing Consultants Routes ", () => {
  /**
   * Remove and close the db and server.
   */
  afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
  });

  let Cookies = "";
  let token = "";
  let id = "";

  describe("Register consultant", () => {
    it("it should not create a new consultant with an empty request body", (done) => {
      request(app)
        .post("/api/v1/auth/consultant/register")
        .send()
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("it should create a new consultant", (done) => {
      request(app)
        .post("/api/v1/auth/consultant/register")
        .send(mockConsultant)
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

  describe("Login consultant", () => {
    it("it should not login consultant with wrong crendentials", (done) => {
      request(app)
        .post("/api/v1/auth/consultant/login")
        .send({ email: mockConsultant.email, password: "12345" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });

    it("it should login consultant", (done) => {
      request(app)
        .post("/api/v1/auth/consultant/login")
        .send({
          email: mockConsultant.email,
          password: mockConsultant.password,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const userToken = res.body.token;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isNotEmpty(userToken, "token should be in the response");

            Cookies = res.headers["set-cookie"][0];
            token = userToken;

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it("it should get current logged in user ", (done) => {
      request(app)
        .get("/api/v1/auth/consultant/me")
        .auth(token, { type: "bearer" })
        .set("Cookie", Cookies)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const consultant = res.body.data;

            id = consultant._id;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isObject(consultant, "consultant should be an object");

            expect(consultant.name).to.equal(
              mockConsultant.name,
              `name should be ${mockConsultant.name}`
            );

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("Get consultants", () => {
    it("it should get all consultants", (done) => {
      request(app)
        .get("/api/v1/consultant")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const consultants = res.body.data;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isArray(consultants, "consultant should be an array");

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });

    it("it should not get any consultant if not in database", (done) => {
      request(app)
        .get("/api/v1/consultant/1234")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });

    it("it should get a single consultants", (done) => {
      request(app)
        .get(`/api/v1/consultant/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const consultant = res.body.data;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isObject(consultant, "consultant should be an object");

            expect(consultant.name).to.equal(
              mockConsultant.name,
              `name should be ${mockConsultant.name}`
            );

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("Upadate consultant", () => {
    it("It should update current logged in consultant details", (done) => {
      request(app)
        .put(`/api/v1/consultant`)
        .send({
          image:
            "https://res.cloudinary.com/zfree/image/upload/v1604346513/wudmxw0q7sefvek0duhy.jpg",
          cloudinaryId: "wudmxw0q7sefvek0duhy",
        })
        .auth(token, { type: "bearer" })
        .set("Cookie", Cookies)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const consultant = res.body.data;

            // Assert status
            assert(res.status === 200, "status does not match");

            // Assert user
            assert.isObject(consultant, "consultant should be an object");

            expect(consultant.image).to.equal(
              "https://res.cloudinary.com/zfree/image/upload/v1604346513/wudmxw0q7sefvek0duhy.jpg",
              `Image should be available`
            );

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
