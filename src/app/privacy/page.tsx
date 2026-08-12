import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy">
      <h2>Data we collect</h2>
      <p>
        We collect the information needed to process orders, deliver licenses, prevent abuse, and
        provide customer support. This may include email address, order details, and support
        messages.
      </p>

      <h2>How we use data</h2>
      <p>
        Order data is used to complete purchases, manage subscriptions, provide access to products,
        and communicate important account or service updates.
      </p>

      <h2>Contact</h2>
      <p>
        Replace this section with your legal contact address before publishing the storefront.
      </p>
    </LegalPage>
  );
}
