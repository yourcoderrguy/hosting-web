"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import LeadModal from "./ui/LeadModal";

interface LeadModalState {
  waLink: string;
  packageName: string;
}

interface LeadModalContextValue {
  openLeadModal: (waLink: string, packageName: string) => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used inside <LeadModalProvider>");
  }
  return ctx;
}

export default function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<LeadModalState | null>(null);

  const openLeadModal = useCallback((waLink: string, packageName: string) => {
    setModal({ waLink, packageName });
  }, []);

  return (
    <LeadModalContext.Provider value={{ openLeadModal }}>
      {children}
      <LeadModal
        open={modal !== null}
        onClose={() => setModal(null)}
        waLink={modal?.waLink ?? ""}
        packageName={modal?.packageName ?? ""}
      />
    </LeadModalContext.Provider>
  );
}
