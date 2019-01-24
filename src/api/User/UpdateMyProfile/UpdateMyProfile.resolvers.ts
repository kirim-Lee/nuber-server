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
            if("password1" in notNull) {
                const checkPassword = await user.comparePassword(notNull["password1"]);
                if (checkPassword) {
                    if(notNull["password2"] === notNull["password3"]) {
                        user.password = notNull["password2"];
                        user.save();
                        delete notNull["password1"];
                    } else {
                        return {
                            ok: false,
                            error: 'not same after password'
                        }
                    }
                    
                } else {
                    return {
                        ok: false,
                        error: 'you entered wrong password'
                    }
                }
            }
            delete notNull["password2"];
            delete notNull["password3"];
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