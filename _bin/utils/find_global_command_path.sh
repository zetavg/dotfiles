#!/usr/bin/env bash
# Utility function to find command path with global runtime support via mise

find_global_command_path() {
  local runtime="$1"
  local command_name="$2"
  local install_command="$3"
  local current_script_path="${4:-}"
  local command_path
  local global_runtime_version

  if command -v mise >/dev/null 2>&1; then
    global_runtime_version="$(mise --cd "$HOME" ls --global "$runtime" --json | jq -r '.[0].version')"

    if [ "$global_runtime_version" = "null" ]; then
      echo "Error: No global $runtime version found in mise configuration. Please check your \`~/.config/mise/config.toml\`." >&2
      echo "You can set a global $runtime version with something like:" >&2
      echo "" >&2
      echo "  mise use -g $runtime@lts" >&2
      exit 1
    fi

    command_path=$(mise exec "$runtime@$global_runtime_version" -- which "$command_name" || :)
  else
    command_path=$(which "$command_name" || :)
  fi

  # If found path matches the current script path, treat as not found
  if [ -n "$current_script_path" ] && [ "$command_path" = "$current_script_path" ]; then
    command_path=""
  fi

  if [ -z "$command_path" ]; then
    echo "Error: $command_name command not found." >&2

    if [ -n "${global_runtime_version:-}" ]; then
      echo "Please ensure that you have installed $command_name under $runtime $global_runtime_version:" >&2
      echo "" >&2
      echo "  mise exec $runtime@$global_runtime_version -- $install_command" >&2
    else
      echo "Please ensure that you have installed $command_name:" >&2
      echo "" >&2
      echo "  $install_command" >&2
    fi

    exit 1
  fi

  echo "$command_path"
}
