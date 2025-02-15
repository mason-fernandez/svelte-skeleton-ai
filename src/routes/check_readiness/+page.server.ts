import weaviate, { connectToWeaviateCloud } from 'weaviate-client'
import type { WeaviateClient } from 'weaviate-client'
import type { PageServerLoad } from '/$types'

let client: WeaviateClient
let clientReadiness = false;


export const load: PageServerLoad = async () => {
    try {
        client = await weaviate.connectToLocal()
        clientReadiness = await client.isReady()
        client.close()
    } catch (error) {
        console.log(error)
        clientReadiness = false
    }
    return {
        ready: clientReadiness
    }
}