CONFIG="$HOME/.config/opencode/opencode.json"

ocp-add() {
  for p in "$@"; do
    jq --arg p "$p" '.plugin = ((.plugin // []) | if index($p) == null then . + [$p] else . end)' "$CONFIG" > "$CONFIG.tmp" && mv "$CONFIG.tmp" "$CONFIG"
    echo "✅ Added: $p"
  done
}

ocp-rm() {
  for p in "$@"; do
    jq --arg p "$p" '.plugin = ((.plugin // []) | map(select(. != $p)))' "$CONFIG" > "$CONFIG.tmp" && mv "$CONFIG.tmp" "$CONFIG"
    echo "✅ Removed: $p"
  done
}

ocp-only() {
  jq --arg p "$1" '.plugin = [$p]' "$CONFIG" > "$CONFIG.tmp" && mv "$CONFIG.tmp" "$CONFIG"
  echo "✅ Only: $1"
}

ocp-none() {
  jq '.plugin = []' "$CONFIG" > "$CONFIG.tmp" && mv "$CONFIG.tmp" "$CONFIG"
  echo "✅ None"
}

ocp-status() {
  jq -r '.plugin // [] | if length == 0 then "(none)" else .[] | "  - " + . end' "$CONFIG"
}

alias ocp-ohmy='ocp-only oh-my-opencode@latest'
alias ocp-super='ocp-only superpowers@git+https://github.com/obra/superpowers.git'
alias ocp-omo-super='ocp-add oh-my-opencode@latest superpowers@git+https://github.com/obra/superpowers.git'
