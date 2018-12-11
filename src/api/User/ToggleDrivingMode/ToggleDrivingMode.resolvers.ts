import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        ToggleDrivingMode: authResolver(async(
            _, __, { req }
        ): Promise<ToggleDrivingModeResponse> => {
            const user: User = req.user;
            user.isDriving = !user.isDriving;
            user.save();
            return {
                ok: true,
                error: null
            }
        })
    }
}

export default resolvers; 