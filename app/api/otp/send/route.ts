import { NextResponse } from 'next/server'

// MSG91 server-side OTP — active once MSG91_AUTH_KEY + MSG91_TEMPLATE_ID are set
// (and NEXT_PUBLIC_OTP_PROVIDER=msg91). Until then the site uses Firebase OTP.

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json()

    if (!mobile) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 })
    }

    const authKey = process.env.MSG91_AUTH_KEY
    const templateId = process.env.MSG91_TEMPLATE_ID

    if (!authKey || !templateId) {
      console.error('MSG91 env vars missing:', { authKey: !!authKey, templateId: !!templateId })
      return NextResponse.json({ error: 'OTP service not configured' }, { status: 500 })
    }

    const response = await fetch('https://control.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'authkey': authKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ template_id: templateId, mobile }),
    })

    const data = await response.json()
    console.log('MSG91 send response:', data)

    if (data.type === 'error') {
      return NextResponse.json({ error: data.message || 'Failed to send OTP' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('OTP send error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
