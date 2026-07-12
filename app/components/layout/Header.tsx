"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { WA } from "../../constants/whatsapp";
import Button from "../ui/Button";
import { useLeadModal } from "../LeadModalProvider";

export default function Header() {
  const { openLeadModal } = useLeadModal();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "14px 20px",
        background: "rgba(5,5,5,0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="header-inner">
        <Image
          src="/lockup-white-transparent.png"
          alt="OP5 Technologies"
          width={140}
          height={35}
          priority
          style={{ height: 32, width: "auto" }}
        />
        <Button
          onClick={() => openLeadModal(WA.engineer, "General Enquiry")}
          variant="outline"
          size="sm"
          nowrap
          icon={<MessageCircle style={{ width: 15, height: 15 }} />}
        >
          Let&apos;s Talk
        </Button>
      </div>
    </header>
  );
}
