import { NextResponse } from "next/server";

const CAKTO_AFFILIATE_URL =
  "https://pay.cakto.com.br/mqgfzu4?affiliate=GQr2dZqB";

export function GET() {
  return NextResponse.redirect(CAKTO_AFFILIATE_URL, 302);
}
