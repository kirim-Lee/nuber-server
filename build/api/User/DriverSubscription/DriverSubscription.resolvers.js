"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Subscription: {
        DriverSubscription: {
            subscribe: graphql_yoga_1.withFilter(// withFilter 는 처음 파라미터는 이터레이터, 두번째 파라미터는 함수를 받고 리턴값에 따라 노출할지 여부를 결정한다.(boolean)
            function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator("driverUpdate");
            }, function (payload, _, _a) {
                var context = _a.context;
                // payload 로 받는 것은 ReportMovement.resolvers.ts에서 업데이트 할때 주는 값 (user)
                // context 로 받는 것은 index.ts에서 graphql속성 설정으로 subscription 연결시 context로 전달받은 값이다
                var user = context.currentUser; // 접속한 유저
                var _b = payload.DriverSubscription, driverLastLat = _b.lastLat, driverLastLng = _b.lastLng; // 갱신된 유저
                var userLastLat = user.lastLat, userLastLng = user.lastLng;
                return (driverLastLat >= userLastLat - 0.05 &&
                    driverLastLat <= userLastLat + 0.05 &&
                    driverLastLng >= userLastLng - 0.05 &&
                    driverLastLng <= userLastLng + 0.05);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=DriverSubscription.resolvers.js.map