import { FormEvent, useState } from 'react';

import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

import { FeedbackType, feedbackTypes } from '..';

import { ArrowLeft } from 'phosphor-react';

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackTypeResetRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackTypeResetRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({
      screenshot,
      comment,
    });

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-700 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          type="button"
          onClick={onFeedbackTypeResetRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm dark:placeholder-zinc-400 placeholder-zinc-700 dark:text-zinc-100 text-zinc-700 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-brand-500 scrollbar-track-transparent"
          placeholder="Conte em detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
            disabled={comment.length === 0}
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
