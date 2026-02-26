"use client";
import "jspdf-autotable";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import NoDataFoundIcon from "@/assets/icons/NoDataFoundIcon";
import { useCheckbox } from "../common/useInput";

const { jsPDF } = require("jspdf");

interface RecordType {
  id: number;
  [key: string]: any;
}

type Props = {
  originData: RecordType[];
  useColumn: any;
  sortedInfo: any;
  handleSort: (columnKey: string) => void;
  IsRtl?: string;
  AutoWidth?: number;
  FixHeader?: string;
  FixLeft?: string;
  FixRight?: string;
  Ellipsis?: string;
  PerWidth?: string;
  Empty?: string;
  maxWidth?: any;
  maxHeight?: any;
};

const RCTable = ({
  originData,
  useColumn,
  sortedInfo,
  handleSort,
  IsRtl,
  AutoWidth,
  FixHeader,
  FixLeft,
  FixRight,
  Ellipsis,
  Empty,
  PerWidth,
  maxWidth = 1800,
  maxHeight = 500,
}: Props) => {
  const [autoWidth, autoWidthProps] = useCheckbox(false);
  const [isRtl, isRtlProps] = useCheckbox(false);
  const [fixHeader, fixHeaderProps] = useCheckbox(true);
  const [fixLeft, fixLeftProps] = useCheckbox(true);
  const [fixRight, fixRightProps] = useCheckbox(true);
  const [ellipsis, ellipsisProps] = useCheckbox(false);
  const [percentage, percentageProps] = useCheckbox(false);
  const [empty, emptyProps] = useCheckbox(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const columns = useColumn(fixLeft, fixRight).map((col: any) => ({
    ...col,
    key: col.dataIndex,
    sorter: true,
    sortOrder: sortedInfo.columnKey === col.dataIndex && sortedInfo.order,
    onHeaderCell: () => ({
      onClick: col.EnableSorting ? () => handleSort(col.dataIndex) : undefined,
    }),
    title: (
      <div className="cursor-pointer flex items-center justify-between">
        <span className="mr-2">{col.title}</span>
        {col.EnableSorting &&
          (sortedInfo.columnKey === col.dataIndex ? (
            <span>
              <p
                key="asc"
                className={`text-xs ascend-icon ${
                  sortedInfo.order === "ascend"
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                ▲
              </p>
              <p
                key="desc"
                className={`text-xs descend-icon ${
                  sortedInfo.order === "descend"
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                ▼
              </p>
            </span>
          ) : (
            <span>
              <p className="text-xs ascend-icon text-gray-400">▲</p>
              <p className="text-xs descend-icon text-gray-400">▼</p>
            </span>
          ))}
      </div>
    ),
  }));

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    columns.forEach((col: any) => {
      initialVisibility[col.dataIndex] = true;
    });
    return initialVisibility;
  });

  const filteredColumns = columns.filter(
    (col: any) => columnVisibility[col.dataIndex],
  );

  let mergedData: RecordType[] =
    originData.length > 0 ? originData : empty ? [] : originData;

  useEffect(() => {
    const tableBody = document.querySelector(".rc-table-body") as HTMLElement;
    if (!tableBody) return;

    const updateScrollButtons = () => {
      setCanScrollLeft(tableBody.scrollLeft > 0);
      setCanScrollRight(
        tableBody.scrollLeft < tableBody.scrollWidth - tableBody.clientWidth,
      );
    };
    updateScrollButtons();
    tableBody.addEventListener("scroll", updateScrollButtons);
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(tableBody);

    return () => {
      tableBody.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <React.StrictMode>
      <div className="rounded-lg mt-4">
        <Table<RecordType>
          data={mergedData}
          columns={filteredColumns}
          direction={isRtl ? "rtl" : "ltr"}
          scroll={{
            x: maxWidth,
            y: mergedData.length > 0 ? (fixHeader ? maxHeight : "") : "",
          }}
          rowKey={(record) => record.id}
          emptyText={
            <div className="flex flex-col items-center justify-center text-gray-500 dark:bg-[#1e293b] py-10">
              <NoDataFoundIcon />
              <p className="mt-2 text-sm text-gray-500 dark:text-white font-bold">
                No Data Found
              </p>
            </div>
          }
        />
      </div>
    </React.StrictMode>
  );
};

export default RCTable;
