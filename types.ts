export interface Post {
  identitfier: string;
  slug: string;
  subName: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  body?: string;
  username: string;
  sub?: Sub;
  // virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  username: string;
  posts: Post[];
  // virtuals
  imageUrl: string;
  bannerUrl: string;
  postCount?: number;
}

export interface Comment {
  post?: Post;
  identifier: string;
  body: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  // virtuals
  userVote: number;
  voteScore: number;
}
