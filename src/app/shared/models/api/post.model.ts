interface PostResponseDTO {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  __v: number;
}
interface PostDTO {
  text: string;
  author: string;
}

interface Author {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { PostResponseDTO, PostDTO, Author };
