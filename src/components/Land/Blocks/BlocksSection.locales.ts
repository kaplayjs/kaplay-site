export const blocks = {
    "en": [
        {
            title: "<span class=\"text-[#6bc96c]\">Start</span> game",
            code:
                `<span class="text-violet-400">kaplay</span>({ \n  background: <span class="inline-flex items-center gap-1 align-bottom text-[darkSalmon]"><span class="bg-current size-3 rounded-[0.25rem]"></span>"darkSalmon"</span>,\n  debug: <span class="text-blue-400">true</span>,\n  burp: <span class="text-blue-400">true</span>,\n  <span class="opacity-40">// and more uselful opts, like burp is</span> \n});\n\ndebug.<span class="text-violet-400">log</span>("Press (B) button to burp!");`,
        },
        {
            title: "Add an <span class=\"text-[#8db7ff]\">object</span>",
            code:
                `const <span class="text-emerald-400">bean</span> = <span class="text-violet-400">add</span>([\n  <span class="text-violet-400">sprite</span>("bean"),\n  <span class="text-violet-400">pos</span>(<span class="text-violet-400">center</span>()), \n  <span class="text-violet-400">health</span>(<span class="text-blue-400">5</span>),\n  <span class="text-violet-400">body</span>(), <span class="opacity-40">// adds physics</span>\n  <span class="text-violet-400">area</span>(), <span class="opacity-40">// adds collisions</span> \n]);`,
        },
        {
            title:
                "<s>Kill</s> <span class=\"text-[#cc425e]\">destroy</span> an object",
            code:
                `<span class="text-violet-400">setGravity</span>(<span class="text-blue-400">1000</span>); \n<span class="text-emerald-400">bean</span>.<span class="text-violet-400">jump</span>(); \n\n<span class="text-emerald-400">bean</span>.<span class="text-violet-400">onCollide</span>("spikes", () => {\n  <span class="text-emerald-400">bean</span>.<span class="text-violet-400">hurt</span>(<span class="text-blue-400">5</span>);\n  <span class="text-emerald-400">bean</span>.<span class="text-red-400">destroy</span>();\n  <span class="text-violet-400">shake</span>(<span class="text-blue-400">5</span>);\n  <span class="text-violet-400">flash</span>(<span class="inline-flex items-center gap-1 align-bottom text-[#cc425e]"><span class="bg-current size-3 rounded-[0.25rem]"></span>"#cc425e"</span>, <span class="text-blue-400">0.2</span>);\n});`,
        },
        {
            title:
                "Add custom <span class=\"text-violet-400\">components</span>",
            code:
                `<span class="opacity-40">// returns an object</span> \nconst <span class="text-emerald-400">spillTheBeans</span> = (<span class="text-orange-300">count</span>) => ({\n  id: <span class="text-red-400">"chaos"</span>, \n  <span class="text-violet-400">add</span>() { <span class="opacity-40">/* code */</span> }, \n}); \n\n<span class="text-violet-400">add</span>([\n  <span class="text-emerald-400">spillTheBeans</span>(<span class="text-blue-300">30</span>), <span class="opacity-40">// adds chaos :O</span> \n]);`,
        },
        {
            title: "<span class=\"text-[#fcef8d]\">Say</span> goodbye",
            code:
                `const <span class="text-[#fcef8d]">bubble</span> = <span class="text-violet-400">add</span>([\n    <span class="text-violet-400">anchor</span>("center"),\n    <span class="text-violet-400">pos</span>(<span class="text-violet-400">center</span>()),\n    <span class="text-violet-400">rect</span>(<span class="text-blue-400">400</span>, <span class="text-blue-400">100</span>, { radius: <span class="text-blue-400">8</span> }),\n    <span class="text-violet-400">outline</span>(<span class="text-blue-400">4</span>, <span class="text-blue-400">BLACK</span>),\n]);\n\n<span class="text-[#fcef8d]">bubble</span>.<span class="text-violet-400">add</span>([\n    <span class="text-violet-400">anchor</span>("center"),\n    <span class="text-violet-400">text</span>(<span class="text-white">"ohhi, I mean.. oh bye!"</span>, {\n        size: <span class="text-blue-400">26</span>,\n    }),\n    <span class="text-violet-400">color</span>(<span class="text-blue-400">BLACK</span>),\n]);`,
        },
    ],
    "es": [
        {
            title: "<span class=\"text-[#6bc96c]\">Inicia</span> el juego",
            code:
                `<span class="text-violet-400">kaplay</span>({ \n  background: <span class="inline-flex items-center gap-1 align-bottom text-[darkSalmon]"><span class="bg-current size-3 rounded-[0.25rem]"></span>"darkSalmon"</span>,\n  debug: <span class="text-blue-400">true</span>,\n  burp: <span class="text-blue-400">true</span>,\n  <span class="opacity-40">// muchas opciones, cómo burp</span> \n});\n\ndebug.<span class="text-violet-400">log</span>("Press (B) button to burp!");`,
        },
        {
            title: "Añade <span class=\"text-[#8db7ff]\">un objeto</span>",
            code:
                `const <span class="text-emerald-400">bean</span> = <span class="text-violet-400">add</span>([\n  <span class="text-violet-400">sprite</span>("bean"),\n  <span class="text-violet-400">pos</span>(<span class="text-violet-400">center</span>()), \n  <span class="text-violet-400">health</span>(<span class="text-blue-400">5</span>),\n  <span class="text-violet-400">body</span>(), <span class="opacity-40">// añade física</span>\n  <span class="text-violet-400">area</span>(), <span class="opacity-40">// añade colisiones</span> \n]);`,
        },
        {
            title:
                "<s>Asesina</s> <span class=\"text-[#cc425e]\">destruye</span> un objeto",
            code:
                `<span class="text-violet-400">setGravity</span>(<span class="text-blue-400">1000</span>); \n<span class="text-emerald-400">bean</span>.<span class="text-violet-400">jump</span>(); \n\n<span class="text-emerald-400">bean</span>.<span class="text-violet-400">onCollide</span>("spikes", () => {\n  <span class="text-emerald-400">bean</span>.<span class="text-violet-400">hurt</span>(<span class="text-blue-400">5</span>);\n  <span class="text-emerald-400">bean</span>.<span class="text-red-400">destroy</span>();\n  <span class="text-violet-400">shake</span>(<span class="text-blue-400">5</span>);\n  <span class="text-violet-400">flash</span>(<span class="inline-flex items-center gap-1 align-bottom text-[#cc425e]"><span class="bg-current size-3 rounded-[0.25rem]"></span>"#cc425e"</span>, <span class="text-blue-400">0.2</span>);\n});`,
        },
        {
            title:
                "Añade tus propios <span class=\"text-violet-400\">componentes</span>",
            code:
                `<span class="opacity-40">// retorna un objeto</span> \nconst <span class="text-emerald-400">spillTheBeans</span> = (<span class="text-orange-300">count</span>) => ({\n  id: <span class="text-red-400">"chaos"</span>, \n  <span class="text-violet-400">add</span>() { <span class="opacity-40">/* code */</span> }, \n}); \n\n<span class="text-violet-400">add</span>([\n  <span class="text-emerald-400">spillTheBeans</span>(<span class="text-blue-300">30</span>), <span class="opacity-40">// añade caos :O</span> \n]);`,
        },
        {
            title: "<span class=\"text-[#fcef8d]\">Di</span> adiós",
            code:
                `const <span class="text-[#fcef8d]">bubble</span> = <span class="text-violet-400">add</span>([\n    <span class="text-violet-400">anchor</span>("center"),\n    <span class="text-violet-400">pos</span>(<span class="text-violet-400">center</span>()),\n    <span class="text-violet-400">rect</span>(<span class="text-blue-400">400</span>, <span class="text-blue-400">100</span>, { radius: <span class="text-blue-400">8</span> }),\n    <span class="text-violet-400">outline</span>(<span class="text-blue-400">4</span>, <span class="text-blue-400">BLACK</span>),\n]);\n\n<span class="text-[#fcef8d]">bubble</span>.<span class="text-violet-400">add</span>([\n    <span class="text-violet-400">anchor</span>("center"),\n    <span class="text-violet-400">text</span>(<span class="text-white">"ohhi, I mean.. oh bye!"</span>, {\n        size: <span class="text-blue-400">26</span>,\n    }),\n    <span class="text-violet-400">color</span>(<span class="text-blue-400">BLACK</span>),\n]);`,
        },
    ],
};
