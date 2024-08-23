import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, RowData, useReactTable } from "@tanstack/react-table"
import { FC, Fragment, memo, useMemo, useState } from "react"

import * as styles from './Dashboard.scss'
import { Input } from "antd"

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text'
  }
}

const mockData: TokenData[] = [
  {
    name: 'someName',
    short: 'short',
    id: 'sfsadfasfs',
    links: {
      tg: 't.me'
    }
  },
  {
    name: 'adf',
    short: 'short',
    id: 'sfsadfasfs',
    links: {
      tg: 't.me'
    }
  },
  {
    name: ' asf s fs',
    short: 'short',
    id: 'sfsadfasfs',
    links: {
      tg: 't.me'
    }
  },
  {
    name: 'yetnew',
    short: 'short',
    id: 'sfsadfasfs',
    links: {
      tg: 't.me'
    }
  },
  {
    name: 'adf',
    short: 'short',
    id: 'sfsadfasfs',
    links: {
      tg: 't.me'
    }
  },
  {
    name: ' asf s fs',
    short: 'short',
    id: 'sfsadfasfs',
    links: {
      tg: 't.me'
    }
  },
]

const DashboardComponent: FC = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const columns = useMemo<ColumnDef<TokenData, any>[]>(
    () => [
      {
        accessorKey: 'name',
        cell: info => info.getValue(),
        header: () => <span>Newly</span>,
      },
      {
        accessorKey: 'short',
        cell: info => info.getValue(),
        header: () => null,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => null,
        enableColumnFilter: false,
      },
    ],
    []
  )

  const [data, _setData] = useState<TokenData[]>(() => mockData)

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })
  
  return <div>
    {table.getHeaderGroups().map(headerGroup => (
      <div className={styles.header} key={headerGroup.id}>
        {
          headerGroup.headers.map(header => (
            <Fragment key={header.id}>
              <div>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
              {header.column.getCanFilter() ? (
                <div>
                  <Filter column={header.column} />
                </div>
              ) : null}
            </Fragment>
          ))
        }
      </div>
    ))}
    {table.getRowModel().rows.map(row => (
      <div className={styles.row} key={row.id}>
        {
          row.getVisibleCells().map(cell => (
            <div key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))
        }
      </div>
    ))}
  </div>
}

function Filter({column}: {column: Column<any, unknown>}) {
  const columnFilterValue = column.getFilterValue()
  return <Input
    onChange={value => column.setFilterValue(value.target.value)}
    placeholder={`Search...`}
    type="text"
    value={(columnFilterValue ?? '') as string}
  />
}

export const Dashboard = memo(DashboardComponent)
