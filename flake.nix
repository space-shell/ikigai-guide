{
  description = "ikigai-guide devshell — static ikigai discovery guide (Vite + Solid SPA)";

  inputs = {
    # Host runs NixOS 26.11 (pre-release) = nixos-unstable line; pin to the
    # stable branch once 26.11 is released.
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      forAllSystems =
        f:
        nixpkgs.lib.genAttrs systems (
          system:
          f (
            import nixpkgs {
              inherit system;
              config.allowUnfree = false;
            }
          )
        );
    in
    {
      devShells = forAllSystems (
        pkgs:
        let
          nodejs = pkgs.nodejs_22;
        in
        {
          default = pkgs.mkShell {
            packages = [
              nodejs # npm included; pinned major for CI/dev parity
              pkgs.nixfmt # format flake.nix
            ];

            shellHook = ''
              echo "ikigai-guide devshell"
              echo "  node $(node --version) / npm $(npm --version)"
              echo "  quick start: npm ci && npm run dev"
            '';
          };
        }
      );
    };
}
