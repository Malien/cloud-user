import { wrapAPI, getId } from "../util/api";

export default wrapAPI(async (req, prisma) => {
    const id = getId(req)

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