export interface IHttpClient<T> {
  get(url: string): Promise<{ data: T; error: string | null }>;
}

export class HttpClient implements IHttpClient<any> {
  async get(url: string): Promise<{ data: any; error: any }> {
    let data;
    let error = null;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
      data = await response.json();
    } catch (err) {
      error = err as unknown as Error;
    }
    return { data, error };
  }
}
