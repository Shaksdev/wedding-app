const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { initializeApp }     = require('firebase-admin/app')
const { Resend }            = require('resend')

initializeApp()

const RESEND_API_KEY = 'YOUR_RESEND_API_KEY'   // paste your Resend key here
const COUPLE_EMAIL_1 = 'opeyemi@gmail.com'      // Opeyemi's real email
const COUPLE_EMAIL_2 = 'hammed@gmail.com'       // Hammed's real email
const FROM_EMAIL     = 'onboarding@resend.dev'  // keep this for now

const resend = new Resend(RESEND_API_KEY)

exports.onNewWish = onDocumentCreated('wishes/{wishId}', async (event) => {
  const wish = event.data.data()
  const displayName = wish.anonymous ? 'Anonymous' : (wish.name || 'A guest')
  const guestEmail  = wish.email || null

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      [COUPLE_EMAIL_1, COUPLE_EMAIL_2],
      subject: `New wish from ${displayName}`,
      html: `
        <div style="max-width:560px;margin:40px auto;background:#1A1209;border:1px solid rgba(201,168,76,0.3);padding:48px 40px;text-align:center;font-family:Georgia,serif;">
          <p style="font-size:11px;letter-spacing:4px;color:#C9A84C;text-transform:uppercase;margin:0 0 24px;">Wedding Wishes</p>
          <h1 style="font-size:28px;font-weight:300;color:#F5EDD5;margin:0 0 8px;">A new wish arrived</h1>
          <p style="font-size:12px;letter-spacing:3px;color:rgba(201,168,76,0.5);text-transform:uppercase;margin:0 0 32px;">from ${displayName}</p>
          <div style="border-left:2px solid #C9A84C;padding:20px 24px;background:rgba(201,168,76,0.04);text-align:left;margin:0 0 32px;">
            <p style="font-size:18px;font-style:italic;color:#E8D5A3;line-height:1.8;margin:0;">"${wish.message}"</p>
          </div>
          <p style="font-size:11px;letter-spacing:3px;color:rgba(201,168,76,0.4);text-transform:uppercase;">Opeyemi &amp; Hammed &mdash; 2026</p>
        </div>
      `
    })

    if (guestEmail) {
      await resend.emails.send({
        from:    FROM_EMAIL,
        to:      guestEmail,
        subject: 'Your wishes have been received',
        html: `
          <div style="max-width:560px;margin:40px auto;background:#1A1209;border:1px solid rgba(201,168,76,0.3);padding:48px 40px;text-align:center;font-family:Georgia,serif;">
            <p style="font-size:11px;letter-spacing:4px;color:#C9A84C;text-transform:uppercase;margin:0 0 24px;">Opeyemi &amp; Hammed</p>
            <h1 style="font-size:28px;font-weight:300;color:#F5EDD5;margin:0 0 16px;">Thank you, ${displayName}</h1>
            <p style="font-size:16px;color:#7A6540;line-height:1.8;margin:0 0 32px;font-style:italic;">Your message has been received and will be treasured forever. Opeyemi &amp; Hammed are deeply grateful for your love and blessings.</p>
            <p style="font-size:11px;letter-spacing:3px;color:rgba(201,168,76,0.4);text-transform:uppercase;">Wedding &mdash; 2026 &mdash; Lagos, Nigeria</p>
          </div>
        `
      })
    }

  } catch (err) {
    console.error('Resend error:', err)
  }
})