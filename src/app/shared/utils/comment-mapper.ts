import { Comment, CommentResponseDTO } from '../models/api/comment.model';

export const mapCommentResponseToDTO = (
  comment: CommentResponseDTO
): Comment => {
  return {
    _id: comment._id,
    text: comment.text,
    author: comment.author._id,
    post: comment.post._id,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};
