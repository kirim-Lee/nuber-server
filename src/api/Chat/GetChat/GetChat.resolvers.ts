import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetChat: authResolver(async(_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
            const user: User= req.user;
            try {
                const chat = await Chat.findOne({id: args.chatId || 0},
                    {relations: ["passenger", "driver", "ride", "messages"]});
                if (chat) {
                    if (chat.passengerId === user.id || chat.driverId === user.id) {
                        return {
                            ok: true,
                            error: null,
                            chat
                        }
                    } else {
                        return {
                            ok: true,
                            error: "Not authorized",
                            chat: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not found",
                        chat: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    chat: null
                }
            }
        })
    }
}

export default resolvers; 