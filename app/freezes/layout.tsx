export default async function FreezesLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col justify-start px-24 pb-24 space-y-2">
      {children}
    </section>
  )
}