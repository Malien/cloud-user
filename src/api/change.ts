import { getId, wrapAPI } from "../util/api";

export default wrapAPI(async (req, prisma) => {
    const id = getId(req)

    const { name, bio, usingMetric } = req.body

    const data: any = {}

    if (name !== undefined) data.name = name
    if (bio !== undefined) data.bio = bio
    if (usingMetric !== undefined) data.usingMetric = usingMetric

    const user = await prisma.user.update({
        where: { id },
        data,
        select: {
            usingMetric: true,
            name: true,
            bio: true
        }
    })

    return { user }
})