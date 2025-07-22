#!/usr/bin/env bash
# -------------------------------------------------------------
# Load a single variable from the nearest `.env` file upward.
#
# Usage:
#   source load_var_from_dotenv.sh VAR_NAME
# -------------------------------------------------------------

if [[ -z "$1" ]]; then
  echo "Usage: source load_var_from_dotenv.sh VAR_NAME" >&2
  return 1
fi

var="$1"
dir="$PWD"

while [[ "$dir" != "/" ]]; do
  env_file="$dir/.env"
  if [[ -f "$env_file" ]]; then
    # Extract line like FOO=... using grep and avoid leading/trailing space
    if line=$(grep -m1 -E "^${var}=" "$env_file" \
          | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'); then
      value=${line#*=}

      # Strip surrounding quotes if present
      # if [[ "$value" =~ ^\".*\"$ ]]; then
      #   value="${value:1:-1}"
      # elif [[ "$value" =~ ^\'.*\'$ ]]; then
      #   value="${value:1:-1}"
      # fi

      export "$var=$value"

      if (( ${#value} > 12 )); then
        value_preview="${value:0:4}…${value: -8}"
      else
        value_preview="$value"
      fi

      env_file_path_preview="${env_file/#$HOME/'~'}"  # Shorten home directory path
      echo "Loaded ${var}=${value_preview} from .env at ${env_file_path_preview}" >&2
      return 0
    fi
  fi

  dir=$(dirname "$dir")
done
