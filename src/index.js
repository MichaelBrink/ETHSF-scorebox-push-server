/*
Use Minimal payload for a group of recipients 
Adapted from PUSH SDK (Gasless) docs: https://docs.push.org/developers/developer-guides/sending-notifications/using-epns-sdk-gasless
*/

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = process.env.apiKey; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async () => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 4, // subset
      identityType: 0, // Minimal payload
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
      recipients: ["eip155:5:0xe9c079525aCe13822A7845774F163f27eb5f21Da"],
      //recipients: ['eip155:5:0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', 'eip155:5:0x52f856A160733A860ae7DC98DC71061bE33A28b3'], // recipients address
      channel: "eip155:5:0x9017804aE02877C32739A7703400326e9Ac9a04d", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

sendNotification();
