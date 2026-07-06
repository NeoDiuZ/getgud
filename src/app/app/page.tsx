import type { Metadata } from "next";
import CommunicationInterface from "@/components/communication-interface";

export const metadata: Metadata = {
  title: "Neural Communication Interface | Neural Drive",
  description: "Express your needs through neural signals with instant audio feedback.",
};

export default function AppPage() {
  return <CommunicationInterface />;
}
