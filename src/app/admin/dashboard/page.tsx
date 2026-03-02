// src/app/admin/dashboard/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardActions } from "@/modules/admin/dashboard/dashboard.action";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  UtensilsCrossed,
  LayoutGrid,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardData } from "@/modules/admin/dashboard/dashboard.type";

const DashboardPage = () => {
  const { getDashboardData } = useDashboardActions();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const result = await getDashboardData();
      setData(result);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CustomLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      </CustomLayout>
    );
  }

  const summary = data?.summary;
  const charts = data?.charts;

  return (
    <CustomLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white m-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-blue-100">
            Welcome back! Here's what's happening with your restaurant today.
          </p>
        </div>

        {/* Stats Grid - Orders & Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
          {/* Total Orders */}
          <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 font-medium">Total Orders</p>
                  <p className="text-3xl font-bold mt-2">
                    {summary?.orders.total || 0}
                  </p>
                </div>
                <ShoppingCart size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card className="bg-linear-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 font-medium">
                    Pending Orders
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {summary?.orders.pending || 0}
                  </p>
                </div>
                <Clock size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>

          {/* Served Orders */}
          <Card className="bg-linear-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 font-medium">
                    Served Orders
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {summary?.orders.served || 0}
                  </p>
                </div>
                <CheckCircle size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card className="bg-linear-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 font-medium">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    ${Number(summary?.revenue || 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign size={40} className="opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid - Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
          {/* Foods */}
          <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Foods
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {summary?.foods || 0}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <UtensilsCrossed size={32} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Categories
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {summary?.categories || 0}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package size={32} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff */}
          <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Active Staff
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {summary?.staffs || 0}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users size={32} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tables */}
          <Card className="bg-white border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Tables</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {summary?.tables.total || 0}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      {summary?.tables.available || 0} Available
                    </span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      {summary?.tables.occupied || 0} Occupied
                    </span>
                  </div>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <LayoutGrid size={32} className="text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by Day Chart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-600" size={24} />
                <h3 className="text-lg font-semibold">Orders by Day</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={charts?.ordersByDay || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Day Chart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="text-green-600" size={24} />
                <h3 className="text-lg font-semibold">Revenue by Day</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={charts?.revenueByDay || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => (window.location.href = "/admin/orders")}
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="text-blue-600 mb-2" size={24} />
                <p className="text-sm font-medium">View Orders</p>
              </button>
              <button
                onClick={() => (window.location.href = "/admin/foods")}
                className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <UtensilsCrossed className="text-orange-600 mb-2" size={24} />
                <p className="text-sm font-medium">Manage Foods</p>
              </button>
              <button
                onClick={() => (window.location.href = "/admin/tables")}
                className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <LayoutGrid className="text-indigo-600 mb-2" size={24} />
                <p className="text-sm font-medium">View Tables</p>
              </button>
              <button
                onClick={() => (window.location.href = "/admin/reports")}
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <TrendingUp className="text-purple-600 mb-2" size={24} />
                <p className="text-sm font-medium">View Reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomLayout>
  );
};

export default DashboardPage;
