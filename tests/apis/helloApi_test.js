import { getHello, setHello } from "../../api/helloApi.js";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

// Setup an Oak app for Superoak testing
const app = new Application();
app.use(getHello);
app.use(setHello);

Deno.test("GET /hello should return the current hello message", async () => {
  const request = await superoak(app);
  await request.get("/hello")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect((res) => {
      assertEquals(res.body.message, "Oh, hello there!");
    });
});

Deno.test("POST /hello should set a new valid hello message", async () => {
  const request = await superoak(app);
  await request.post("/hello")
    .send({ message: "Hi!" })
    .expect(200);

  const newRequest = await superoak(app);
  await newRequest.get("/hello")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect((res) => {
      assertEquals(res.body.message, "Hi!");
    });
});

Deno.test("POST /hello should not update message if it's invalid", async () => {
  const request = await superoak(app);
  await request.post("/hello")
    .send({ message: "This is too long" })
    .expect(200);

  const newRequest = await superoak(app);
  await newRequest.get("/hello")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect((res) => {
      assertEquals(res.body.message, "Hi!");  // It should remain "Hi!" from the previous valid set
    });
});
