import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
    Subscription: {
        RideStatusSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"), 
                (payload, _, { context }) => {
                    // payload 로 받는 것은 RequestRide.resolvers.ts에서 업데이트 할때 주는 값 (user)
                    // context 로 받는 것은 index.ts에서 graphql속성 설정으로 subscription 연결시 context로 전달받은 값이다
                    const user: User = context.currentUser; // 접속한 유저
                    const { RideStatusSubscription: { driverId, passengerId }} = payload; // 갱신된 유저

                    return (
                        user.id === driverId || user.id === passengerId
                    );
                }
            )
        }
    }
}

export default resolvers;