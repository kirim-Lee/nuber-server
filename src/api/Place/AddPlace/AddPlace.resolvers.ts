import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { AddPlaceResponse, AddPlaceMutationArgs } from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        AddPlace: authResolver(async (_, args: AddPlaceMutationArgs, { req }): Promise<AddPlaceResponse> => {
            const user: User= req.user;
            try {
                await Place.create({ ...args, user }).save();
                return {
                    ok: true,
                    error: null
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers; 