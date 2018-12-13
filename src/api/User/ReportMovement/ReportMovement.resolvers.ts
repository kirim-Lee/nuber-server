import authResolver from "../../../utils/resolverMiddleware";
import cleanNullArgs from "../../../utils/cleanNullArg";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { ReportMovementResponse, ReportMovementMutationArgs } from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: authResolver(async(
        _, 
        args: ReportMovementMutationArgs, 
        { req, pubSub }): Promise<ReportMovementResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            try {
                await User.update({id: user.id}, { ...notNull });
                const updatedUser = await User.findOne({id: user.id});
                pubSub.publish("driverUpdate", {DriverSubscription: updatedUser}); 
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers; 