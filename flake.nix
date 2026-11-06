# to enable shell: `nix shell .#`
{
  description = "Development environment for Secret-Santa";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "aarch64-darwin";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      packages.${system}.default = pkgs.buildEnv {
        name = "my-project-env";
        paths = with pkgs; [
          pnpm
          nodejs
        ];
      };
    };
}