import { useStore } from '@tanstack/react-store';

import { DataLens, Lenses } from '@/Lenses';
import { TableHeaderRow, useTableStore } from '@/Table'
import { CommonProps, WrapperProp } from '@/types';

import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell'
import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell'

export interface ModelIndexTableHeaderRowProps extends WrapperProp, CommonProps {
    prefilled?: boolean;
}

export const ModelIndexTableHeaderRow = ({
    prefilled,
    children,
    id,
    className,
    style,
}: ModelIndexTableHeaderRowProps) => {
    const tableStore = useTableStore();
    const columnIds = useStore(tableStore, (state) => state.columnIds);
    return (
        <Lenses activeLens={DataLens.DISPLAY}>
            <TableHeaderRow prefilled={false} id={id} className={className} style={style}>
                {children === undefined || prefilled ? (
                    <>
                        {columnIds.map((columnId) => {
                            return (
                                <ModelIndexTableHeaderCell key={columnId} field={columnId} />
                            );
                        })}
                        <ModelIndexTableActionHeaderCell />
                        {children}
                    </>
                ) : (
                    children
                )}
            </TableHeaderRow>
        </Lenses>

    );
};
