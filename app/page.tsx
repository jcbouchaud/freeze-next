import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/freezes"><Button>Go to Freezes page</Button></Link>
    </main>
  )
}
