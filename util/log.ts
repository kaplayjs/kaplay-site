import pc from "picocolors";

export function logStep(tag: string, message: string) {
    const time = new Date().toLocaleTimeString('en', { hour12: false });
    console.log(`${pc.gray(time)} ${pc.blue(`[${tag}]`)} ${message}`);
}