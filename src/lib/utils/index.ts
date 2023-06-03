export const getPosts = async () => {
    const posts = Object.entries(import.meta.glob('/src/posts/*.md'));

    return await Promise.all(
        posts.map(async ([path, value]) => {
            return {
                data: await value(),
                slug: path.slice(11, -3),
            }
        })
    );
}