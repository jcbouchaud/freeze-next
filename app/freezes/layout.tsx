export default async function FreezesLayout({ children, modal }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
    return (
      <section>
        {children}
        {modal}
      </section>
    )
  }