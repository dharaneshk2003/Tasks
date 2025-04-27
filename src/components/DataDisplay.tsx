
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DataDisplayProps {
  counter: number | null;
  randomString: string | null;
  lastUpdated: string | null;
}

const DataDisplay = ({ counter, randomString, lastUpdated }: DataDisplayProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Real-time Data
          {lastUpdated && (
            <Badge variant="outline" className="text-xs">
              Last updated: {lastUpdated}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          WebSocket push triggers REST API pull
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5 p-4 border rounded-md">
            <span className="text-sm font-medium text-muted-foreground">WebSocket Counter</span>
            <span 
              className={cn(
                "text-2xl font-bold text-data-counter",
                counter === null ? "opacity-50" : ""
              )}
            >
              {counter === null ? "Waiting..." : counter}
            </span>
          </div>
          <div className="flex flex-col space-y-1.5 p-4 border rounded-md">
            <span className="text-sm font-medium text-muted-foreground">REST API String</span>
            <span 
              className={cn(
                "text-2xl font-bold break-all text-data-string",
                randomString === null ? "opacity-50" : ""
              )}
            >
              {randomString === null ? "Waiting..." : randomString}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataDisplay;
