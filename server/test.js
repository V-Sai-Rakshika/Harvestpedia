const key = process.env.CLAUDE_API_KEY || require("fs").readFileSync(".env","utf8").match(/CLAUDE_API_KEY=(.+)/)?.[1]?.trim();

console.log("Key starts with:", key?.substring(0, 20));

fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": key,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-haiku-4-5",
    max_tokens: 100,
    messages: [{ role: "user", content: "say hi" }],
  }),
})
.then(r => r.text())
.then(t => console.log("ANTHROPIC RESPONSE:", t))
.catch(e => console.error("FETCH ERROR:", e));