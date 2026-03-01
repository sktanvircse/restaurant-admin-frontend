// src/app/admin/foods/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import Pagination from "@/components/molecules/Pagination";
import RCTable from "@/components/molecules/RCTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { useFoodActions } from "@/modules/admin/foods/foods.action";
import { UtensilsCrossed, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Food {
  id: number;
  name: string;
  price: number;
  category_name?: string;
  image?: string;
  is_available: boolean;
  created_at?: string;
}

const FoodsPage = () => {
  const router = useRouter();
  const { getFoods, deleteFood } = useFoodActions();

  const [originalData, setOriginalData] = useState<Food[]>([]);
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
      const data = await getFoods();
      setOriginalData(data || []);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    try {
      await deleteFood(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting food:", error);
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
      title: "Image",
      dataIndex: "image",
      render: (value: string, record: Food) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
          {value ? (
            <img
              src={value}
              alt={record.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <UtensilsCrossed size={20} />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      EnableSorting: true,
    },
    {
      title: "Category",
      dataIndex: "category_name",
      EnableSorting: true,
      render: (value: string) => (
        <span className="text-gray-600">{value || "N/A"}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      EnableSorting: true,
      render: (value: number) => (
        <span className="font-semibold text-green-600">
          ${Number(value).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_available",
      render: (value: boolean) =>
        value ? (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Available
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Unavailable
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Food) => (
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => router.push(`/admin/foods/edit/${record.id}`)}
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
            icon={<UtensilsCrossed />}
            title="Food List"
            breadcrumbs={[
              { label: "Foods" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />
          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <div className="flex justify-end items-center mb-2">
                <Link href="/admin/foods/add">
                  <Button className="app-button">
                    <Plus className="mr-2" size={16} /> Add Food
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

export default FoodsPage;
