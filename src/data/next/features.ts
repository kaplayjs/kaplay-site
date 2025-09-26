import { type SpriteCrewAsset } from "@kaplayjs/crew";

export const features: {
    title: string;
    description?: string;
    icon: SpriteCrewAsset;
    guide?: {
        url: string;
        label?: string;
    };
    links?: {
        name: string;
        url: string;
    }[];
}[] = [
    {
        title: "Prefabs & Serialization",
        description:
            "Create prefabricated objects with built-in serialization, ready to be reused or saved & loaded as-is",
        icon: "copy",
        guide: {
            url: "https://v4000.kaplayjs.com/docs/guides/prefabs/",
        },
        links: [
            {
                name: "createPrefab()",
                url: "https://v4000.kaplayjs.com/docs/api/ctx/createPrefab/",
            },
        ],
    },
    {
        title: "Picture API",
        description:
            "Draw a picture composed of any primitives or sprites optimally by skipping the repeated drawing pipeline and render to framebuffer",
        icon: "art",
        guide: {
            url: "https://v4000.kaplayjs.com/docs/guides/picture/",
        },
        links: [
            {
                name: "Example",
                url: "https://play.kaplayjs.com/?example=picture",
            },
        ],
    },
    {
        title: "Circle & Ellipse Collision Shapes",
        description:
            "Circular colliders were previously not possible in the v3001. Now you can use a `new Circle()` or `Ellipse()` as area shapes",
        icon: "portal",
        links: [
            {
                name: "Area Shape",
                url: "https://v4000.kaplayjs.com/docs/api/AreaCompOpt/?preview=Shape",
            },
            {
                name: "Circle()",
                url: "https://v4000.kaplayjs.com/docs/api/Circle/",
            },
            {
                name: "Ellipse()",
                url: "https://v4000.kaplayjs.com/docs/api/Ellipse/",
            },
        ],
    },
    {
        title: "Fake Mouse",
        description:
            "Create a custom cursor with ability to control it even without a mouse! More accessibility for cursor-based games",
        icon: "cursor",
        guide: {
            url: "https://v4000.kaplayjs.com/docs/guides/fake_mouse/",
        },
        links: [
            {
                name: "Component",
                url: "https://v4000.kaplayjs.com/docs/api/ctx/fakeMouse/",
            },
            {
                name: "Example",
                url: "https://play.kaplayjs.com/?example=fakeMouse",
            },
        ],
    },
    {
        title: "Video",
        description:
            "Render a video right to the canvas easily using the built-in `video()` component",
        icon: "play",
        guide: {
            url: "https://v4000.kaplayjs.com/docs/guides/video/",
        },
        links: [
            {
                name: "Component",
                url: "https://v4000.kaplayjs.com/docs/api/ctx/video/",
            },
            {
                name: "Example",
                url: "https://play.kaplayjs.com/?example=video",
            },
        ],
    },
    {
        title: "Object Parent Changing",
        icon: "heart",
        links: [
            {
                name: "setParent()",
                url: "https://v4000.kaplayjs.com/docs/api/GameObjRaw/#GameObjRaw-setParent",
            },
        ],
    },
    {
        title: "Improved TypeScript & Intellisense",
        icon: "check_mark",
    },
    {
        title: "Full ECS under the hood",
        icon: "home",
    },
];
