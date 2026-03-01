// src/app/admin/staffs/add/page.tsx
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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AppSelect } from "@/components/common/AppSelect";

const StaffsAddPage = () => {
  const router = useRouter();
  const { createStaff } = useStaffActions();
  const { getRoles } = useRoleActions();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState<any>("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const data = await getRoles();
    const transformed = data.map((role: any) => ({
      label: role.name,
      value: role.id,
    }));
    setRoles(transformed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !roleId) {
      return;
    }

    setLoading(true);
    try {
      await createStaff({
        name: name.trim(),
        phone: phone.trim(),
        role_id: parseInt(roleId),
        status: status,
      });
      router.push("/admin/staffs");
    } catch (error) {
      console.error("Error creating staff:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomLayout>
      <Card className="p-6 mx-auto">
        <CardContent className="p-0!">
          <PageHeader
            icon={<Users />}
            title="Add Staff"
            breadcrumbs={[
              { label: "Add Staff" },
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
                        Creating...
                      </>
                    ) : (
                      "Submit"
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

export default StaffsAddPage;
