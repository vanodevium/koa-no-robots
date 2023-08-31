"use strict";

const Koa = require("koa");
const request = require("supertest");
const noRobots = require("..");

describe("no-robots.test.js", function () {
  describe("domain allowed", function () {
    const app = new Koa();
    app.use(noRobots(["domain.com"]));

    it("should return allowed robots.txt file", function (done) {
      request(app.callback())
        .get("/robots.txt")
        .set("Host", "domain.com")
        .expect("User-agent: *\nDisallow:\n")
        .expect(200, done);
    });
  });

  describe("domain disallowed", function () {
    const app = new Koa();
    app.use(noRobots(["domain.com"]));

    it("should return disallowed robots.txt file", function (done) {
      request(app.callback())
        .get("/robots.txt")
        .set("Host", "domain1.com")
        .expect("User-agent: *\nDisallow: /\n")
        .expect(200, done);
    });

    it("should return disallowed robots.txt file", function (done) {
      request(app.callback())
        .get("/robots.txt")
        .expect("User-agent: *\nDisallow: /\n")
        .expect(200, done);
    });
  });
});
