export const faq: {
    question: string;
    answer: string;
}[] = [
    {
        question: "Why are there two versions?",
        answer:
            "v3001 also serves as a drop-in replacement and continuation on KABOOM library with many fixes and improvements. Although, some more in-depth changes and improvements would break this compatibility, thus v4000 was created naturally and is the future of KAPLAY with a room for much bigger improvements and features.",
    },
    {
        question: "Should I switch early?",
        answer:
            "Currently, there aren't many compatibility issues. The sooner you switch the better, as it will only stray more and more with time. We are working on making it stable with some work in progress API finalized.",
    },
    {
        question: "Why alpha? Is it stable?",
        answer:
            "Only because the API could change, which is always mentioned and documented in the changelog of each released version. Stability, more in the terms of bug count, is on a par with v3001. More people use v4000, the more bug-free it becomes. In the terms of performance, v4001 is already more optimized and performant.",
    },
    {
        question: "Should I migrate (almost) finished game?",
        answer:
            "If you are not having any issues or are satisfied with the features of v3001, there might not be many gains if you do so. But, if you plan on updating the game later on, you might realize that some features from v4000 would be handy.",
    },
];
