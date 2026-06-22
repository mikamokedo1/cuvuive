import { getSkillsResponse } from "../skills-data";

export const dynamic = "force-static";

export function GET() {
  return getSkillsResponse();
}
