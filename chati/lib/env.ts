export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.chati.chat",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@chati.ai",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210",
}

export function getWhatsAppLink(message?: string) {
  const encodedMessage = message ? encodeURIComponent(message) : ""
  return `https://wa.me/${env.whatsappNumber}${encodedMessage ? `?text=${encodedMessage}` : ""}`
}
