import OpenAI from 'openai'
import type { MessageBody } from '$lib/types/MessageBody'
import weaviate, { type WeaviateClient } from 'weaviate-client'
import type { ChunkObject } from '$lib/types/ChunkObject'
import { SYSTEM_PROMPTS, type SystemPromptKey } from '$lib/prompts/systemPrompts'

let client: WeaviateClient

const openai = new OpenAI({
	baseURL: 'http://localhost:11434/v1',
	apiKey: 'ollama' // required but unused
})

export const POST = async ({ request }) => {
	try {
		console.log('Request received at /api/chat')
		client = await weaviate.connectToLocal()
		const body: MessageBody = await request.json()
		const { chats, systemPrompt, deepSeek, fileNames } = body

		if (!chats || !Array.isArray(chats)) {
			return new Response('Invalid chat history', { status: 400 })
		}

		// conditionally check for fileNames existing or not
		if (fileNames && Array.isArray(fileNames) && fileNames.length > 0) {
			const chunksCollection = client.collections.get<ChunkObject>('Chunks')
			const generatePrompt = `You are a knowledgeable assistant analyzing document content.
    Instructions:
    - Use the provided text to answer questions accurately
    - If specific data points are mentioned, ensure they match exactly
    - Quote relevant passages when appropriate
    - If information isn't in the documents, say so
    - Maintain conversation context
	Current question: "${chats[chats.length - 1].content}"
	Previous context: "${chats
		.slice(-2, -1)
		.map((chat) => chat.content)
		.join('\n')}"`

			// get the most recent user message as the primary query
			const currentQuery = chats[chats.length - 1].content

			try {
				console.log("generating neartext")
				const result = await chunksCollection.generate.nearText(
					currentQuery,
					{ groupedTask: generatePrompt },
					{ limit: 3 }
				)

				if (!result.generated) {
					return new Response(
						"I couldn't find specific information matching your query. Could you rephrase or be more specific?",
						{ status: 200 }
					)
				}

				return new Response(result.generated, { status: 200 })

			} catch (error) {
				console.error('Error generating response:', error)
				return new Response("Something went wrong", { status: 500 })
			}
		} else {
			const selectedPrompt =
				SYSTEM_PROMPTS[systemPrompt as SystemPromptKey] ?? SYSTEM_PROMPTS['Helpful Assistant']

			const stream = await openai.chat.completions.create({
				model: deepSeek ? 'deepseek-r1:8b' : 'llama3.2',
				messages: [{ role: 'system', content: selectedPrompt }, ...body.chats],
				stream: true
			})

			// Create a new ReadableStream for the response
			console.log('Creating ReadableStream for response')
			const readableStream = new ReadableStream({
				async start(controller) {
					for await (const chunk of stream) {
						const text = chunk.choices[0]?.delta?.content || ''
						controller.enqueue(text)
					}
					controller.close()
				}
			})

			return new Response(readableStream, {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
	} catch (error) {
		return new Response('Something went wrong', { status: 500 })
	}
}
