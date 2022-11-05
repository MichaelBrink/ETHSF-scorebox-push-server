/*
Use Minimal payload for a group of recipients 
Adapted from PUSH SDK (Gasless) docs: https://docs.push.org/developers/developer-guides/sending-notifications/using-epns-sdk-gasless
*/

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as env from "dotenv";

env.config();

const PK = process.env.apiKey; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async () => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 4, // subset
      identityType: 2, // Minimal payload
      notification: {
        title: `[SDK-TEST] notification TITLE:`,
        body: `[sdk-test] notification BODY`,
      },
      payload: {
        title: `[sdk-test] Notification`,
        body: `22:24`,
        cta: "",
        img: "",
      },
      //recipients: ["eip155:5:0xe9c079525aCe13822A7845774F163f27eb5f21Da"],
      recipients: [
        "eip155:5:0xe9c079525aCe13822A7845774F163f27eb5f21Da",
        "eip155:5:0x691C7c07A1B1698c56340d386d8cC7A823f6e2D8",
      ], // recipients address
      channel: "eip155:5:0x9017804aE02877C32739A7703400326e9Ac9a04d", // your channel address
      env: "staging",
    });

    console.log("sent!");
  } catch (err) {
    console.error("Error: ", err);
  }
};

sendNotification();
