import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { EXPERIENCE } from "@/lib/profile";

export default defineTool({
  name: "get_experience",
  title: "Get work experience",
  description:
    "Return Subhrojeet Saha's work history: company, role, period and detailed responsibilities. Optionally filter by company name.",
  inputSchema: {
    company: z
      .string()
      .optional()
      .describe("Optional case-insensitive company name filter, e.g. 'JPMorgan'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ company }) => {
    const needle = company?.trim().toLowerCase();
    const roles = needle
      ? EXPERIENCE.filter((role) => role.company.toLowerCase().includes(needle))
      : EXPERIENCE;
    return {
      content: [{ type: "text", text: JSON.stringify(roles, null, 2) }],
      structuredContent: { roles },
    };
  },
});
