import express from "express";
import { me, serviceinfo } from "./api";
import { PrismaClient } from "@prisma/client";

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
        app.get("/serviceinfo", serviceinfo(prisma))
        app.get("/me", me(prisma))

        const port = parseInt(PORT!)
        if (isNaN(port)) throw new Error("PORT expected to be an integer")
        app.listen(port, BIND_ADDRESS!, 10000, () => {
            console.log(`Starting server on ${BIND_ADDRESS}:${port}`)
        })
    }).finally(() => {
        prisma.disconnect()
    })
