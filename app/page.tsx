import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="flex flex-row gap-2">
        <Link href="/freezes"><Button>Go to Freezes page</Button></Link>
        <Link href="/event-journal"><Button>Go to Event Journal page</Button></Link>
      </div>
    </main>
  )
}
