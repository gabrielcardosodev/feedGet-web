import { useState } from 'react';

import { Loading } from './Loading';

import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot,
  onScreenshotTook,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-300  dark:text-zinc-400 dark:hover:text-zinc-100 transition-all"
        type="button"
        style={{
          backgroundImage: `url(${screenshot})`,
        }}
        onClick={() => onScreenshotTook(null)}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      className="p-2 dark:bg-zinc-800 bg-brand-500 rounded-md border-transparent dark:hover:bg-zinc-700 hover:opacity-80  transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 focus:ring-brand-500"
      type="button"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 dark:text-zinc-100 text-zinc-700" />
      )}
    </button>
  );
}
