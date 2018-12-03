import { Resolvers } from "../../../types/resolvers";
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "src/entities/User";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (_, args: CompletePhoneVerificationMutationArgs): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            // 인증하기
            try {
                const verification = await Verification.findOne({
                    payload: phoneNumber,
                    key
                });
                if(!verification) {
                    return {
                        ok: false,
                        error: 'verification key not valid',
                        token: null
                    }
                } else {
                    verification.verified = true;
                    verification.save();
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
            // 인증이 성공하면 등록한 유저 찾기
            try {
                const user = await User.findOne({phoneNumber});
                if(user) {
                    // booked user
                    user.verifiedPhoneNumber = true;
                    user.save();
                    return {
                        ok: true,
                        error: null,
                        token: "comming soon"
                    }
                } else {
                    // new user
                    return {
                        ok: true,
                        error: null,
                        token: null
                    }
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }

}

export default resolvers;