import { LegalPage } from "@/components/legal-page";

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service">
      <h2>Use of the service</h2>
      <p>
        By purchasing or using this storefront, you agree to use all products according to
        applicable laws, platform rules, and the instructions provided with your license.
      </p>

      <h2>Licenses</h2>
      <p>
        Licenses are issued to the email address used at checkout. Do not share, resell, or
        transfer license keys unless your agreement explicitly allows it.
      </p>

      <h2>Support</h2>
      <p>
        Support is provided through the channels listed on this storefront. Response times and
        availability may vary by plan and product.
      </p>
    </LegalPage>
  );
}
