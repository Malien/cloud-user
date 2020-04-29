import { wrapAPI, APIError } from "../util/api";

export default wrapAPI(async (req, prisma) => {
    const idHeader = req.headers["user-id"]
    if (!idHeader || idHeader instanceof Array) throw new APIError("Invalid user-id header", 401)
    const id = parseInt(idHeader)

    const user = await prisma.user.findOne({
        where: { id },
        select: {
            avatar: true,
            bio: true,
            distance: true,
            name: true,
            points: true,
            steps: true,
            usingMetric: true
        }
    })

    return { user }
})