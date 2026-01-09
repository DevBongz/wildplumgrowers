import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Shopify webhook topics that trigger revalidation
type WebhookTopic =
  | 'products/create'
  | 'products/update'
  | 'products/delete'
  | 'collections/create'
  | 'collections/update'
  | 'collections/delete'

// Map webhook topics to cache tags
const topicToTags: Record<WebhookTopic, string[]> = {
  'products/create': ['products', 'collections'],
  'products/update': ['products', 'collections'],
  'products/delete': ['products', 'collections'],
  'collections/create': ['collections'],
  'collections/update': ['collections'],
  'collections/delete': ['collections'],
}

export async function POST(request: NextRequest) {
  // Verify the secret
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret')
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // Get the webhook topic from Shopify headers
    const topic = request.headers.get('x-shopify-topic') as WebhookTopic | null

    // Get the tags to revalidate based on the topic
    const tags = topic && topicToTags[topic] ? topicToTags[topic] : ['products', 'collections']

    // Revalidate each tag
    for (const tag of tags) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    return NextResponse.json({
      revalidated: true,
      topic,
      tags,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Also support GET for testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate all product and collection data
  revalidateTag('products')
  revalidateTag('collections')

  return NextResponse.json({
    revalidated: true,
    tags: ['products', 'collections'],
    now: Date.now(),
  })
}

