import { assertEquals } from "https://deno.land/std@0.222.1/testing/asserts.ts";
import { getHello,setHello } from "../../services/helloService.js";

Deno.test("Calling 'getHello()' returns 'Oh, hello there!'", async () => {
  assertEquals("Oh, hello there!", getHello());
});

Deno.test("setHello does not change the message if input is invalid (empty string)", () => {
  setHello("");
  const result = getHello();
  assertEquals(result, "Oh, hello there!"); // Should remain unchanged
});

Deno.test("setHello does not change the message if input is too long", () => {
  setHello("This is too long");
  const result = getHello();
  assertEquals(result, "Oh, hello there!"); // Should remain unchanged
});
Deno.test("setHello changes the message if input length is valid", () => {
  setHello("Hi!");
  const result = getHello();
  assertEquals(result, "Hi!"); // Message should be updated
});