import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
    Subscription: {
        NearbyRideSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"), 
                (payload, _, { context }) => {
                    // payload 로 받는 것은 RequestRide.resolvers.ts에서 업데이트 할때 주는 값 (user)
                    // context 로 받는 것은 index.ts에서 graphql속성 설정으로 subscription 연결시 context로 전달받은 값이다
                    const user: User = context.currentUser; // 접속한 유저
                    const { NearbyRideSubscription: { pickUpLat, pickUpLng }} = payload; // 갱신된 유저
                    const { lastLat: userLastLat, lastLng: userLastLng } = user;

                    return (
                        pickUpLat >= userLastLat - 0.05 &&
                        pickUpLat <= userLastLat + 0.05 &&
                        pickUpLng >= userLastLng - 0.05 &&
                        pickUpLng <= userLastLng + 0.05 
                    );
                }
            )
        }
    }
}

export default resolvers;