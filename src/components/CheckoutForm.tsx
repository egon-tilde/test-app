"use client";

import { useState } from "react";
import Button from "./Button";

export default function CheckoutForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-3 p-6 border rounded-lg max-w-sm">
      <h2 className="text-lg font-semibold">Checkout</h2>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
      />
      <Button onClick={() => alert(`Submitted: ${email}`)}>Kupi</Button>
      <Button variant="secondary" onClick={() => setEmail("")}>
        Odustani
      </Button>
    </div>
  );
}