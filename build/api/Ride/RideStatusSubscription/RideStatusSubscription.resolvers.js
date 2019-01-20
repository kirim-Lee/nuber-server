"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Subscription: {
        RideStatusSubscription: {
            subscribe: graphql_yoga_1.withFilter(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator("rideUpdate");
            }, function (payload, _, _a) {
                var context = _a.context;
                // payload 로 받는 것은 RequestRide.resolvers.ts에서 업데이트 할때 주는 값 (user)
                // context 로 받는 것은 index.ts에서 graphql속성 설정으로 subscription 연결시 context로 전달받은 값이다
                var user = context.currentUser; // 접속한 유저
                var _b = payload.RideStatusSubscription, driverId = _b.driverId, passengerId = _b.passengerId; // 갱신된 유저
                return (user.id === driverId || user.id === passengerId);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=RideStatusSubscription.resolvers.js.map