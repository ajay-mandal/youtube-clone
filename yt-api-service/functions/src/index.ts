import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();
const fireStore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "ytclone-raw-videos-bucket";
const videoCollectionId = "videos";

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string;
  thumbnail?: string;
}

export const createUser = functions.auth.user().onCreate((user)=>{
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
  };

  fireStore.collection("users").doc(user.uid).set(userInfo);

  logger.info(`User Created: ${JSON.stringify(userInfo)}`);
  return;
});

export const GenerateUploadUrl = onCall({maxInstances: 1}, async (req) => {
  // Check for user authentication
  if (!req.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  const auth = req.auth;
  const data = req.data;
  const bucket = storage.bucket(rawVideoBucketName);
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;
  // Get a v4 signed URL for uploading file
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now()+ 15*60*1000, // 15 min
  });
  return {url, fileName};
});

export const GetVideos = onCall({maxInstances: 1}, async () => {
  const snapshot = await fireStore.collection(videoCollectionId)
    .limit(10)
    .get();
  return snapshot.docs.map((doc) => doc.data());
});
