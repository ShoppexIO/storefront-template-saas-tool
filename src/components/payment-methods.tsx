import { paymentMethods } from "@/config/storefront.config";
import { PaymentLogo } from "@/components/payment-logo";

export function PaymentMethods() {
  return (
    <section className="container section">
      <div className="section-heading">
        <h2>We support different payment methods</h2>
        <p>If we don't support your preferred payment method, reach out to one of our resellers.</p>
      </div>
      <div className="payment-row">
        {paymentMethods.map((method) => (
          <div className="payment-row__item" key={method.id} aria-label={method.label}>
            <PaymentLogo id={method.id} />
          </div>
        ))}
      </div>
    </section>
  );
}
