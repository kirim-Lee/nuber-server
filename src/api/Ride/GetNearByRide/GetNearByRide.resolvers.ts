import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import { GetNearByRideResponse } from "../../../types/graph";
import { getRepository, Between } from "typeorm";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
    Query: {
        GetNearByRide: authResolver(async(_, __, { req }): Promise<GetNearByRideResponse> => {
            const user: User = req.user;
            const { lastLat, lastLng } = user;
            if(user.isDriving) {
                try{
                    const ride = await getRepository(Ride).findOne({
                        status: "REQUESTING",
                        pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
                        pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
                    }, {relations: ["passenger"]});
                    if (ride) {
                        return {
                            ok: true,
                            error: null,
                            ride
                        }
                    } else {
                        return {
                            ok: true,
                            error: null,
                            ride: null
                        }
                    }                    
                }catch(error) {
                    return {
                        ok: false,
                        error: error.message,
                        ride: null                  
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "You are not a driver",
                    ride: null
                }
            }
            
            

        })
    }
}

export default resolvers;