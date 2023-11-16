import { useState } from 'react';

type ErrorType = Error | null;

export function useAsyncAction<T>(
    asyncAction: (data: T) => Promise<void>
): [(data: T) => Promise<void>, ErrorType] {
    const [error, setError] = useState<ErrorType>(null);

    const executeAsyncAction = async (data: T) => {
        try {
            setError(null)
            await asyncAction(data);
        } catch (e) {
            setError(e as Error);
        }
    };

    return [executeAsyncAction, error];
}