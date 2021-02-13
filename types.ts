export interface Post {
  identitfier: string;
  slug: string;
  subName: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  body?: string;
  username: string;
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
