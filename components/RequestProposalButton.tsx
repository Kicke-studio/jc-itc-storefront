"use client";

import { useInquiry } from "@/components/InquiryProvider";

export default function RequestProposalButton({
  service,
  label = "Request Proposal",
  className,
}: {
  service?: string;
  label?: string;
  className: string;
}) {
  const { openInquiry } = useInquiry();
  return (
    <button onClick={() => openInquiry(service)} className={className}>
      {label}
    </button>
  );
}
