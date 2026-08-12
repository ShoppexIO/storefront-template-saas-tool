"use client";

import { Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SubscriptionPlan, ToolProduct } from "@/config/storefront.config";
import { getShoppexClient } from "@/lib/shoppex-client";
import { shoppexConfig } from "@/lib/shoppex-config";

type CheckoutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: ToolProduct;
  plan: SubscriptionPlan;
};

export function CheckoutModal({ open, onOpenChange, tool, plan }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [creatorCode, setCreatorCode] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Accept the terms before continuing.");
      return;
    }

    setSubmitting(true);
    try {
      // Demo mode — no real Shoppex backend behind this template, so we
      // just confirm what would have happened. Switch to live mode by
      // setting NEXT_PUBLIC_SHOPPEX_USE_SAMPLE_DATA=false and pointing
      // NEXT_PUBLIC_SHOPPEX_SHOP_SLUG at your shop.
      if (shoppexConfig.sampleData.enabled) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success(
          `Demo: would now create an invoice for ${tool.title} (${plan.label}) and redirect to checkout.`,
        );
        return;
      }

      // Live mode — resolve the Shoppex product id this plan maps to.
      // Forkers wire this in `src/config/storefront.config.ts` by setting
      // `productId` / `variantId` on each plan.
      if (!plan.productId) {
        toast.error(
          `Plan "${plan.label}" is missing a productId in storefront.config.ts. See docs/recipes/connect-shoppex-checkout.md.`,
        );
        return;
      }

      const shoppex = getShoppexClient();

      // Single-product checkout: clear, add, redirect. We clear first so
      // that an abandoned previous checkout from the same browser does
      // not bleed into this purchase.
      shoppex.clearCart();
      shoppex.addToCart(plan.productId, plan.variantId ?? "default", 1);

      const result = await shoppex.checkout({
        email: email.trim(),
        coupon: discountCode.trim() || undefined,
        affiliateCode: creatorCode.trim() || undefined,
        autoRedirect: true,
      });

      if (!result.success) {
        toast.error(result.message ?? "Checkout failed. Please try again.");
      }
      // On success the SDK redirects the browser. No further state to set.
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected checkout error.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="checkout-modal">
        <header className="checkout-modal__header">
          <div>
            <DialogTitle className="checkout-modal__title">{tool.title}</DialogTitle>
            <DialogDescription asChild>
              <p className="checkout-modal__price">${plan.price}</p>
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button className="checkout-modal__close" type="button" aria-label="Close">
              <X size={16} />
            </button>
          </DialogClose>
        </header>

        <div className="checkout-modal__field">
          <label htmlFor="checkout-email" className="checkout-modal__field-label">
            Email address
          </label>
          <input
            id="checkout-email"
            className="checkout-modal__input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
          <p className="checkout-modal__hint">
            We'll send the license key to this email address.
          </p>
        </div>

        <div className="checkout-modal__field">
          <div className="checkout-modal__discount">
            <input
              className="checkout-modal__input"
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
            />
            <button
              type="button"
              className="checkout-modal__discount-button"
              onClick={() => {
                if (!discountCode.trim()) return;
                toast.message(`Discount "${discountCode}" submitted (demo).`);
              }}
            >
              <Tag size={14} />
              Apply
            </button>
          </div>
        </div>

        <div className="checkout-modal__field">
          <span className="checkout-modal__field-label">
            <Tag size={11} style={{ marginRight: 6, display: "inline" }} />
            Creator Code (optional)
          </span>
          <div className="checkout-modal__discount">
            <input
              className="checkout-modal__input"
              type="text"
              placeholder="ENTER CREATOR CODE"
              value={creatorCode}
              onChange={(event) => setCreatorCode(event.target.value)}
            />
            <button
              type="button"
              className="checkout-modal__discount-button"
              onClick={() => {
                if (!creatorCode.trim()) return;
                toast.message(`Creator code "${creatorCode}" submitted (demo).`);
              }}
            >
              Apply
            </button>
          </div>
          <p className="checkout-modal__hint">Support a creator by using their code.</p>
        </div>

        <label className="checkout-modal__terms">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            style={{ marginTop: 2 }}
          />
          <span>
            I accept the <a href="/terms">Terms of Service</a>.
          </span>
        </label>

        <button
          type="button"
          className="btn-primary"
          onClick={submit}
          disabled={submitting}
          style={{ width: "100%" }}
        >
          {submitting ? "Connecting…" : "Continue to payment"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
