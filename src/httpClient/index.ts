export class HttpClient {
  private baseUrl = process.env.API_URL || "http://localhost:3000";

  async get(url: string): Promise<any> {
    let data;
    try {
      const response = await fetch(`${this.baseUrl}/${url}`);
      data = await response.json();
    } catch (error) {
      data = error;
    }
    return data;
  }
}
