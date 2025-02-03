export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type PostRequests = {
  query: string;
  page?: number;
  size?: number;
}
