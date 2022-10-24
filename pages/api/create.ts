// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { createSpreadsheet } from "../../inc/gauth/gauth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == "GET") {
    try{
        const response = await createSpreadsheet("Brandon")

        console.log(response)

        res.status(response.status).json({
            message: "Spreadsheet create"
        })
    }
    catch(err){
        res.status(400).json({
            message: err
        })
    }
    
  }
  
}
