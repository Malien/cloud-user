import { Writable } from "stream";
import { wrapAPI, APIError, getId } from "../util/api";
import { Storage } from "@google-cloud/storage";

const { BUCKET_NAME } = process.env

const storage = new Storage({ keyFile: "keys.json" })
const bucket = storage.bucket(BUCKET_NAME!)

const promisedWrite = (stream: Writable, chunk: any) =>
    new Promise<void>((resolve, reject) => 
        stream.write(chunk, (err) => {
            if (err) reject(err)
            else resolve()
        })
    )

export default wrapAPI(async (req, prisma) => {
    const { image, extension } = req.body
    const id = getId(req)
    if (!image) throw new APIError("Image is not present")
    const bytes = Buffer.from(image, "base64")
    const fileKey = `user-${id}.${extension}`

    const file = bucket.file(fileKey)
    if (! await file.exists()) {
        await file.create()
    } else {
        await file.delete()
    }
    const stream = file.createWriteStream({ gzip: true, contentType: `image/${extension}` })
    await promisedWrite(stream, bytes)

    return { avatar: `https://storage.cloud.google.com/${BUCKET_NAME}/${fileKey}` }
})