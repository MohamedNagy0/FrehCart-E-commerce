export default function formatMoney(
    amount,
    locale = "en-US",
    currency = "EGP"
) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    })
        .format(amount)
        .split(".00");
}
