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

// Nisarga sales WhatsApp — every "Get in touch" / brochure CTA on the Nisarga
// site routes here (the number shown on the contact section). Pass a message to
// pre-fill the chat; falls back to a general Nisarga enquiry.
export const NISARGA_WA_NUMBER = '919492239339'
export const NISARGA_TEL = '+91 94922 39339'
export const NISARGA_TEL_HREF = 'tel:+919492239339'
export const nisargaWhatsApp = (text = "Hi, I'd like to know more about Nisarga.") =>
  `https://wa.me/${NISARGA_WA_NUMBER}?text=${encodeURIComponent(text)}`
