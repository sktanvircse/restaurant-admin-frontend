"use client";

import React, { useState } from "react";
import CustomLayout from "@/components/layout/CustomLayout";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";
import { Input } from "@/components/ui/input";

const CategoriesAddPage = () => {
  const router = useRouter();
  const { createCategory } = useCategoryActions();

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createCategory({
      name,
      is_active: isActive,
    });

    router.push("/admin/categories");
  };

  return (
    <CustomLayout>
      <Card className="p-6 max-w-xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Add Category</h2>
          <p className="text-sm text-gray-500">Dashboard / Categories / Add</p>
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
            Submit
          </Button>
        </form>
      </Card>
    </CustomLayout>
  );
};

export default CategoriesAddPage;
