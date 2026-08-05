export const contact = {
  phone: '+91 99899 90256',
  phoneHref: 'tel:+919989990256',
  email: 'sr.sm.group.buildersanddevelopers@gmail.com',
  whatsapp: 'https://wa.me/919989990256?text=Hi%2C%20I%27m%20interested%20in%20SRSM%20Group%20properties.',
  address: {
    line1: 'Flat No. 109, First Floor',
    line2: 'Aparna Green Homes Apartment',
    line3: 'Opp. Golf View Apartments',
    line4: 'Nanakramguda Rd, Financial District',
    line5: 'Nanakramguda, Hyderabad 500032',
  },
}

// The one WhatsApp number for the whole site — same line as the floating
// bubble (contact.whatsapp), so every route to us lands in one inbox.
// Every "Get in touch" / brochure CTA calls this with a pre-filled message.
export const WA_NUMBER = '919989990256'
export const NISARGA_TEL = contact.phone
export const NISARGA_TEL_HREF = contact.phoneHref
export const nisargaWhatsApp = (text = "Hi, I'd like to know more about Nisarga.") =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
