import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Between, getRepository } from "typeorm";

const resolvers: Resolvers = {
    Query: {
        GetNearByDrivers: authResolver(async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
            const user: User = req.user;
            // 경위도 0.5 사이
            const {lastLat, lastLng} = user;
            try {
                const drivers: User[] = await getRepository(User).find({
                    isDriving: true,
                    lastLat: Between(lastLat - 0.05, lastLat + 0.05),
                    lastLng: Between(lastLng - 0.05, lastLng + 0.05)
                });
                return {
                    ok: true,
                    error: null,
                    drivers: drivers
                }
            } catch (error){
                return {
                    ok: false,
                    error: error.message,
                    drivers: null
                }
            }
        })
    }
}

export default resolvers;