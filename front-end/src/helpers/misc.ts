
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function digestMessage(message: string) {
  const data = new TextEncoder().encode(message);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(buffer));
  const hex = bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  return hex;
}
