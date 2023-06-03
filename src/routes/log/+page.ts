import { getPosts } from '$lib/utils/index.js'

export const load = async ({ fetch }) => {
    const posts = await getPosts();

    return { posts };
}
