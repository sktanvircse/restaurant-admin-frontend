// src/app/admin/orders/page.tsx
"use client";

import { AppSelect } from "@/components/common/AppSelect";
import CustomLayout from "@/components/layout/CustomLayout";
import Pagination from "@/components/molecules/Pagination";
import RCTable from "@/components/molecules/RCTable";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { useOrderActions } from "@/modules/admin/orders/orders.action";
import {
  ShoppingCart,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  ChefHat,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  table_id: number;
  table_no?: string;
  order_status: "pending" | "cooking" | "served" | "cancelled";
  total_price: number;
  order_time?: string;
}

const OrdersPage = () => {
  const router = useRouter();
  const { getOrders, updateOrderStatus, deleteOrder } = useOrderActions();

  const [originalData, setOriginalData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOriginalData(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      await deleteOrder(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleSort = (columnKey: string) => {
    let order = "ascend";
    if (sortedInfo.columnKey === columnKey && sortedInfo.order === "ascend") {
      order = "descend";
    }
    setSortedInfo({ columnKey, order });
  };

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Cooking", value: "cooking" },
    { label: "Served", value: "served" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock size={14} />,
        label: "Pending",
      },
      cooking: {
        color: "bg-blue-100 text-blue-800",
        icon: <ChefHat size={14} />,
        label: "Cooking",
      },
      served: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle size={14} />,
        label: "Served",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle size={14} />,
        label: "Cancelled",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${config.color}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const useColumn = () => [
    {
      title: "Order ID",
      dataIndex: "id",
      EnableSorting: true,
      render: (value: number) => (
        <span className="font-semibold text-blue-600">#{value}</span>
      ),
    },
    {
      title: "Table",
      dataIndex: "table_no",
      EnableSorting: true,
      render: (value: string) => (
        <span className="font-semibold text-gray-900">Table {value}</span>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      EnableSorting: true,
      render: (value: number) => (
        <span className="font-semibold text-green-600">
          ${Number(value).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "order_status",
      render: (value: string) => getStatusBadge(value),
    },
    {
      title: "Order Time",
      dataIndex: "order_time",
      EnableSorting: true,
      render: (value: string) => (
        <span className="text-gray-600">
          {value ? new Date(value).toLocaleString() : "N/A"}
        </span>
      ),
    },
    {
      title: "Update Status",
      dataIndex: "update_status",
      render: (_: any, record: Order) => (
        <div className="w-48">
          <AppSelect
            value={record.order_status}
            groups={statusOptions}
            onSelect={(value) => handleStatusChange(record.id, value)}
            placeholder="Change status"
            hideNone
            customClass="w-full"
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Order) => (
        <div className="flex gap-3">
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

  // Filter data based on status
  const filteredData =
    filterStatus === "all"
      ? originalData
      : originalData.filter((order) => order.order_status === filterStatus);

  const totalDataLength = filteredData.length;

  // Calculate stats
  const stats = {
    total: originalData.length,
    pending: originalData.filter((o) => o.order_status === "pending").length,
    cooking: originalData.filter((o) => o.order_status === "cooking").length,
    served: originalData.filter((o) => o.order_status === "served").length,
    cancelled: originalData.filter((o) => o.order_status === "cancelled")
      .length,
    totalRevenue: originalData
      .filter((o) => o.order_status === "served")
      .reduce((sum, o) => sum + Number(o.total_price), 0),
  };

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<ShoppingCart />}
            title="Orders Management"
            breadcrumbs={[
              { label: "Orders" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-blue-600 font-medium">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {stats.total}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-yellow-600 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {stats.pending}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-indigo-600 font-medium">Cooking</p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {stats.cooking}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-green-600 font-medium">Served</p>
                  <p className="text-2xl font-bold text-green-700">
                    {stats.served}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-red-600 font-medium">Cancelled</p>
                  <p className="text-2xl font-bold text-red-700">
                    {stats.cancelled}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-xs text-emerald-600 font-medium">
                    Revenue
                  </p>
                  <p className="text-xl font-bold text-emerald-700">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              {/* Filter */}
              <div className="flex justify-between items-center mb-4">
                <div className="w-64">
                  <label className="block text-sm font-medium mb-2">
                    Filter by Status
                  </label>
                  <AppSelect
                    value={filterStatus}
                    groups={[
                      { label: "All Orders", value: "all" },
                      ...statusOptions,
                    ]}
                    onSelect={(value) => setFilterStatus(value)}
                    placeholder="Filter status"
                    hideNone
                  />
                </div>
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
                    originData={filteredData}
                    useColumn={useColumn}
                    sortedInfo={sortedInfo}
                    handleSort={handleSort}
                    maxWidth={1400}
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

export default OrdersPage;
