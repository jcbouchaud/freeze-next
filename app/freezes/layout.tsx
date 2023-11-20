export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Freezes</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage students freezes from your campuses
                    </p>
                </div>
                {children}
            </div>
        </section>
    )
}