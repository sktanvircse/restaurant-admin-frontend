// src/app/admin/tables/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import Pagination from "@/components/molecules/Pagination";
import RCTable from "@/components/molecules/RCTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { useTableActions } from "@/modules/admin/tables/tables.action";
import { LayoutGrid, Pencil, Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Table {
  id: number;
  table_no: string;
  capacity: number;
  status: "available" | "occupied";
  created_at?: string;
}

const TablesPage = () => {
  const router = useRouter();
  const { getTables, deleteTable } = useTableActions();

  const [originalData, setOriginalData] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTables();
      setOriginalData(data || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this table?")) {
      return;
    }

    try {
      await deleteTable(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const handleSort = (columnKey: string) => {
    let order = "ascend";
    if (sortedInfo.columnKey === columnKey && sortedInfo.order === "ascend") {
      order = "descend";
    }
    setSortedInfo({ columnKey, order });
  };

  const useColumn = () => [
    {
      title: "ID",
      dataIndex: "id",
      EnableSorting: true,
    },
    {
      title: "Table Number",
      dataIndex: "table_no",
      EnableSorting: true,
      render: (value: string) => (
        <span className="font-semibold text-gray-900">Table {value}</span>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      EnableSorting: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-500" />
          <span>
            {value} {value === 1 ? "person" : "people"}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: string) =>
        value === "available" ? (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Available
          </span>
        ) : (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Occupied
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Table) => (
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => router.push(`/admin/tables/edit/${record.id}`)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => handleDelete(record.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  const totalDataLength = originalData.length;
  const availableCount = originalData.filter(
    (t) => t.status === "available",
  ).length;
  const occupiedCount = originalData.filter(
    (t) => t.status === "occupied",
  ).length;

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<LayoutGrid />}
            title="Restaurant Tables"
            breadcrumbs={[
              { label: "Tables" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Total Tables
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {totalDataLength}
                    </p>
                  </div>
                  <LayoutGrid className="text-blue-500" size={32} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      Available
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {availableCount}
                    </p>
                  </div>
                  <LayoutGrid className="text-green-500" size={32} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Occupied</p>
                    <p className="text-2xl font-bold text-red-700">
                      {occupiedCount}
                    </p>
                  </div>
                  <LayoutGrid className="text-red-500" size={32} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <div className="flex justify-end items-center mb-2">
                <Link href="/admin/tables/add">
                  <Button className="app-button">
                    <Plus className="mr-2" size={16} /> Add Table
                  </Button>
                </Link>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {/* Table */}
                  <RCTable
                    originData={originalData}
                    useColumn={useColumn}
                    sortedInfo={sortedInfo}
                    handleSort={handleSort}
                    maxWidth={1200}
                  />
                  {/* Pagination */}
                  <div className="border-t mt-4 pt-4 flex justify-end">
                    <Pagination
                      pageSize={itemsPerPage}
                      current={currentPage}
                      total={totalDataLength}
                      onChange={(page: React.SetStateAction<number>) =>
                        setCurrentPage(page)
                      }
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </CustomLayout>
  );
};

export default TablesPage;
