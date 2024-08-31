import { cn } from "@/util/cn";
import { component$ } from "@builder.io/qwik";
import FriendsBelow from "../Util/FriendsBelow.astro";

type TestimonialProps = {
    testimonial: {
        name: string;
        tagline: string;
        comment: string;
        social_user?: string;
        social_type?: string;
        social_link?: string;
        avatar: string;
        friend: string;
        shape: string;
    };
};

export const Testimonial = component$<TestimonialProps>(({ testimonial }) => {
    return (
        <div class="rounded-box bg-base-300 p-4 flex gap-4 h-40">
            <div class="avatar">
                <div
                    class={cn("mask w-24", {
                        "mask-hexagon-2": testimonial.shape === "hexagon",
                        "mask-circle": testimonial.shape === "circle",
                        "mask-squircle": testimonial.shape === "squircle",
                    })}
                >
                    <img src={testimonial.avatar} />
                </div>
            </div>
            <div class="max-w-[40ch]">
                <p class="font-semibold text-lg flex gap-2">
                    <span>{testimonial.name}</span>

                    {testimonial.social_user && (
                        <a class="text-primary" href={testimonial.social_link}>
                            @{testimonial.social_user}
                        </a>
                    )}
                </p>
                <p class="text-gray-400">{testimonial.tagline}</p>
                <blockquote>
                    {testimonial.comment}
                </blockquote>
            </div>
        </div>
    );
});
