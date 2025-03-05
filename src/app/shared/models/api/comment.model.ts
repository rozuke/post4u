import { Author, PostResponseDTO } from './post.model';

interface CommentRequestDTO {
  text: string;
  author: string;
  post: string;
}
interface Comment {
  _id: string;
  text: string;
  author: string;
  post: string;
  createdAt: string;
  updatedAt: string;
}
interface CommentResponseDTO {
  _id: string;
  text: string;
  author: Author;
  post: PostResponseDTO;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { CommentRequestDTO, CommentResponseDTO, Comment };
