import type { Locale } from "@/util/i18n";
import { atom } from "nanostores";

export const $lang = atom<Locale>("en");
