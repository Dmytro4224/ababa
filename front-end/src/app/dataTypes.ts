
export type guid = string;

export type date = string; //2022-08-19T16:27:11.838Z


export interface IMovie {
  id: number | null;
  hash: guid;
  ownerid: number | null;
  name: string;
  description: string;
  thumbnail: string;
  preview: string;
  status: boolean;
  date: date;
}
