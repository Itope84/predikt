/**
 * The Table component. As I'm not working off a ddesign, I have chosen to go with a very simple table design that can be handled with basic HTML. In a more robust environments, where we might need a data table, then there are libraries suited to this purpose
 */

import React from 'react';

type Column<TData = any,> = {
    id?: string
    name?: string
    /**
     * a custom function that takes the entire row and returns a component. Used to render columns that are "computed" from the row data
     */
    render?: (rowData: TData) => React.ReactNode
}


type TableProps<TData = any,> = {
    columns: Array<Column>
    data: Array<TData>
}


const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <th className="border-b font-medium text-left border-slate-100 px-4 py-3">{children}</th>
}

const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <td className="border-b border-slate-100 px-4 py-4">{children}</td>
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
    return (
        <table className="w-full text-sm table-auto border-collapse">
            <thead>
                <tr>
                    {columns.map((column, index) => <Th key={index}>{column.name}</Th>)}
                </tr>
            </thead>
            <tbody className='bg-white'>
                {/* Using index as keys is sufficient here because we don't expect the index of each item to change (no shuffling/sorting/filtering happening during/post render). If that were the case, it would be more ideal to find a different property to use as the key) */}
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, cIndex) => {
                            return <Td key={cIndex}>{ column.id ? row[column.id] : column.render?.(row) }</Td>
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table