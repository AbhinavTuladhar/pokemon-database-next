// middleware.ts    (at the root of your project)
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"',
      },
    })
  }

  const [scheme, encoded] = authHeader.split(' ')

  if (scheme !== 'Basic' || !encoded) {
    return new NextResponse('Bad authorization header', { status: 400 })
  }

  const decoded = atob(encoded)
  const [username, password] = decoded.split(':')

  const expectedUser = process.env.BASIC_AUTH_USER
  const expectedPass = process.env.BASIC_AUTH_PASSWORD

  if (!expectedUser || !expectedPass || username !== expectedUser || password !== expectedPass) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Protected Area"',
      },
    })
  }

  // All good → continue
  return NextResponse.next()
}

// middleware.ts   (at project root)

export const config = {
  matcher: [
    // ───────────────────────────────────────────────────────────────
    // Only run on requests that are likely INITIAL PAGE LOADS
    // ───────────────────────────────────────────────────────────────
    // Matches root + any path that does NOT contain a dot (no file extension)
    // and is NOT api, _next, static files, etc.
    '/((?!api/|_next/|static/|.*\\..*|_next/image|favicon\\.ico).*)',
  ],
}
