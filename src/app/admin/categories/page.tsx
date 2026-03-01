// src/app/admin/categories/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import Pagination from "@/components/molecules/Pagination";
import RCTable from "@/components/molecules/RCTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";
import { LayoutDashboard, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
  status: number;
  created_at?: string;
}

const CategoriesPage = () => {
  const router = useRouter();
  const { getCategories, deleteCategory } = useCategoryActions();

  const [originalData, setOriginalData] = useState<Category[]>([]);
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
      const data = await getCategories();
      setOriginalData(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await deleteCategory(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
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
      title: "Name",
      dataIndex: "name",
      EnableSorting: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: number) =>
        value === 1 ? (
          <span className="text-green-600 font-semibold">Active</span>
        ) : (
          <span className="text-red-500 font-semibold">Inactive</span>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Category) => (
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => router.push(`/admin/categories/edit/${record.id}`)}
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

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<LayoutDashboard />}
            title="Category List"
            breadcrumbs={[
              { label: "Categories" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />
          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <div className="flex justify-end items-center mb-2">
                <Link href="/admin/categories/add">
                  <Button className="app-button">
                    <Plus className="mr-2" size={16} /> Add Category
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

export default CategoriesPage;
