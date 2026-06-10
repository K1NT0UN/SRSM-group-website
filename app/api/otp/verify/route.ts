import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json()

    if (!mobile || !otp) {
      return NextResponse.json({ error: 'Mobile and OTP are required' }, { status: 400 })
    }

    const authKey = process.env.MSG91_AUTH_KEY

    if (!authKey) {
      console.error('MSG91_AUTH_KEY env var missing')
      return NextResponse.json({ error: 'OTP service not configured' }, { status: 500 })
    }

    const response = await fetch(
      `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${mobile}`,
      {
        method: 'GET',
        headers: { authkey: authKey },
      }
    )

    const data = await response.json()
    console.log('MSG91 verify response:', data)

    if (data.type === 'error') {
      return NextResponse.json({ error: data.message || 'Invalid or expired OTP' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('OTP verify error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
