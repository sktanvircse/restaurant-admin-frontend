"use client";

import React, { useEffect, useState } from "react";
import CustomLayout from "@/components/layout/CustomLayout";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";
import { Button } from "@/components/ui/button";
import RCTable from "@/components/molecules/RCTable";
import Pagination from "@/components/molecules/Pagination";
import PageHeader from "@/components/shared/PageHeader";
import { Routes } from "@/config/routes";

interface Category {
  id: number;
  name: string;
  is_active: boolean;
  created_at?: string;
}

const CategoriesPage = () => {
  const router = useRouter();
  const { getCategories, deleteCategory } = useCategoryActions();

  const [originalData, setOriginalData] = useState<Category[]>([]);
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCategories();
    setOriginalData(data || []);
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    fetchData();
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
      dataIndex: "is_active",
      render: (value: boolean) =>
        value ? (
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
      {" "}
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<Users />}
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
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </CustomLayout>
  );
};

export default CategoriesPage;
