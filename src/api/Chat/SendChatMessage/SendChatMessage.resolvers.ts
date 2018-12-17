import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
    Mutation: {
        SendChatMessage: authResolver(async( _, args:SendChatMessageMutationArgs, { req}): Promise<SendChatMessageResponse> => {
            const user: User = req.user;
            try {
                const chat: Chat | undefined = await Chat.findOne({id: args.chatId});
                if(chat) {
                    if(user.id === chat.passengerId || user.id === chat.driverId) {
                        const message = await Message.create({
                            text: args.text,
                            chat,
                            user
                        }).save();

                        return {
                            ok: true,
                            error: null,
                            message
                        }
                    } else {
                        return {
                            ok: true,
                            error: "UnAuthorized",
                            message: null
                        }
                    }
                } else {
                    return {
                        ok: true,
                        error: "chat room not found",
                        message: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    message: null
                }
            }
        })
    }
}

export default resolvers; 