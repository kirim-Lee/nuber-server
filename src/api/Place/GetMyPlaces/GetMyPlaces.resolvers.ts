import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/resolverMiddleware";
import User from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graph";

const resolvers: Resolvers = {
   Query: {
       GetMyPlaces: authResolver( async( _, __, { req }): Promise<GetMyPlacesResponse> => {
           try {
               const user: User | any = await User.findOne(
                   {id: req.user.id}, 
                   {relations: ["places"]}
                );
               if (user) {
                return {
                    ok: false,
                    error: null,
                    places: user.places
                }  
               } else {
                    return {
                        ok: false,
                        error: '',
                        places: null
                    }  
               }
           } catch(error) {
               return {
                   ok: false,
                   error: error.message,
                   places: null
               }
           }
       })
   }
}

export default resolvers; 