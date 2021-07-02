import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { attach, NeovimClient } from "neovim";

let neovim: NeovimClient | undefined;
let neovimProcess: ChildProcessWithoutNullStreams | undefined;

const initClient = () => {
  neovimProcess = spawn("nvim", ["-u", "NONE", "-N", "--embed"], {});
  neovim = attach({ proc: neovimProcess });
};

export const getClient = (): NeovimClient => {
  if (!neovim) {
    initClient();
  }
  return neovim as NeovimClient;
};

export const cleanupClient = () => {
  neovim?.quit();
  neovimProcess?.disconnect?.();
  neovim = undefined;
  neovimProcess = undefined;
};
