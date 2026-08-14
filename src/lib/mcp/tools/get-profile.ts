import { defineTool } from "@lovable.dev/mcp-js";

import { EDUCATION, IMPACT, PROFILE } from "@/lib/profile";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Return Subhrojeet Saha's professional summary, headline, location, LinkedIn, education and headline impact metrics.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const profile = { ...PROFILE, education: EDUCATION, impact: IMPACT };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: { profile },
    };
  },
});
