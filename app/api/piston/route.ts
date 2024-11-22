// // pages/api/compileCode.js
// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Only POST requests allowed' });
//   }

//   const requestData = req.body;
//   const endpoint = "https://emkc.org/api/v2/piston/execute";

//   try {
//     const response = await axios.post(endpoint, requestData);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// app/api/piston/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

const endpoint = "https://emkc.org/api/v2/piston/execute";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();
    const response = await axios.post(endpoint, requestData);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
