import { LegalPage } from "@/components/legal-page";

export default function RefundsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Refund Policy">
      <h2>Eligibility</h2>
      <p>
        Refund eligibility depends on the product, license status, and support review. Replace this
        default policy with the rules that apply to your business before going live.
      </p>

      <h2>Requests</h2>
      <p>
        To request a refund, contact support with your order email, invoice number, and a short
        description of the issue.
      </p>

      <h2>Processing</h2>
      <p>
        Approved refunds are returned through the original payment method when supported by the
        payment provider.
      </p>
    </LegalPage>
  );
}
