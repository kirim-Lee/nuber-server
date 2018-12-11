import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import { 
    CompleteEmailVerificationResponse, 
    CompleteEmailVerificationMutationArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        CompleteEmailVerification: authResolver(async (
            _, args:CompleteEmailVerificationMutationArgs, 
            { req }
            ): Promise<CompleteEmailVerificationResponse> => {
            const user: User = req.user;
            const { key } = args;
            if (user.email) {
                try {
                    const verification = await Verification.findOne({ key, payload: user.email });
                    if (verification) {
                        user.verifiedEmail = true;
                        user.save();
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: 'Can\'t verify email'
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "No email to verify"
                }
            }
        })
    }
}

export default resolvers;