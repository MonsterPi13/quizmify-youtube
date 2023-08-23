import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivities = () => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
      </CardHeader>

      <CardContent className="max-h-[580px] overflow-y-auto">
        histories
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
