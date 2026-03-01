// src/app/admin/roles/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import Pagination from "@/components/molecules/Pagination";
import RCTable from "@/components/molecules/RCTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { useRoleActions } from "@/modules/admin/roles/roles.action";
import { Shield, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Role {
  id: number;
  name: string;
  description?: string;
  status: boolean;
  created_at?: string;
}

const RolesPage = () => {
  const router = useRouter();
  const { getRoles, deleteRole } = useRoleActions();

  const [originalData, setOriginalData] = useState<Role[]>([]);
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
      const data = await getRoles();
      setOriginalData(data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this role?")) {
      return;
    }

    try {
      await deleteRole(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting role:", error);
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
      title: "Role Name",
      dataIndex: "name",
      EnableSorting: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-blue-500" />
          <span className="font-semibold text-gray-900 capitalize">
            {value}
          </span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (value: string) => (
        <span className="text-gray-600">{value || "No description"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: boolean) =>
        value ? (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Inactive
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Role) => (
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => router.push(`/admin/roles/edit/${record.id}`)}
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
  const activeCount = originalData.filter((r) => r.status).length;
  const inactiveCount = originalData.filter((r) => !r.status).length;

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<Shield />}
            title="Roles Management"
            breadcrumbs={[
              { label: "Roles" },
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
                      Total Roles
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {totalDataLength}
                    </p>
                  </div>
                  <Shield className="text-blue-500" size={32} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Active</p>
                    <p className="text-2xl font-bold text-green-700">
                      {activeCount}
                    </p>
                  </div>
                  <Shield className="text-green-500" size={32} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Inactive</p>
                    <p className="text-2xl font-bold text-red-700">
                      {inactiveCount}
                    </p>
                  </div>
                  <Shield className="text-red-500" size={32} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <div className="flex justify-end items-center mb-2">
                <Link href="/admin/roles/add">
                  <Button className="app-button">
                    <Plus className="mr-2" size={16} /> Add Role
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

export default RolesPage;
