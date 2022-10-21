import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import markdownToHtml from "../../lib/markdownToHtml";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Guard clause checks for title and blog text,
  // and returns early if they are not found
  if (!body.title || !body.blog) {
    // Sends a HTTP bad request error code
    return res.status(400).json({
      data: "Title or blog text not found, those are mandatory attributes",
    });
  }

  const client = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  });
  client.on("error", (err) => {
    console.log("Redis Client Error", err);
    return res.status(500).send("Unable to connect database");
  });

  await client.connect();

  if (!body.uuid) body.uuid = uuidv4();
  if (!body.timestamp) body.timestamp = Date.now();
  if (!body.author) body.author = "Anonymous";

  const html = await markdownToHtml(body.blog);

  await client.lPush(
    "posts",
    JSON.stringify({
      uuid: body.uuid,
      title: body.title,
      author: body.author,
      blog: html,
      timestamp: body.timestamp,
    })
  );
  // Found the name.
  // Sends a HTTP redirect code
  res.redirect(302, "/");
}
