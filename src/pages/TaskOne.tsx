
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DataDisplay from "@/components/DataDisplay";
import WebSocketStatus from "@/components/WebSocketStatus";
import StatisticsPanel from "@/components/StatisticsPanel";
import DataHistory from "@/components/DataHistory";
import { useWebSocketData } from "@/hooks/useWebSocketData";
import { Loader2 } from "lucide-react";

const TaskOne = () => {
  const {
    isConnected,
    counter, 
    randomString,
    lastUpdated,
    history,
    totalUpdates,
    averageRequestTime,
    isLoading,
    connect,
    disconnect
  } = useWebSocketData();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b">
      <header className="bg-transparent p-4 ">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Real-time Data System</h1>
          <WebSocketStatus isConnected={isConnected} />
        </div>
      </header>
      
      <main className="container mx-auto flex-1 p-4 md:p-6">
        <div className="grid gap-6">
          <Card className="bg-transparent">
            <div className="p-6">
              <div className="flex gap-4">
                <Button
                  onClick={connect}
                  disabled={isConnected}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "

                >
                  Connect WebSocket
                </Button>
                <Button 
                  onClick={disconnect} 
                  disabled={!isConnected}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Disconnect
                </Button>
                <button type="button" 
                onClick={() => window.location.reload()}
                disabled={isLoading}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Reload</button>
              </div>
            </div>
          </Card>
          
          <div className="relative">
            <DataDisplay 
              counter={counter}
              randomString={randomString}
              lastUpdated={lastUpdated}
            />
            {isLoading && (
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-1">
            <DataHistory history={history} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskOne;
