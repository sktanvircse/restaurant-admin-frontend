import CustomLayout from "@/components/layout/CustomLayout";
import { Card } from "@/components/ui/card";

const HomePage = () => {
  return (
    <CustomLayout>
      <Card className="p-2 md:p-6 min-h-screen ">Admin Dashboard</Card>
    </CustomLayout>
  );
};

export default HomePage;