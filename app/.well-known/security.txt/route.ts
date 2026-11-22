import { buildSecurityTxt } from "@/lib/security/security-txt";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildSecurityTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" },
  });
}
