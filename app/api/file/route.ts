import { exportCSV } from "@/app/actions/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
  const start = searchParams.get('start')
  const end = searchParams.get("end")
   const csv= await exportCSV(start as string,end as string)
    const headers = new Headers();
  return new Response(csv, {
    headers,
  });
}