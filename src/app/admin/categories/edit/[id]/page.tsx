"use client";

import React, { useEffect, useState } from "react";
import CustomLayout from "@/components/layout/CustomLayout";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";

const CategoriesEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getCategories, updateCategory } = useCategoryActions();

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const data = await getCategories();
    const found = data.find((item: any) => item.id === Number(id));

    if (found) {
      setName(found.name);
      setIsActive(found.is_active);
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
      <Card className="p-6 max-w-xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Edit Category</h2>
          <p className="text-sm text-gray-500">Dashboard / Categories / Edit</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label>Active</label>
          </div>

          <Button type="submit" className="w-full mt-4">
            Update
          </Button>
        </form>
      </Card>
    </CustomLayout>
  );
};

export default CategoriesEditPage;
