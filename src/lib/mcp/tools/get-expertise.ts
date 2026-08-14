import { defineTool } from "@lovable.dev/mcp-js";

import { CERTIFICATIONS, COMPETENCIES, FRAMEWORKS, TOOLS } from "@/lib/profile";

export default defineTool({
  name: "get_expertise",
  title: "Get expertise",
  description:
    "Return Subhrojeet Saha's core competencies, regulatory frameworks, tooling and professional certifications.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const expertise = {
      competencies: COMPETENCIES,
      frameworks: FRAMEWORKS,
      tools: TOOLS,
      certifications: CERTIFICATIONS,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(expertise, null, 2) }],
      structuredContent: expertise,
    };
  },
});
