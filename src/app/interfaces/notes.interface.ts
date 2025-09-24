import { Types } from "mongoose";

export interface INotes {
  title: string;
  description: string;
  category: "personal" | "work" | "gym" | "other";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
  user: Types.ObjectId;
}
