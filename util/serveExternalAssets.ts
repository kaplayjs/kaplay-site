import type { AstroIntegration } from "astro";
import sirv from "sirv";

export const serveExternalAssets = (
    folder: string,
    ext = ["mp4", "webm", "ogg", "mov"],
): AstroIntegration => ({
    name: "serve-external-assets",
    hooks: {
        "astro:server:setup": ({ server }) => {
            const serve = sirv(folder, { dev: true });

            server.middlewares.use(`/${folder}`, (req, res, next) => {
                const urlPath = (req.url || "").split("?")[0];
                if (!(new RegExp(`\.(${ext.join("|")})$`, "i")).test(urlPath)) {
                    return next();
                }
                serve(req, res, next);
            });
        },
    },
});
