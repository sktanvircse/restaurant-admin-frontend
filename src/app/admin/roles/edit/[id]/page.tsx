// src/app/admin/roles/edit/[id]/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Routes } from "@/config/routes";
import { useRoleActions } from "@/modules/admin/roles/roles.action";
import { Shield } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RolesEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getRole, updateRole } = useRoleActions();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    loadRole();
  }, [id]);

  const loadRole = async () => {
    setFetchLoading(true);
    try {
      const data = await getRole(Number(id));

      if (data) {
        setName(data.name);
        setDescription(data.description || "");
        setStatus(data.status);
      }
    } catch (error) {
      console.error("Error loading role:", error);
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
      await updateRole(Number(id), {
        name: name.trim(),
        description: description.trim(),
        status: status,
      });
      router.push("/admin/roles");
    } catch (error) {
      console.error("Error updating role:", error);
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
            icon={<Shield />}
            title="Edit Role"
            breadcrumbs={[
              { label: "Edit Role" },
              { label: "Roles", href: Routes.roles },
            ]}
          />

          <Card className="mt-4 bg-white">
            <CardContent className="p-2 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={name}
                    className="app-input"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Admin, Manager, Waiter, Chef"
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a descriptive name for this role
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    value={description}
                    className="app-input min-h-25"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the responsibilities and permissions for this role..."
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Add details about this role's responsibilities
                  </p>
                </div>

                {/* Status Switch */}
                <div className="flex items-center gap-2">
                  <Switch
                    dir="ltr"
                    checked={status}
                    onCheckedChange={(checked) => setStatus(checked)}
                    disabled={loading}
                  />
                  <label className="cursor-pointer capitalize text-sm">
                    Active
                  </label>
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
                    onClick={() => router.push("/admin/roles")}
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

export default RolesEditPage;
