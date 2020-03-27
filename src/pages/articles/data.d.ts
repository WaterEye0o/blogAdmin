export interface TableListItem {
  key?: number | string;
  id?: number;
  title: string;
  brief: string;
  content?: string;
  createTime: string;
  visits: number;
  comments?: number;
  likes: number;
  source?: string;
  pic: string,
  tagId?: number
}