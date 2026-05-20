"use client";

import { UpgradeDialog } from "@/components/pricing/premium-universal-dialog";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type PricingDialogContextType = {
  open: () => void;
  close: () => void;
};

const PricingDialogContext = createContext<PricingDialogContextType | null>(
  null,
);

export function PricingDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    console.log("Open the dialog");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  return (
    <PricingDialogContext.Provider value={value}>
      {children}
      <UpgradeDialog open={isOpen} onClose={close} />
    </PricingDialogContext.Provider>
  );
}

export function usePricingDialog() {
  const context = useContext(PricingDialogContext);

  if (!context) {
    throw new Error(
      "usePricingDialog must be used inside PricingDialogProvider",
    );
  }

  return context;
}
