import { toHaveTextInSignColumn } from "./to-have-text-in-sign-column";
import { getClient, cleanupClient } from "../init";

afterEach(() => {
  cleanupClient();
});

it("The toHaveTextInSignColumn matcher should pass if text has been added to the current buffer sign column", async () => {
  const client = getClient();

  await client.command("e test");
  const buffer = await client.call("bufnr");

  await client.call("sign_define", ["TestSign", { text: "t" }]);
  await client.call("sign_place", [
    0,
    "TestSigns",
    "TestSign",
    buffer,
    { lnum: 3 },
  ]);

  const matcherResult = await toHaveTextInSignColumn(client, "t");

  expect(matcherResult.pass).toEqual(true);
});

it("The toHaveTextInSignColumn matcher should fail with an appropriate message if no text has been added to the current buffer sign column", async () => {
  const client = getClient();

  await client.command("e test");

  await client.call("sign_define", ["TestSign", { text: "t" }]);
  const matcherResult = await toHaveTextInSignColumn(client, "t");

  expect(matcherResult.pass).toEqual(false);
  expect(matcherResult.message()).toEqual(
    "Could not find 't' in sign column for current buffer"
  );
});
