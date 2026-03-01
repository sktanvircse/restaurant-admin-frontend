// src/app/admin/categories/edit/[id]/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Routes } from "@/config/routes";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";
import { LayoutDashboard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoriesEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getCategory, updateCategory } = useCategoryActions();

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = async () => {
    setFetchLoading(true);
    try {
      const data = await getCategory(Number(id));

      if (data) {
        setName(data.name);
        // Convert backend status (1/0) to boolean
        setIsActive(data.status === 1);
      }
    } catch (error) {
      console.error("Error loading category:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    setLoading(true);
    try {
      await updateCategory(Number(id), {
        name: name.trim(),
        is_active: isActive,
      });
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <CustomLayout>
        <Card className="p-6 mx-auto">
          <CardContent className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </CardContent>
        </Card>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout>
      <Card className="p-6 mx-auto">
        <CardContent className="p-0!">
          <PageHeader
            icon={<LayoutDashboard />}
            title="Edit Category"
            breadcrumbs={[
              { label: "Edit Category" },
              { label: "Categories", href: Routes.categories },
            ]}
          />

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={name}
                    className="app-input"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    dir="ltr"
                    checked={isActive}
                    onCheckedChange={(checked) => setIsActive(checked)}
                    disabled={loading}
                  />
                  <label
                    htmlFor="active"
                    className="cursor-pointer capitalize text-sm"
                  >
                    Active
                  </label>
                </div>

                <div className="flex gap-3">
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
                    onClick={() => router.push("/admin/categories")}
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

export default CategoriesEditPage;
