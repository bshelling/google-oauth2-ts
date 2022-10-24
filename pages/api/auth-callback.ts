// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getAccessToken } from "../../inc/gauth/gauth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == "GET") {
	try{
		const { code } = req.query;
		const token = await getAccessToken(code)
		res.status(200).json({
			token: token
		})
	}
	catch(err){
		res.status(400).json({
			error:  err
		})
	}
	

  }
}
