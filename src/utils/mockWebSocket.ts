
type WebSocketCallback = (data: any) => void;

/**
 * A mock WebSocket implementation that simulates a connection to a server
 * and receives counter updates every 2 seconds.
 */
export class MockWebSocket {
  private callbacks: Map<string, WebSocketCallback[]> = new Map();
  private intervalId: number | null = null;
  private counter: number = 0;
  private connected: boolean = false;
  
  constructor(private url: string) {}
  
  connect(): void {
    if (this.connected) return;
    
    setTimeout(() => {
      this.connected = true;
      this.triggerEvent('open', {});
      
      this.intervalId = window.setInterval(() => {
        this.counter += 1;
        this.triggerEvent('message', {
          data: JSON.stringify({ counter: this.counter }),
        });
      }, 2000);
    }, 500);
  }
  
  close(): void {
    if (!this.connected) return;
    
    this.connected = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.triggerEvent('close', {});
  }
  
  addEventListener(eventName: string, callback: WebSocketCallback): void {
    if (!this.callbacks.has(eventName)) {
      this.callbacks.set(eventName, []);
    }
    this.callbacks.get(eventName)?.push(callback);
  }
  
  removeEventListener(eventName: string, callback: WebSocketCallback): void {
    const callbacks = this.callbacks.get(eventName);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  private triggerEvent(eventName: string, data: any): void {
    const callbacks = this.callbacks.get(eventName) || [];
    callbacks.forEach(callback => callback(data));
  }
  
  get isConnected(): boolean {
    return this.connected;
  }
}
