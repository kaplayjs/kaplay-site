import { component$ } from "@builder.io/qwik";
import { Block } from "./Block";
import { BlockStack } from "./BlockStack";

export const BlocksSection = component$(() => {
    return (
        <div class="w-full min-h-screen flex flex-col lg:flex-row justify-center gap-6 p-4">
            <div class="w-full flex flex-col items-center gap-4">
                <div class="max-w-xl w-full">
                    <h2 class="text-5xl font-semibold">
                        An API based on <span class="text-primary">blocks</span>
                    </h2>
                    <p>
                        <span class="text-primary">KAPLAY</span>{" "}
                        is enjoyable to use and easy to learn. That's why we've
                        designed it to be based on{" "}
                        <strong>blocks and functions</strong>. Here are some of
                        the most common blocks you'll use.
                    </p>
                </div>
                <div class="lg:p-4 | flex flex-col justify-center gap-4 w-full">
                    <BlockStack>
                        <Block
                            title="Start game"
                            code={`kaplay();`}
                        />
                        <Block
                            title="Play a sound"
                            code={`play("sound");`}
                        />
                        <Block
                            title="Destroy an object"
                            code={`destroy(obj)`}
                        />
                        <Block
                            title="Get objs with tag"
                            code={`get("dino")`}
                        />
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
                    <BlockStack>
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
            </div>
        </div>
    );
});
