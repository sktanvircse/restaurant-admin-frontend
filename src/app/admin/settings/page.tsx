// src/app/admin/settings/page.tsx
"use client";

import CustomLayout from "@/components/layout/CustomLayout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Routes } from "@/config/routes";
import { useSettingsActions } from "@/modules/admin/settings/settings.action";
import {
  Settings as SettingsIcon,
  Store,
  Percent,
  Clock,
  Save,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { getSettings, updateSettings } = useSettingsActions();

  const [restaurantName, setRestaurantName] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Store initial values to detect changes
  const [initialValues, setInitialValues] = useState({
    restaurantName: "",
    taxPercentage: "",
    openingTime: "",
    closingTime: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    // Check if any values have changed
    const changed =
      restaurantName !== initialValues.restaurantName ||
      taxPercentage !== initialValues.taxPercentage ||
      openingTime !== initialValues.openingTime ||
      closingTime !== initialValues.closingTime;
    setHasChanges(changed);
  }, [restaurantName, taxPercentage, openingTime, closingTime, initialValues]);

  const loadSettings = async () => {
    setFetchLoading(true);
    try {
      const data = await getSettings();

      if (data) {
        setRestaurantName(data.restaurant_name || "");
        setTaxPercentage(data.tax_percentage?.toString() || "0");
        setOpeningTime(data.opening_time || "09:00");
        setClosingTime(data.closing_time || "22:00");

        // Store initial values
        setInitialValues({
          restaurantName: data.restaurant_name || "",
          taxPercentage: data.tax_percentage?.toString() || "0",
          openingTime: data.opening_time || "09:00",
          closingTime: data.closing_time || "22:00",
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !restaurantName.trim() ||
      !taxPercentage ||
      !openingTime ||
      !closingTime
    ) {
      return;
    }

    const taxValue = parseFloat(taxPercentage);
    if (isNaN(taxValue) || taxValue < 0 || taxValue > 100) {
      toast.error("Tax percentage must be between 0 and 100");
      return;
    }

    setLoading(true);
    try {
      await updateSettings({
        restaurant_name: restaurantName.trim(),
        tax_percentage: taxValue,
        opening_time: openingTime,
        closing_time: closingTime,
      });

      // Update initial values after successful save
      setInitialValues({
        restaurantName: restaurantName.trim(),
        taxPercentage: taxValue.toString(),
        openingTime: openingTime,
        closingTime: closingTime,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to discard all changes?")) {
      setRestaurantName(initialValues.restaurantName);
      setTaxPercentage(initialValues.taxPercentage);
      setOpeningTime(initialValues.openingTime);
      setClosingTime(initialValues.closingTime);
      setHasChanges(false);
    }
  };

  if (fetchLoading) {
    return (
      <CustomLayout>
        <Card className="p-6">
          <CardContent className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </CardContent>
        </Card>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout>
      <Card className="p-6">
        <CardContent className="p-0!">
          {/* Header */}
          <PageHeader
            icon={<SettingsIcon />}
            title="Restaurant Settings"
            breadcrumbs={[
              { label: "Settings" },
              { label: "Home", href: Routes.dashboard },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Main Settings Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Restaurant Name */}
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Store size={18} className="text-blue-600" />
                        Restaurant Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={restaurantName}
                        className="app-input"
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="Enter restaurant name"
                        required
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This name will be displayed on receipts and reports
                      </p>
                    </div>

                    {/* Tax Percentage */}
                    <div>
                      <label className=" text-sm font-medium mb-2 flex items-center gap-2">
                        <Percent size={18} className="text-green-600" />
                        Tax Percentage (%){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={taxPercentage}
                        className="app-input"
                        onChange={(e) => setTaxPercentage(e.target.value)}
                        placeholder="0.00"
                        required
                        disabled={loading}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tax rate applied to all orders (0-100%)
                      </p>
                    </div>

                    {/* Operating Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Opening Time */}
                      <div>
                        <label className=" text-sm font-medium mb-2 flex items-center gap-2">
                          <Clock size={18} className="text-orange-600" />
                          Opening Time <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="time"
                          value={openingTime}
                          className="app-input"
                          onChange={(e) => setOpeningTime(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>

                      {/* Closing Time */}
                      <div>
                        <label className=" text-sm font-medium mb-2 flex items-center gap-2">
                          <Clock size={18} className="text-red-600" />
                          Closing Time <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="time"
                          value={closingTime}
                          className="app-input"
                          onChange={(e) => setClosingTime(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        type="submit"
                        className="app-button px-6 rounded-lg flex items-center gap-2"
                        disabled={loading || !hasChanges}
                      >
                        {loading ? (
                          <>
                            <span className="animate-spin">⏳</span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            Save Changes
                          </>
                        )}
                      </Button>

                      {hasChanges && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleReset}
                          disabled={loading}
                          className="flex items-center gap-2"
                        >
                          <RefreshCw size={18} />
                          Reset
                        </Button>
                      )}
                    </div>

                    {hasChanges && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          ⚠️ You have unsaved changes. Click "Save Changes" to
                          apply them.
                        </p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Settings Preview/Info */}
            <div className="space-y-6">
              {/* Current Settings Summary */}
              <Card className="bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <SettingsIcon size={20} className="text-blue-600" />
                    Current Settings
                  </h3>

                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">
                        Restaurant Name
                      </p>
                      <p className="font-semibold text-gray-900">
                        {restaurantName || "Not set"}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Tax Rate</p>
                      <p className="font-semibold text-green-600">
                        {taxPercentage ? `${taxPercentage}%` : "0%"}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">
                        Operating Hours
                      </p>
                      <p className="font-semibold text-gray-900">
                        {openingTime} - {closingTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Calculator Example */}
              <Card className="bg-linear-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tax Calculator Example
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="font-semibold">$100.00</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Tax ({taxPercentage || 0}%):
                      </span>
                      <span className="font-semibold text-green-600">
                        ${((parseFloat(taxPercentage) || 0) * 1).toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900">
                          Total:
                        </span>
                        <span className="text-xl font-bold text-green-600">
                          ${(100 + (parseFloat(taxPercentage) || 0)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-linear-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    💡 Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>Changes take effect immediately after saving</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>
                        Tax percentage will be applied to all new orders
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>Operating hours are for display purposes only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>
                        Restaurant name appears on receipts and reports
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </CustomLayout>
  );
};

export default SettingsPage;
