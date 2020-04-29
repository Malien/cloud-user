import { wrapAPI } from "../util/api";

export default wrapAPI(async () => ({
    service: "user",
    version: "0.1.0",
    author: "q_link0_p"
}))