export const FormError = ({ message }: { message: string }) => {
    return (
        <div className="px-2 py-1 text-xs text-red-500 border border-red-500 bg-red-300 rounded-sm">{message}</div>
    )
}