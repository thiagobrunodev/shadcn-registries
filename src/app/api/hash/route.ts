import { registriesHash, registriesHashDate } from "@/lib/registries"

export async function GET() {
  return Response.json({ hash: registriesHash, hashDate: registriesHashDate })
}
