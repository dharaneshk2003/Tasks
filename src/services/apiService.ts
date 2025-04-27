
/**
 * Simulates a REST API call to fetch a random string based on a counter.
 * In a real application, this would be an actual API call to a server.
 */
export const fetchRandomString = async (counter: number): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate a random string of 10 characters that corresponds to the counter
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Use the counter as a seed to generate a "random" but deterministic string
  for (let i = 0; i < 10; i++) {
    const index = (counter * i + counter + i) % characters.length;
    result += characters.charAt(index);
  }
  
  return result;
};
