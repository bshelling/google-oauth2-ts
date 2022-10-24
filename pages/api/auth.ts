// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { initialize } from "../../inc/gauth/gauth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == "GET") {
    try{
      res.status(200).redirect(await initialize())
    }
    catch(err){
      res.status(400).json({
        message: err
      })
    }
  }
  
}
