import apple from "@/../kaplay/assets/sprites/apple.png";
import bag from "@/../kaplay/assets/sprites/bag.png";
import bean from "@/../kaplay/assets/sprites/bean.png";
import ghosty from "@/../kaplay/assets/sprites/ghosty.png";
import gigagantrum from "@/../kaplay/assets/sprites/gigagantrum.png";
import love from "@/../kaplay/assets/sprites/heart.png";
import pineapple from "@/../kaplay/assets/sprites/pineapple.png";

export type KAFriend = keyof typeof friendList;

export const friendList = {
    bag: {
        src: bag,
        alt: "KAFriend Bag",
    },
    bean: {
        src: bean,
        alt: "KAFriend Bean",
    },
    ghosty: {
        src: ghosty,
        alt: "KAFriend Ghosty",
    },
    gigagantrum: {
        src: gigagantrum,
        alt: "KAFriend Gigagantrum",
    },
    apple: {
        src: apple,
        alt: "KAFriend Apple",
    },
    pineapple: {
        src: pineapple,
        alt: "KAFriend Pineapple",
    },
    love: {
        src: love,
        alt: "KAFriend Love",
    },
};
