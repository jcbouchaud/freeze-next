export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Event journal</h3>
                    <p className="text-sm text-muted-foreground">
                        Search for events within your campuses
                    </p>
                </div>
                {children}
            </div>
        </section>
    )
}