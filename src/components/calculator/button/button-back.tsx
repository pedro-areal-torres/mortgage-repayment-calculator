import { useTranslation } from 'react-i18next';

import { Button } from '@components/ui/button';
import { useCalculator } from '@context/useCalculator';

export default function ButtonBack() {
  const { t } = useTranslation();
  const { setShowForm } = useCalculator();

  return (
    <Button variant={'outline'} onClick={() => setShowForm(true)}>
      {t('Back')}
    </Button>
  );
}
