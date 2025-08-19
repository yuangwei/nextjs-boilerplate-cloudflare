import Image from 'next/image';

import { geistMono, geistSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="logo"
        width={22}
        height={22}
        className="block dark:hidden"
      />
      <Image
        src="/logo-light.svg"
        alt="logo"
        width={22}
        height={22}
        className="hidden dark:block"
      />
      <span
        className={cn(
          geistMono.className,
          'text-base font-bold',
          'text-foreground'
        )}
      >
        ScratchStarter
      </span>
    </div>
  );
}
