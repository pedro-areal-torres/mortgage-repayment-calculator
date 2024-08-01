import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function CalculatorInfoDisclaimer() {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="text-xs leading-6 text-slate-500 hover:cursor-default"
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex flex-row gap-1 items-start sm:items-center">
            {t('Read Disclaimer')}
            <svg viewBox="0 0 1024 1024" fill="gray" height="1rem" width="1rem">
              <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-72">{t('Disclaimer')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
