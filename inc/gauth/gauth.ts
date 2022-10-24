import { Credentials } from "google-auth-library";
import { google } from "googleapis";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import * as path from "node:path";

interface GoogleClientCredientials {
  clientId: string;
  clientSecret: string;
  redirect: string;
}

const FILE_PATH = process.cwd() + "/creds/credientials.json";
const TOKEN_PATH = process.cwd() + "/creds/token.json";

const getCredientials = (): GoogleClientCredientials => {
  const credientials = JSON.parse(readFileSync(FILE_PATH, "utf-8")).web;
  return {
    clientId: credientials.client_id,
    clientSecret: credientials.client_secret,
    redirect: credientials.redirect_uris[0],
  };
};

const oauth = getCredientials();
const oauth2 = new google.auth.OAuth2({
  clientId: oauth.clientId,
  clientSecret: oauth.clientSecret,
  redirectUri: oauth.redirect,
});

export const initialize = (): string => {
  const generateUrl = oauth2.generateAuthUrl({
    scope: "https://www.googleapis.com/auth/spreadsheets",
    access_type: "offline",
  });
  return generateUrl;
};

export const getAccessToken = async (code: string):Promise<Credentials> => {

  if (!existsSync(TOKEN_PATH)) {
    const {tokens} = await oauth2.getToken(code);
   
    writeFileSync(TOKEN_PATH,`${JSON.stringify(tokens)}`, "utf-8");
    return tokens;
  }

    const { tokens } = JSON.parse(readFileSync(TOKEN_PATH, "utf-8"));
    return tokens;

};

export const createSpreadsheet = async (ssTitle: string) => {

  try {
    const tokens = JSON.parse(readFileSync(TOKEN_PATH, "utf-8"));
    oauth2.setCredentials(tokens)
  
    const gs = google.sheets({
      version: 'v4',
      auth: oauth2
    })

    const response = await gs.spreadsheets.create({
      requestBody: {
        properties: {
          title: ssTitle
        }
      }
    })
    return response
  }
  catch(err){
    return err
  }

}

