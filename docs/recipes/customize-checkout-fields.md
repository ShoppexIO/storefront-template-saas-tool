# Add or remove fields in the checkout modal

The default modal has:

- Email address (required)
- Payment method selector (Crypto / Card)
- Discount code (optional)
- Creator code (optional)
- Terms-of-service checkbox (required)

To add a field, edit `src/components/checkout-modal.tsx`.

## Add a "Game username" field

Most cheat shops ask for the in-game username so they can whitelist you. Add it between the email and the payment method.

```tsx
// src/components/checkout-modal.tsx — alongside `useState` for email/coupon
const [gameUsername, setGameUsername] = useState("");

// In JSX, after the email block:
<div className="checkout-modal__field">
  <label htmlFor="checkout-game-username" className="checkout-modal__field-label">
    In-game username
  </label>
  <input
    id="checkout-game-username"
    className="checkout-modal__input"
    type="text"
    placeholder="Your tag"
    value={gameUsername}
    onChange={(event) => setGameUsername(event.target.value)}
    autoComplete="username"
  />
</div>

// Validate in submit():
if (!gameUsername.trim()) {
  toast.error("Enter your in-game username.");
  return;
}
```

## Remove the creator code field

Delete the entire `<div className="checkout-modal__field">` block that wraps the creator code input. Also remove the `creatorCode` state and toast handler. Don't forget to remove the unused import (`<Tag />` icon may still be used by the discount field — keep it).

## Add the field to the request

When the modal calls Shoppex (see `connect-shoppex-checkout.md`), append the field to the metadata:

```ts
await getShoppexClient().checkout({
  email,
  coupon: discountCode || undefined,
  metadata: {
    game_username: gameUsername,           // ← your new field
    creator_code: creatorCode || undefined,
  },
});
```

Shoppex passes `metadata` through to the order so it appears in webhooks.

## Verify

- Open a product detail page and click "Purchase Now"
- The new field should appear in the modal
- Submitting without it (if required) should show the toast error
- Submitting with it should pass validation
