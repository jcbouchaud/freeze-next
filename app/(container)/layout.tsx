export default async function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col justify-start space-y-2 w-full px-8 py-6">
      {children}
    </section>
  )
}
