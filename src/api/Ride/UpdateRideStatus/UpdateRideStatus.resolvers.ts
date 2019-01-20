import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Mutation: {
        UpdateRideStatus: authResolver(
            async( _, args: UpdateRideStatusMutationArgs, { req, pubSub }): Promise<UpdateRideStatusResponse> => {
            const user: User = req.user;
            if(user.isDriving) {
                try {
                    let ride: Ride | undefined;
                    if(args.status === "ACCEPTED") {
                        ride = await Ride.findOne({
                            id: args.rideId,
                            status: "REQUESTING"
                        }, {relations: ["passenger", "driver", "chat"]});
                        if (ride) {
                            ride.driver = user;
                            user.isTaken = true;
                            user.save();
                            // 탑승요청 상태로 바뀔 때 채팅방을 만듬
                            const chat = await Chat.create({
                                driver: user,
                                passenger: ride.passenger                                
                            }).save();
                            ride.chat = chat;
                            ride.save();

                        }
                    } else {
                        ride = await Ride.findOne({
                            id: args.rideId,
                            driver: user
                        }, {relations: ["passenger", "driver", "chat"]});
                    }
                    if(ride) {
                        ride.status = args.status;
                        ride.save();
                        pubSub.publish("rideUpdate", {RideStatusSubscription: ride});

                        if(args.status === "FINISHED") {
                            const passengerUser = await User.findOne({id: ride.passengerId});
                            if (passengerUser) {
                                passengerUser.isRiding = false;
                                passengerUser.save();
                            }
                            user.isTaken = false;
                            user.save();
                        }
                        return {
                            ok: true,
                            error: null,
                            rideId: ride.id
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can\'t update ride",
                            rideId: null
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        rideId: null
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "You are not driver",
                    rideId: null
                }
            }
        })
    }
}

export default resolvers;