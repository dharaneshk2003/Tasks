
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataEntry {
  id: number;
  counter: number;
  randomString: string;
  timestamp: string;
}

interface DataHistoryProps {
  history: DataEntry[];
}

const DataHistory = ({ history }: DataHistoryProps) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="grid gap-2">
            {history.map((entry) => (
              <div 
                key={entry.id} 
                className="grid grid-cols-3 p-2 text-sm border rounded-md"
              >
                <div className="font-medium text-data-counter">{entry.counter}</div>
                <div className="font-medium text-data-string truncate">{entry.randomString}</div>
                <div className="text-right text-muted-foreground">{entry.timestamp}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DataHistory;
