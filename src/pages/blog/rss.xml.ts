import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const blog = (await getCollection("blog")).sort(
        (a, b) =>
            new Date(a.data.date).getTime()
            - new Date(b.data.date).getTime(),
    )
        .reverse();

    return rss({
        title: "KAPLAY.js Blog",
        description: "All the official updates in KAPLAY development.",
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: new Date(post.data.date),
            description: post.data.description,
            link: `/blog/${post.id}/`,
            author: post.data.author,
        })),
    });
}
