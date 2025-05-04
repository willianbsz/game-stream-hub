'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useSubscription } from '@/hooks/use-subscription';

import LoadingDependencies from '../error/loading-dependencies';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function SubscriptionGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { loadSubscription } = useSubscription();

  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkSubscription = async (): Promise<void> => {
    logger.debug('[SubscriptionGuard]: Checking subscription');

    const subscription = await loadSubscription();

    if (!subscription || subscription.isCanceled) {
      setIsChecking(false);
      logger.debug('[SubscriptionGuard]: User is logged in, and has registered data, but has no subscription active');
      router.replace(paths.subscriptionNotFound);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkSubscription().catch((err: unknown) => {
      logger.error('[SubscriptionGuard]: Error checking subscription', err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  if (isChecking) {
    return (
      <LoadingDependencies
        title="Buscando dados da sua assinatura..."
        description="Só mais um momento enquanto verificamos sua assinatura."
      />
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
