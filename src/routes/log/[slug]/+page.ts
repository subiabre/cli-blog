export async function load({ params }) {
    const post = await import(`../../../posts/${params.slug}.md`)
    const content = post.default

    return {
        content,
        slug: params.slug,
        metadata: post.metadata
    }
}