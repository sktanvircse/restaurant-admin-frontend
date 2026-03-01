// src/app/admin/staffs/edit/[id]/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Routes } from "@/config/routes";
import { useStaffActions } from "@/modules/admin/staffs/staffs.action";
import { useRoleActions } from "@/modules/admin/roles/roles.action";
import { Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSelect } from "@/components/common/AppSelect";

const StaffsEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { getStaff, updateStaff } = useStaffActions();
  const { getRoles } = useRoleActions();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState<any>("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchRoles();
    loadStaff();
  }, [id]);

  const fetchRoles = async () => {
    const data = await getRoles();
    const transformed = data.map((role: any) => ({
      label: role.name,
      value: role.id,
    }));
    setRoles(transformed);
  };

  const loadStaff = async () => {
    setFetchLoading(true);
    try {
      const data = await getStaff(Number(id));

      if (data) {
        setName(data.name);
        setPhone(data.phone || "");
        setRoleId(data.role_id.toString());
        setStatus(data.status);
      }
    } catch (error) {
      console.error("Error loading staff:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !roleId) {
      return;
    }

    setLoading(true);
    try {
      await updateStaff(Number(id), {
        name: name.trim(),
        phone: phone.trim(),
        role_id: parseInt(roleId),
        status: status,
      });
      router.push("/admin/staffs");
    } catch (error) {
      console.error("Error updating staff:", error);
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
            icon={<Users />}
            title="Edit Staff"
            breadcrumbs={[
              { label: "Edit Staff" },
              { label: "Staffs", href: Routes.staffs },
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
                    placeholder="Enter staff name"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    className="app-input"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1234567890"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <AppSelect
                    value={roleId}
                    groups={roles}
                    onSelect={(value) => setRoleId(value)}
                    placeholder="Select role"
                    hideNone
                    disabled={loading}
                  />
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
                    onClick={() => router.push("/admin/staffs")}
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

export default StaffsEditPage;
