"use client";

import React, { useEffect, useState } from "react";
import CustomLayout from "@/components/layout/CustomLayout";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";
import { Button } from "@/components/ui/button";
import RCTable from "@/components/molecules/RCTable";
import Pagination from "@/components/molecules/Pagination";

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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Category List</h2>

            <p className="text-sm text-gray-500">Dashboard / Categories</p>
          </div>
          <Link href="/admin/categories/add">
            <Button>
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
      </Card>
    </CustomLayout>
  );
};

export default CategoriesPage;
