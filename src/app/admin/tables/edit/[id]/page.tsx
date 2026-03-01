// src/app/admin/tables/edit/[id]/page.tsx
"use client";

import { AppSelect } from "@/components/common/AppSelect";
import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Routes } from "@/config/routes";
import { useTableActions } from "@/modules/admin/tables/tables.action";
import { LayoutGrid } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TablesEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getTable, updateTable } = useTableActions();

  const [tableNo, setTableNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState<"available" | "occupied">("available");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const statusOptions = [
    { label: "Available", value: "available" },
    { label: "Occupied", value: "occupied" },
  ];

  useEffect(() => {
    loadTable();
  }, [id]);

  const loadTable = async () => {
    setFetchLoading(true);
    try {
      const data = await getTable(Number(id));

      if (data) {
        setTableNo(data.table_no);
        setCapacity(data.capacity.toString());
        setStatus(data.status);
      }
    } catch (error) {
      console.error("Error loading table:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tableNo.trim() || !capacity) {
      return;
    }

    setLoading(true);
    try {
      await updateTable(Number(id), {
        table_no: tableNo.trim(),
        capacity: parseInt(capacity),
        status: status,
      });
      router.push("/admin/tables");
    } catch (error) {
      console.error("Error updating table:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <CustomLayout>
        <Card className="p-6 mx-auto max-w-2xl">
          <CardContent className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </CardContent>
        </Card>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout>
      <Card className="p-6 mx-auto max-w-2xl">
        <CardContent className="p-0!">
          <PageHeader
            icon={<LayoutGrid />}
            title="Edit Table"
            breadcrumbs={[
              { label: "Edit Table" },
              { label: "Tables", href: Routes.tables },
            ]}
          />

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Table Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Table Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={tableNo}
                    className="app-input"
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="e.g., 1, 2, A1, B2"
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the table identifier (numbers or alphanumeric)
                  </p>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Capacity <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={capacity}
                    className="app-input"
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Number of people"
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum number of people this table can accommodate
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <AppSelect
                    value={status}
                    groups={statusOptions}
                    onSelect={(value) =>
                      setStatus(value as "available" | "occupied")
                    }
                    placeholder="Select status"
                    hideNone
                    disabled={loading}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="app-button px-6 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/tables")}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </CustomLayout>
  );
};

export default TablesEditPage;
