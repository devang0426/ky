const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹1,15,000 style formatting with Indian digit grouping. */
export function formatPrice(rupees: number) {
  return inr.format(rupees);
}
