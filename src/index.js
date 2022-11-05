/*
Use Minimal payload for a group of recipients 
Adapted from PUSH SDK (Gasless) docs: https://docs.push.org/developers/developer-guides/sending-notifications/using-epns-sdk-gasless
*/
import express from "express";

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as env from "dotenv";

const app = express();
const port = 8080;

env.config();

const PK = process.env.apiKey; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async (recipients, title, msg, img) => {
  /*
    recipients = array of address to send notificationt to
    msg = leaderboard or score update message
    img = leaderboard or score update image (use flaticon.com?)
    */
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 4, // subset
      identityType: 2, // Minimal payload
      notification: {
        title: title,
        body: msg,
      },
      payload: {
        title: title,
        body: msg,
        cta: "",
        img: img,
      },
      recipients: eval(recipients),
      channel: "eip155:5:0x9017804aE02877C32739A7703400326e9Ac9a04d", // Scorebox channel address on staging
      env: "staging",
    });

    console.log("sent!");
  } catch (err) {
    console.error("Error: ", err);
  }
};

app.post("/api", (req) => {
  //console.log(req["query"]["recipients"]); //test returning recipient array
  sendNotification(
    req["query"]["recipients"],
    req.headers["title"],
    req.headers["msg"],
    req.headers["img"]
  );
});

app.listen(port, () => {
  console.log(`PUSH Notification app listening on port ${port}`);
});
