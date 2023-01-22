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
                    {columns.map(column => <Th>{column.name}</Th>)}
                </tr>
            </thead>
            <tbody className='bg-white'>
                {data.map(row => (
                    <tr>
                        {columns.map(column => {
                            return <Td>{ column.id ? row[column.id] : column.render?.(row) }</Td>
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table