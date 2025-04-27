
import { useState, useEffect, useCallback } from 'react';
import { MockWebSocket } from '@/utils/mockWebSocket';
import { fetchRandomString } from '@/services/apiService';
import { toast } from '@/components/ui/sonner';

interface WebSocketMessage {
  counter: number;
}

interface DataEntry {
  id: number;
  counter: number;
  randomString: string;
  timestamp: string;
}

const formatTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
};

export const useWebSocketData = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [counter, setCounter] = useState<number | null>(null);
  const [randomString, setRandomString] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [history, setHistory] = useState<DataEntry[]>([]);
  const [totalUpdates, setTotalUpdates] = useState<number>(0);
  const [requestTimes, setRequestTimes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [webSocket, setWebSocket] = useState<MockWebSocket | null>(null);
  
  const connect = useCallback(() => {
    if (webSocket) {
      webSocket.close();
    }
    
    const ws = new MockWebSocket('wss://mock-server/ws');
    
    ws.addEventListener('open', () => {
      setIsConnected(true);
      toast.success('WebSocket connected');
    });
    
    ws.addEventListener('close', () => {
      setIsConnected(false);
      toast.error('WebSocket disconnected');
    });
    
    ws.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
        setCounter(data.counter);
        setLastUpdated(formatTime());
        
        // Start measuring time for API request
        setIsLoading(true);
        const startTime = performance.now();
        
        // Make the REST API call triggered by WebSocket update
        const result = await fetchRandomString(data.counter);
        
        // Calculate request time
        const endTime = performance.now();
        const requestTime = endTime - startTime;
        
        setRandomString(result);
        setIsLoading(false);
        
        // Update statistics
        setTotalUpdates(prev => prev + 1);
        setRequestTimes(prev => [...prev, requestTime]);
        
        // Add to history
        const newEntry: DataEntry = {
          id: data.counter,
          counter: data.counter,
          randomString: result,
          timestamp: formatTime(),
        };
        
        setHistory(prev => [newEntry, ...prev].slice(0, 10));
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        toast.error('Error processing data');
        setIsLoading(false);
      }
    });
    
    ws.connect();
    setWebSocket(ws);
    
    return () => {
      ws.close();
    };
  }, []);
  
  const disconnect = useCallback(() => {
    if (webSocket) {
      webSocket.close();
    }
  }, [webSocket]);
  
  // Calculate average request time
  const averageRequestTime = requestTimes.length > 0
    ? requestTimes.reduce((sum, time) => sum + time, 0) / requestTimes.length
    : null;
  
  useEffect(() => {
    connect();
    
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);
  
  return {
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
  };
};
