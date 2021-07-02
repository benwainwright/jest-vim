import { NeovimClient } from "neovim";

declare global {
  namespace jest {
    interface VimMatchers extends jest.Matchers<NeovimClient> {
      toHaveTextInSignColumn(
        text: string,
        buffer?: number
      ): Promise<jest.CustomMatcherResult>;
    }
  }
}
