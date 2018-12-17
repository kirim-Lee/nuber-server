import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"), 
                async (payload, _, { context }) => {
                    // payload 로 받는 것은 RequestRide.resolvers.ts에서 업데이트 할때 주는 값 (user)
                    // context 로 받는 것은 index.ts에서 graphql속성 설정으로 subscription 연결시 context로 전달받은 값이다
                    const user: User = context.currentUser; // 접속한 유저
                    const { MessageSubscription: { chatId }} = payload; // 갱신된 유저
                    try {
                        const chat: Chat | undefined = await Chat.findOne({id: chatId});
                        if (chat) {
                            return chat.driverId === user.id || chat.passengerId === user.id;
                        } else {
                            return false
                        }
                    } catch(error) {
                        return false;
                    }
                }
            )
        }
    }
}

export default resolvers;