import { createContext, ReactNode, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Data } from '@/types';

export const DataContext = createContext<Data>({});

export interface DataProviderProps {
    value: Data;
    children: ReactNode;
}

export const DataProvider = ({
    value,
    children,
}: DataProviderProps) => {
    const data = useMemo(() => value, [JSON.stringify(value)]);
    const formMethods = useForm({ values: data, mode: 'onChange' });
    return (
        <DataContext.Provider value={data}>
            <FormProvider {...formMethods}>{children}</FormProvider>
        </DataContext.Provider>
    );
};
