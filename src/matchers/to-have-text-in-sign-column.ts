import { NeovimClient } from "neovim";
import { MatcherType } from "../types/matcher-type";

interface DefinedSign {
  name: string;
  texthl: string;
  text: string;
}

interface PlacedSign {
  lnum: number;
  id: string;
  priority: number;
  name: string;
  group: string;
}

interface Placed {
  buffer: number;
  signs: PlacedSign[];
}

export const toHaveTextInSignColumn: MatcherType<
  NeovimClient,
  jest.VimMatchers["toHaveTextInSignColumn"]
> = async (client: NeovimClient, text: string, buffer?: number) => {
  const currentBuffer = await client.call("bufnr");
  const definedSigns: DefinedSign[] = await client.call("sign_getdefined");

  const correctDefinition = definedSigns.find(
    (sign) => sign.text.trim() === text
  );

  if (!correctDefinition) {
    return {
      pass: false,
      message: () => `There are no signs defined with the text '${text}'`,
    };
  }

  const getPlaced: Placed[] = await client.call("sign_getplaced", [
    currentBuffer,
    { group: "*" },
  ]);

  const found = getPlaced[0].signs.find(
    (sign) => sign.name === correctDefinition.name
  );

  if (found) {
    return {
      pass: true,
      message: () => "",
    };
  }

  return {
    pass: false,
    message: () => `Could not find '${text}' in sign column for current buffer`,
  };
};
