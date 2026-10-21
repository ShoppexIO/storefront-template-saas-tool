import type { PaymentMethod } from "@/config/storefront.config";

type Props = { id: PaymentMethod["id"] };

const SOURCES: Record<PaymentMethod["id"], string> = {
  visa: "/payment-methods/visa.png",
  mastercard: "/payment-methods/mastercard.png",
  bitcoin: "/payment-methods/bitcoin.png",
  litecoin: "/payment-methods/litecoin.png",
  ethereum: "/payment-methods/ethereum.png",
  paypal: "/payment-methods/paypal.png",
};

const LABELS: Record<PaymentMethod["id"], string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  bitcoin: "Bitcoin",
  litecoin: "Litecoin",
  ethereum: "Ethereum",
  paypal: "PayPal",
};

export function PaymentLogo({ id }: Props) {
  const src = SOURCES[id];
  if (!src) return null;
  return <img src={src} alt={LABELS[id]} draggable={false} />;
}
