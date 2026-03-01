// src/app/admin/foods/add/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Routes } from "@/config/routes";
import { useFoodActions } from "@/modules/admin/foods/foods.action";
import { useCategoryActions } from "@/modules/admin/categories/categories.action";
import { UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AppSelect } from "@/components/common/AppSelect";

const FoodsAddPage = () => {
  const router = useRouter();
  const { createFood } = useFoodActions();
  const { getCategories } = useCategoryActions();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<any>("");
  const [image, setImage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    // Transform categories for AppSelect
    const transformed = data.map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    }));
    setCategories(transformed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price || !categoryId) {
      return;
    }

    setLoading(true);
    try {
      await createFood({
        name: name.trim(),
        price: parseFloat(price),
        category_id: parseInt(categoryId),
        image: image.trim(),
        is_available: isAvailable,
      });
      router.push("/admin/foods");
    } catch (error) {
      console.error("Error creating food:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomLayout>
      <Card className="p-6 mx-auto">
        <CardContent className="p-0!">
          <PageHeader
            icon={<UtensilsCrossed />}
            title="Add Food"
            breadcrumbs={[
              { label: "Add Food" },
              { label: "Foods", href: Routes.foods },
            ]}
          />
          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={name}
                    className="app-input"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter food name"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <AppSelect
                    value={categoryId}
                    groups={categories}
                    onSelect={(value) => setCategoryId(value)}
                    placeholder="Select category"
                    hideNone
                    disabled={loading}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    className="app-input"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL
                  </label>
                  <Input
                    type="url"
                    value={image}
                    className="app-input"
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                  />
                </div>

                {/* Image Preview */}
                {image && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="w-32 h-32 rounded-lg overflow-hidden border">
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Available Switch */}
                <div className="flex items-center gap-2">
                  <Switch
                    dir="ltr"
                    checked={isAvailable}
                    onCheckedChange={(checked) => setIsAvailable(checked)}
                    disabled={loading}
                  />
                  <label
                    htmlFor="available"
                    className="cursor-pointer capitalize text-sm"
                  >
                    Available
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="app-button px-6 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Creating...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/foods")}
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

export default FoodsAddPage;
