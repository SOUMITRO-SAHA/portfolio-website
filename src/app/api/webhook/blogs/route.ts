// TODO: Webhook implementation is pending
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  console.log("Webhooks GET");
  res.status(200).json({ message: "Hello from Next.js!" });
}

export function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  console.log("Webhooks POST");
  res.status(200).json({ message: "Hello from Next.js!" });
}
