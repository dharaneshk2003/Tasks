
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsPanelProps {
  totalUpdates: number;
  averageRequestTime: number | null;
}

const StatisticsPanel = ({ totalUpdates, averageRequestTime }: StatisticsPanelProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm text-muted-foreground">Total Updates</span>
            <span className="text-xl font-bold">{totalUpdates}</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm text-muted-foreground">Avg. Request Time</span>
            <span className="text-xl font-bold">
              {averageRequestTime === null ? "N/A" : `${averageRequestTime.toFixed(0)} ms`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsPanel;
