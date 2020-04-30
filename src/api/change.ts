import { wrapAPI, getId } from "../util/api";

export default wrapAPI(async (req, prisma) => {
    const id = getId(req)

    const { name, bio } = req.body

    const data: any = {}

    if (name) data.name = name
    if (bio) data.bio = bio

    const user = await prisma.user.update({
        where: { id },
        data,
        select: {
            name: true,
            bio: true
        }
    })

    return { user }
})