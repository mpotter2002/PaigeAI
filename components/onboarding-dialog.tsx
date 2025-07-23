"use client"

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';

export default function OnboardingDialog() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
            <Image
              src="/images/paige-avatar.png"
              alt="Paige Avatar"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-medium mb-2">Welcome to Paige</h2>
          <p className="text-muted-foreground">
            Your modern AI assistant. Start a conversation by typing a message below.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

