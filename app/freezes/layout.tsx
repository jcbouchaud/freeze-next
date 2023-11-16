export default async function FreezesLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col justify-start space-y-2 container">
      {children}
    </section>
  )
}