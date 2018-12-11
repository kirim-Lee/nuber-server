import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: authResolver(async(
            _, 
            args: UpdateMyProfileMutationArgs, 
            { req }
        ): Promise<UpdateMyProfileResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            if(notNull["password"] && notNull["password"] !== null) {
                user.password = notNull["password"];
                user.save();
                delete notNull["password"];                
            }
            try {
                
                await User.update({id:user.id}, { ...notNull });
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            };
        })
    }
}

export default resolvers; 