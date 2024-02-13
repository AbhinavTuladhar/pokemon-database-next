import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <span> This is the home page </span>
      <Link href="/test"> Click me</Link>
    </div>
  )
}
