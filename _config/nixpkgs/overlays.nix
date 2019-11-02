let
  # To "pin" to a certain commit, use this instead of `fetchTarball`:
  # zpkgs-source = builtins.fetchGit {
  #   url = "https://github.com/zetavg/nix-packages.git";
  #   ref = "master";
  #   # Get the latest commit rev on
  #   # https://github.com/zetavg/nix-packages/commits/master
  #   rev = "76d8275bcfcf78569d2c2b65e418d87b824274f7";
  # };
  # zpkgs-source = builtins.fetchTarball "https://git.io/zpkgs-archive-master";
  zpkgs-source = /Users/z/Projects/nix-packages;
in (import "${zpkgs-source}/manifest.nix") ++ [
  # Add other overlays here
]
