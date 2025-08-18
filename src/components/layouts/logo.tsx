import { IconInnerShadowTop } from '@tabler/icons-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <IconInnerShadowTop className="!size-5" />
      <span className="text-base font-semibold">Acme Inc.</span>
    </div>
  );
}
