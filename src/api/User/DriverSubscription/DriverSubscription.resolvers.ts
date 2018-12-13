import { withFilter } from "graphql-yoga";
import User from "src/entities/User";

const resolvers = {
    Subscription: {
        DriverSubscription: {
            subscribe: withFilter( // withFilter 는 처음 파라미터는 이터레이터, 두번째 파라미터는 함수를 받고 리턴값에 따라 노출할지 여부를 결정한다.(boolean)
                (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"), 
                (payload, _, { context }) => {
                    // payload 로 받는 것은 ReportMovement.resolvers.ts에서 업데이트 할때 주는 값 (user)
                    // context 로 받는 것은 index.ts에서 graphql속성 설정으로 subscription 연결시 context로 전달받은 값이다
                    const user: User = context.currentUser; // 접속한 유저
                    const { DriverSubscription: { lastLat: driverLastLat, lastLng: driverLastLng }} = payload; // 갱신된 유저
                    const { lastLat: userLastLat, lastLng: userLastLng } = user;

                    return (
                        driverLastLat >= userLastLat - 0.05 &&
                        driverLastLat <= userLastLat + 0.05 &&
                        driverLastLng >= userLastLng - 0.05 &&
                        driverLastLng <= userLastLng + 0.05 
                    );
                }
            )
        }
    }
}

export default resolvers;