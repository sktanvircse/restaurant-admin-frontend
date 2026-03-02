// src/app/admin/reports/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Routes } from "@/config/routes";
import { useReportsActions } from "@/modules/admin/reports/reports.action";
import {
  AdminPerformance,
  OrdersByDay,
  RevenueByDay,
} from "@/modules/admin/reports/reports.type";
import { DollarSign, FileText, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const ReportsPage = () => {
  const { getOrdersByDay, getRevenueByDay, getAdminPerformance } =
    useReportsActions();

  const [ordersByDay, setOrdersByDay] = useState<OrdersByDay[]>([]);
  const [revenueByDay, setRevenueByDay] = useState<RevenueByDay[]>([]);
  const [adminPerformance, setAdminPerformance] = useState<AdminPerformance[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const [orders, revenue, admins] = await Promise.all([
        getOrdersByDay(),
        getRevenueByDay(),
        getAdminPerformance(),
      ]);

      setOrdersByDay(orders);
      setRevenueByDay(revenue);
      setAdminPerformance(admins);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CustomLayout>
        <Card className="p-6">
          <CardContent className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </CardContent>
        </Card>
      </CustomLayout>
    );
  }

  // Calculate totals
  const totalOrders = ordersByDay.reduce((sum, item) => sum + item.total, 0);
  const totalRevenue = revenueByDay.reduce(
    (sum, item) => sum + Number(item.revenue),
    0,
  );

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          <PageHeader
            icon={<FileText />}
            title="Reports & Analytics"
            breadcrumbs={[
              { label: "Reports" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Orders (Period)</p>
                    <p className="text-3xl font-bold mt-2">{totalOrders}</p>
                  </div>
                  <TrendingUp size={40} className="opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Revenue (Period)</p>
                    <p className="text-3xl font-bold mt-2">
                      ${totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign size={40} className="opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-purple-500 to-pink-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Active Admins</p>
                    <p className="text-3xl font-bold mt-2">
                      {adminPerformance.length}
                    </p>
                  </div>
                  <Users size={40} className="opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Orders by Day - Line Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={20} />
                  Orders by Day
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ordersByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Orders"
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue by Day - Bar Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="text-green-600" size={20} />
                  Revenue by Day
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      fill="#10b981"
                      name="Revenue ($)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Admin Performance - Pie Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="text-purple-600" size={20} />
                  Admin Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={adminPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="totalOrders"
                      nameKey="name"
                    >
                      {adminPerformance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Admin Performance Table */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Admin Performance Details
                </h3>
                <div className="space-y-3">
                  {adminPerformance.map((admin, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-medium">{admin.name}</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {admin.totalOrders} orders
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </CustomLayout>
  );
};

export default ReportsPage;
