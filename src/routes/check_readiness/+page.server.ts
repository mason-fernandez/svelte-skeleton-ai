import weaviate, { connectToWeaviateCloud } from 'weaviate-client'
import type { WeaviateClient } from 'weaviate-client'
import type { PageServerLoad } from '/$types'

let client: WeaviateClient

// //thorteks thingy for custom port
// async function connectToWeaviate() : Promise <WeaviateClient> {
//     const clientPromise = weaviate.connectToCustom({
//         httpHost: 'localhost',
//         httpPort: 3700,
//         grcpHost: 'localhost',
//         grcpPort: 50051
//     });
//     return clientPromise;
// }

export const load: PageServerLoad = async () => {
    //thors thingy for custom port
    //client = await connectToWeaviate()
    client = await weaviate.connectToLocal()

    const clientReadiness = await client.isReady()

    console.log('Client is ready', clientReadiness )

    client.close()

    return {
        ready: clientReadiness
    }
}