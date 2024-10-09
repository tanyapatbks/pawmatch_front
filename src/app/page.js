import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to PawMatch</h1>
      <p>This is the home page.</p>
      <div>
        <Link href="/login">
          <button>Go to Login</button>
        </Link>
        <Link href="/register">
          <button>Go to Register</button>
        </Link>
      </div>
    </main>
  )
}