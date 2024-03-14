import { ReactNode, useContext } from 'react'

import { BaseComponentProps } from '@/types'

import { TableContext } from './TableContext';



export interface TableEmptyBodyProps extends BaseComponentProps {
    children?: ReactNode
}

export const TableEmptyBody = ({ children, id, className, style }: TableEmptyBodyProps) => {
    const { fields, data } = useContext(TableContext);
    return data.length > 0 ? null : (
        <tbody id={id} className={className} style={style}>
            {children === undefined ? (
                <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                    <i>No records found.</i>
                </td></tr>
            ) : children}
        </tbody>
    )
}