import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { DeletePlaceMutationArgs, DeletePlaceResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        DeletePlace: authResolver(async(_, args:DeletePlaceMutationArgs, { req }): Promise<DeletePlaceResponse> => {
            const user: User = req.user;
            try {
                const place: Place | any = await Place.findOne({id: args.placeId});
                if(place) {
                    if(place.userId === user.id) {
                        await place.remove();
                        return {
                            ok: true,
                            error: null                
                        }
                    } else {
                        return {
                            ok: false,
                            error: 'Not Authorized'
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "place not found"
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers; 