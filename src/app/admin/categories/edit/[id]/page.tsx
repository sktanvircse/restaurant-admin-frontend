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

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const data = await getCategory(Number(id));

    if (data) {
      setName(data.name);
      setIsActive(data.is_active);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await updateCategory(Number(id), {
      name,
      is_active: isActive,
    });

    router.push("/admin/categories");
  };

  return (
    <CustomLayout>
      <Card className="p-6 mx-auto">
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
                <label>Name</label>
                <Input
                  value={name}
                  className="app-input"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  dir="ltr"
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(checked)}
                />
                <label
                  htmlFor="active"
                  className="cursor-pointer capitalize text-sm"
                >
                  Active
                </label>
              </div>

              <Button type="submit" className="app-button px-6 rounded-lg">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Card>
    </CustomLayout>
  );
};

export default CategoriesEditPage;
