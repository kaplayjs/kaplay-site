import { component$ } from "@builder.io/qwik";
import { Block } from "./Block";
import { BlockStack } from "./BlockStack";

export const BlocksSection = component$(() => {
    return (
        <div class="text-pangolin flex min-h-screen w-full flex-col justify-center gap-6 overflow-hidden p-4 lg:flex-row">
            <div class="flex w-full flex-col items-center gap-4">
                <div class="w-full max-w-xl space-y-4">
                    <h2 class="text-5xl font-semibold">
                        An enjoyable API based on{" "}
                        <span class="text-primary">blocks</span>
                    </h2>
                    <p class="text-pangolin text-xl">
                        <span class="text-primary">KAPLAY</span> is enjoyable
                        and fun to use and easy to learn. That's why we've
                        designed it to be based on{" "}
                        <strong>blocks and functions</strong>. Here are some of
                        the most common blocks you'll use.
                    </p>
                </div>
                <div class="| flex w-full flex-col gap-4 lg:p-4">
                    <BlockStack hideOnMobile>
                        <Block title="Start game" code={`kaplay();`} />
                        <Block title="Play a sound" code={`play("sound");`} />
                        <Block
                            title="Destroy an object"
                            code={`destroy(obj)`}
                        />
                        <Block title="Get objs with tag" code={`get("dino")`} />
                        <Block
                            title="Jump"
                            code={`obj.jump() // body() needed`}
                        />
                        <Block
                            title="Add a comp dynamically"
                            code={`obj.use(rotate(90))`}
                        />
                        <Block
                            title="Log on the screen"
                            code={`debug.log("hi")`}
                        />
                    </BlockStack>
                    <BlockStack hideOnMobile>
                        <Block
                            title="Add obj with tag"
                            code={`add([\n  sprite("rex"), \n  pos(20, 40),\n  "dino",\n]);`}
                        />
                        <Block
                            title="Add transform components"
                            code={`add([\n  sprite("bean")\n  pos(10, 10),\n  rotate(90),\n  anchor("center"),\n]);`}
                        />
                        <Block
                            title="Create scenes"
                            code={`scene("win", (score) => {\n  debug.log(score) \n}); \n\n// go and send params\ngo("win", 1);`}
                        />
                        <Block
                            title="Presses / Releases a key"
                            code={`onKeyPress("f", () => {\n  // code \n}); \n\nonKeyRelease(...);\nonKeyDown(...);`}
                        />
                        <Block
                            title="With physics"
                            code={`add([\n  sprite("bean"), \n  area(),\n  body(),\n]);`}
                        />
                        <Block
                            title="Run logic on objs with tag"
                            code={`onUpdate("dino", (obj) => {\n  // needs rotate()\n  obj.angle += 15  \n});`}
                        />
                    </BlockStack>
                    <BlockStack>
                        <Block
                            title="Hoverable & Clickable"
                            code={`add([\n  sprite("bean"), \n  area()\n]);`}
                        />
                        <Block
                            title="Add a sprite"
                            code={`add([\n  sprite("bean"), \n  pos(20, 40)\n]);`}
                        />
                        <Block
                            title="Add a text"
                            code={`add([\n  text("ohhi"), \n  pos(20, 40)\n]);`}
                        />
                        <Block
                            title="Load assets"
                            code={`loadSprite("sprite", "/bean.png");\nloadFont("font", "/font.ttf");\nloadSound("sound", "/sound.mp3");`}
                        />
                        <Block
                            title="Run on update"
                            code={`onUpdate(() => {\n  // code \n});`}
                        />
                        <Block
                            title="Run on draw"
                            code={`onDraw(() => {\n  // code \n});`}
                        />
                        <Block
                            title="Run on loop"
                            code={`loop(1, () => {\n  // every 1s \n});`}
                        />
                        <Block
                            title="Wait for run"
                            code={`wait(1, () => {\n  // after 1s \n});`}
                        />
                    </BlockStack>
                </div>

                <p class="prose w-full max-w-xl text-balance text-center text-xl">
                    No more long nested methods like
                    <code class="mx-1">
                        obj.position.transform.translate(10, 20)
                    </code>{" "}
                    Just <span class="text-primary">simple</span> and{" "}
                    <span class="text-primary">fun</span> to use methods and
                    functions.
                </p>
            </div>
        </div>
    );
});
