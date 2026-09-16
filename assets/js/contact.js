/**
 * BTC OILS - Contact & Inquiry Suite Controller
 * Validates inputs, handles WhatsApp transmission, and launches Gmail composer
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('btc-contact-form');
  const btnSubmitWhatsApp = document.getElementById('contact-btn-whatsapp');
  const btnSubmitEmail = document.getElementById('contact-btn-email');

  if (!form) return;

  function validateForm() {
    const name = document.getElementById('contact-name')?.value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name) {
      window.showToast("Please enter your full name.");
      return null;
    }
    if (!phone) {
      window.showToast("Please provide your phone or WhatsApp number.");
      return null;
    }
    if (!message) {
      window.showToast("Please write your inquiry or message.");
      return null;
    }

    return { name, phone, email, subject, message };
  }

  // Submit via WhatsApp
  btnSubmitWhatsApp?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = validateForm();
    if (!data) return;

    const formattedMessage = 
`📩 *BTC OILS - WEBSITE DIRECT INQUIRY*
---------------------------------------
• *Name:* ${data.name}
• *Phone/WhatsApp:* ${data.phone}
• *Email:* ${data.email || 'Not provided'}
• *Inquiry Category:* ${data.subject || 'General Inquiry'}
---------------------------------------
*Message:*
${data.message}
---------------------------------------
(Sent via BTC Oils Official Website)`;

    const encoded = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${window.BTC_CONFIG.whatsappNumber}?text=${encoded}`;

    window.showToast("Launching WhatsApp with your inquiry...");
    window.open(whatsappUrl, '_blank');
  });

  // Submit via Gmail / Mail Client
  btnSubmitEmail?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = validateForm();
    if (!data) return;

    const subjectText = `${window.BTC_CONFIG.emailSubjectPrefix} ${data.subject || 'Inquiry'} from ${data.name}`;
    const bodyText = 
`Hello BTC Oils Management,

You have received an inquiry from your official website:

Sender Name: ${data.name}
Phone/WhatsApp: ${data.phone}
Email: ${data.email || 'Not provided'}
Inquiry Topic: ${data.subject}

Message:
${data.message}

---------------------------------------
Sent from BTC Oils Web Portal`;

    if (typeof window.launchEmailComposer === 'function') {
      window.launchEmailComposer(window.BTC_CONFIG.email, subjectText, bodyText);
    } else {
      const encSubject = encodeURIComponent(subjectText);
      const encBody = encodeURIComponent(bodyText);
      window.location.href = `mailto:${window.BTC_CONFIG.email}?subject=${encSubject}&body=${encBody}`;
    }
  });
}
