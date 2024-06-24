import type { Locale } from "@/util/i18n";
import { atom } from "nanostores";

export const $openExample = atom("KaboomCtx");
export const $lang = atom<Locale>("en");
