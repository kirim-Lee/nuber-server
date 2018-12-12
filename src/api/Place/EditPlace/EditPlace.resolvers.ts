import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
    Mutation: {
        EditPlace: authResolver(async(_, args: EditPlaceMutationArgs, { req }) => {
            const user: User = req.user;
            try {
                const place = await Place.findOne({ id: args.placeId });
                if (place) {
                    if(place.userId === user.id) {
                        const notNull = cleanNullArgs(args);
                        await Place.update({id: args.placeId}, {...notNull});
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
            } catch (error){
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers; 