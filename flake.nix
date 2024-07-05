{
  description = "JS Dev Env";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
    devshell.url = "github:numtide/devshell/main";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };
  outputs =
    { self
    , nixpkgs
    , flake-utils
    , devshell
    , flake-compat
    , ...
    }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      cwd = builtins.toString ./.;
      overlays = map (x: x.overlays.default) [
        devshell
      ];
      pkgs = import nixpkgs { inherit system overlays; };
    in
    rec {

      # nix develop
      devShell = pkgs.devshell.mkShell {
        env = [
        ];
        commands = [
          {
            name = "build";
            command = "pnpm build \"$@\"";
            help = "Build the packages";
            category = "NPM";
          }
        ];
        packages = with pkgs; [
          bash
          curl
          fd
          fzf
          gnused
          jq
          nodejs_20
          ripgrep
          wget
        ];
      };
    });
}
