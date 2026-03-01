// src/app/admin/payments/page.tsx
"use client";

import { AppSelect } from "@/components/common/AppSelect";
import CustomLayout from "@/components/layout/CustomLayout";
import Pagination from "@/components/molecules/Pagination";
import RCTable from "@/components/molecules/RCTable";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { usePaymentActions } from "@/modules/admin/payments/payments.action";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Hash,
  TrendingUp,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: "cash" | "card" | "online";
  payment_time?: string;
}

const PaymentsPage = () => {
  const { getPayments } = usePaymentActions();

  const [originalData, setOriginalData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPayments();
      setOriginalData(data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (columnKey: string) => {
    let order = "ascend";
    if (sortedInfo.columnKey === columnKey && sortedInfo.order === "ascend") {
      order = "descend";
    }
    setSortedInfo({ columnKey, order });
  };

  const getMethodBadge = (method: string) => {
    const methodConfig = {
      cash: {
        color: "bg-green-100 text-green-800",
        icon: <DollarSign size={14} />,
        label: "Cash",
      },
      card: {
        color: "bg-blue-100 text-blue-800",
        icon: <CreditCard size={14} />,
        label: "Card",
      },
      online: {
        color: "bg-purple-100 text-purple-800",
        icon: <Wallet size={14} />,
        label: "Online",
      },
    };

    const config =
      methodConfig[method as keyof typeof methodConfig] || methodConfig.cash;

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
      title: "Payment ID",
      dataIndex: "id",
      EnableSorting: true,
      render: (value: number) => (
        <span className="font-semibold text-blue-600">#{value}</span>
      ),
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      EnableSorting: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-gray-500" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      EnableSorting: true,
      render: (value: number) => (
        <span className="font-bold text-green-600 text-lg">
          ${Number(value).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "method",
      render: (value: string) => getMethodBadge(value),
    },
    {
      title: "Payment Time",
      dataIndex: "payment_time",
      EnableSorting: true,
      render: (value: string) => (
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>{value ? new Date(value).toLocaleString() : "N/A"}</span>
        </div>
      ),
    },
  ];

  // Filter data
  let filteredData = originalData;

  // Filter by payment method
  if (filterMethod !== "all") {
    filteredData = filteredData.filter((p) => p.method === filterMethod);
  }

  // Filter by date
  if (dateFilter !== "all") {
    const now = new Date();
    filteredData = filteredData.filter((p) => {
      if (!p.payment_time) return false;
      const paymentDate = new Date(p.payment_time);
      const diffTime = now.getTime() - paymentDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      switch (dateFilter) {
        case "today":
          return diffDays < 1;
        case "week":
          return diffDays < 7;
        case "month":
          return diffDays < 30;
        default:
          return true;
      }
    });
  }

  const totalDataLength = filteredData.length;

  // Calculate stats
  const stats = {
    total: originalData.length,
    totalAmount: originalData.reduce((sum, p) => sum + Number(p.amount), 0),
    cash: originalData.filter((p) => p.method === "cash").length,
    card: originalData.filter((p) => p.method === "card").length,
    online: originalData.filter((p) => p.method === "online").length,
    cashAmount: originalData
      .filter((p) => p.method === "cash")
      .reduce((sum, p) => sum + Number(p.amount), 0),
    cardAmount: originalData
      .filter((p) => p.method === "card")
      .reduce((sum, p) => sum + Number(p.amount), 0),
    onlineAmount: originalData
      .filter((p) => p.method === "online")
      .reduce((sum, p) => sum + Number(p.amount), 0),
  };

  const methodOptions = [
    { label: "Cash", value: "cash" },
    { label: "Card", value: "card" },
    { label: "Online", value: "online" },
  ];

  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<CreditCard />}
            title="Payments Management"
            breadcrumbs={[
              { label: "Payments" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 font-medium">
                      Total Payments
                    </p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <TrendingUp size={40} className="opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 font-medium">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold">
                      ${stats.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign size={40} className="opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm opacity-90 font-medium mb-2">Cash</p>
                  <p className="text-2xl font-bold">
                    ${stats.cashAmount.toFixed(2)}
                  </p>
                  <p className="text-xs opacity-75">
                    {stats.cash} transactions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-indigo-500 to-indigo-600 text-white">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm opacity-90 font-medium mb-2">Card</p>
                  <p className="text-2xl font-bold">
                    ${stats.cardAmount.toFixed(2)}
                  </p>
                  <p className="text-xs opacity-75">
                    {stats.card} transactions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          {stats.online > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="bg-linear-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div>
                    <p className="text-sm opacity-90 font-medium mb-2">
                      Online Payments
                    </p>
                    <p className="text-2xl font-bold">
                      ${stats.onlineAmount.toFixed(2)}
                    </p>
                    <p className="text-xs opacity-75">
                      {stats.online} transactions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Filter by Payment Method
                  </label>
                  <AppSelect
                    value={filterMethod}
                    groups={[
                      { label: "All Methods", value: "all" },
                      ...methodOptions,
                    ]}
                    onSelect={(value) => setFilterMethod(value)}
                    placeholder="Filter by method"
                    hideNone
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Filter by Date
                  </label>
                  <AppSelect
                    value={dateFilter}
                    groups={[
                      { label: "All Time", value: "all" },
                      ...dateOptions,
                    ]}
                    onSelect={(value) => setDateFilter(value)}
                    placeholder="Filter by date"
                    hideNone
                  />
                </div>
              </div>

              {/* Results Summary */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-semibold">{filteredData.length}</span>{" "}
                  of{" "}
                  <span className="font-semibold">{originalData.length}</span>{" "}
                  payments
                  {filterMethod !== "all" && (
                    <span className="ml-2">
                      • Method:{" "}
                      <span className="font-semibold capitalize">
                        {filterMethod}
                      </span>
                    </span>
                  )}
                  {dateFilter !== "all" && (
                    <span className="ml-2">
                      • Period:{" "}
                      <span className="font-semibold capitalize">
                        {dateFilter}
                      </span>
                    </span>
                  )}
                </p>
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

export default PaymentsPage;
