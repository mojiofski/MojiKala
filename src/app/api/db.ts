import data from "../../../db.json";

export async function GET() {
  return Response.json(data);
}
