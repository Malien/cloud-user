import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyparser from "body-parser";
import { me, change, avatar, serviceinfo } from "./api";

const { BIND_ADDRESS, PORT } = process.env

const prisma = new PrismaClient({
    log: [
        {
            level: "info",
            emit: "stdout"
        },
        {
            level: "query",
            emit: "stdout"
        },
        {
            level: "warn",
            emit: "stdout"
        }
    ]
})

prisma.connect()
    .then(() => {
        const app = express()
        app.use(bodyparser)
        app.get("/serviceinfo", serviceinfo(prisma))
        app.get("/me", me(prisma))
        app.post("/change", change(prisma))
        app.post("/avatar", avatar(prisma))

        const port = parseInt(PORT!)
        if (isNaN(port)) throw new Error("PORT expected to be an integer")
        app.listen(port, BIND_ADDRESS!, 10000, () => {
            console.log(`Starting server on ${BIND_ADDRESS}:${port}`)
        })
    }).finally(() => {
        prisma.disconnect()
    })
