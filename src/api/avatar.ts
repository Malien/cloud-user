import { wrapAPI, APIError } from "../util/api";

export default wrapAPI(async (req, prisma) => {
    throw new APIError("Not implemented")
})