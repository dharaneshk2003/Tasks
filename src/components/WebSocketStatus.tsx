
import { cn } from "@/lib/utils";

interface WebSocketStatusProps {
  isConnected: boolean;
}

const WebSocketStatus = ({ isConnected }: WebSocketStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn(
          "h-2 w-2 rounded-full animate-pulse-fade",
          isConnected ? "bg-websocket-connected" : "bg-websocket-disconnected"
        )}
      />
      <span className="text-sm font-medium">
        {isConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
      </span>
    </div>
  );
};

export default WebSocketStatus;
