import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getExperienceTool from "./tools/get-experience";
import getExpertiseTool from "./tools/get-expertise";
import getProfileTool from "./tools/get-profile";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "portfolio-website",
  title: "Portfolio Website",
  version: "0.1.0",
  instructions:
    "Tools for Subhrojeet Saha's professional portfolio. Use `get_profile` for his summary and impact metrics, `get_experience` for his role history, and `get_expertise` for competencies, frameworks and certifications.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfileTool, getExperienceTool, getExpertiseTool],
});
