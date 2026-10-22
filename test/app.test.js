const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app");

test("Home page returns a success message", async (t) => {
    const server = app.listen(0);

    t.after(() => {
        server.close();
    });

    const address = server.address();
    const response = await fetch(
        `http://127.0.0.1:${address.port}/`
    );

    const body = await response.text();

    assert.equal(response.status, 200);

    assert.match(
        body,
        /Node\.js CI\/CD Pipeline is working successfully/
    );
});

test("Health endpoint returns healthy status", async (t) => {
    const server = app.listen(0);

    t.after(() => {
        server.close();
    });

    const address = server.address();

    const response = await fetch(
        `http://127.0.0.1:${address.port}/health`
    );

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "healthy");
});