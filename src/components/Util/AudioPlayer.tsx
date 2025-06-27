import { cn } from "@/util/cn";
import { assets } from "@kaplayjs/crew";
import { useEffect, useRef, useState } from "preact/hooks";

type AudioPlayerProps = {
    src: string;
    bigPlayButton?: boolean;
};

const calcTime = (secs: number, dur?: number): string => {
    return (dur ?? secs) > 1
        ? `${Math.floor(secs / 60)}:${
            Math.floor(secs % 60).toString().padStart(2, "0")
        }`
        : `${secs.toFixed(2)}s`;
};

export const AudioPlayer = (
    { src, bigPlayButton = true }: AudioPlayerProps,
) => {
    const playSize = bigPlayButton ? 32 : 18;

    const audio = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState<number>(100);
    const [mutedAt, setMutedAt] = useState<null | number>(null);
    const [curTime, setCurTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");
    const [playing, setPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const progressRaf = useRef<number | null>(null);

    const onLoadedMetadata = () => {
        const duration = audio.current?.duration ?? 0;
        setDuration(calcTime(duration));
        setCurTime(calcTime(0, duration));
        setPlaying(false);
    };

    const togglePlay = () => {
        if (!audio?.current) return;

        setPlaying(!playing);
        audio.current[audio.current.paused ? "play" : "pause"]();
    };

    const onPlaying = () => {
        if (!audio?.current) return;

        const curTime = audio.current.currentTime;

        setProgress(curTime * 100 / audio.current.duration);
        setCurTime(calcTime(curTime, audio.current.duration));

        progressRaf.current = requestAnimationFrame(onPlaying);
    };

    const onSeek = (e: preact.JSX.TargetedEvent<HTMLInputElement>) => {
        if (!audio?.current) return;

        if (!audio.current.paused && progressRaf.current) {
            audio.current.pause();
            cancelAnimationFrame(progressRaf.current);
            progressRaf.current = -1;
        }

        const newTime = (e.target as HTMLInputElement).valueAsNumber / 100
            * audio.current.duration;

        audio.current.currentTime = newTime;
        setCurTime(calcTime(newTime));
        setProgress(newTime * 100 / audio.current.duration);
    };

    const onSeekEnd = () => {
        if (progressRaf.current != -1) return;

        audio.current?.play();
        onPlaying();
    };

    const onVolumeChange = (e: preact.JSX.TargetedEvent<HTMLInputElement>) => {
        if (!audio?.current) return;

        const value = (e.target as HTMLInputElement).valueAsNumber;

        audio.current.volume = value / 100;
        audio.current.muted = false;
        setVolume(value);
        setMutedAt(value == 0 ? 50 : null);
    };

    const muteHandler = () => {
        if (!audio?.current) return;

        const value = mutedAt == null ? volume : null;

        audio.current.muted = value != null;
        setMutedAt(value);
        setVolume(value == null ? mutedAt! : 0);
    };

    useEffect(() => {
        if (playing) {
            progressRaf.current = requestAnimationFrame(onPlaying);
        } else {
            cancelAnimationFrame(progressRaf.current!);
        }
    }, [playing]);

    useEffect(() => {
        if ((audio.current?.readyState ?? 0) > 0) onLoadedMetadata();
    }, [audio]);

    useEffect(() => {
        if (!audio.current) return;

        audio.current.load();
        setProgress(0);
    }, [src]);

    useEffect(() => {
        const parentDialog = audio.current?.closest("dialog");
        if (!parentDialog) return;

        const observer = new MutationObserver(() =>
            !parentDialog.open && audio.current?.pause()
        );
        observer.observe(parentDialog, { attributes: true });

        return () => observer.disconnect();
    });

    return (
        <div class="flex flex-wrap gap-px p-px bg-base-50 rounded-lg">
            <audio
                class="w-full rounded-lg"
                ref={audio}
                onLoadedMetadata={onLoadedMetadata}
                onPause={() => progressRaf.current != -1 && setPlaying(false)}
                onEnded={() => setPlaying(false)}
            >
                <source src={src} type="audio/mpeg" />
            </audio>

            <button
                onClick={togglePlay}
                class={cn(
                    "swap shrink-0 p-2 bg-base-300 rounded-lg hover:bg-base-300/80 focus:outline-none focus-visible:ring-2 ring-base-content transition-colors",
                    {
                        "w-full py-4": bigPlayButton,
                        "swap-active": playing,
                    },
                )}
            >
                <img
                    class="swap-off duration-100"
                    src={assets.play.outlined}
                    width={playSize}
                    height={playSize}
                    aria-hidden="true"
                />

                <img
                    class="swap-on duration-100"
                    src={assets.pause.outlined}
                    width={playSize}
                    height={playSize}
                    aria-hidden="true"
                />
            </button>

            <div class="flex items-center gap-2 flex-1 px-3 py-2 bg-base-300 rounded-lg">
                <output class="text-sm tabular-nums">{curTime}</output>

                <input
                    type="range"
                    value={progress}
                    max="100"
                    class="range range-xs range-primary"
                    onInput={onSeek}
                    onChange={onSeekEnd}
                    autocomplete="off"
                />

                <span class="text-sm tabular-nums">{duration}</span>
            </div>

            <div class="flex items-center gap-2 grow-0 basis-auto pl-3 pr-2 py-2 bg-base-300 rounded-lg">
                <input
                    type="range"
                    value={volume}
                    max="100"
                    class="range range-xs w-auto max-w-16"
                    onInput={onVolumeChange}
                />

                <button
                    onClick={muteHandler}
                    class={cn(
                        "swap btn btn-ghost h-auto min-h-0 -m-0.5 p-0.5",
                        {
                            "swap-active": volume == 0,
                        },
                    )}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="swap-off"
                    >
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                        <path d="M16 9a5 5 0 0 1 0 6" />
                        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                    </svg>

                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="swap-on"
                    >
                        <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                        <line x1="22" x2="16" y1="9" y2="15" />
                        <line x1="16" x2="22" y1="9" y2="15" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
