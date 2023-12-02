/* eslint-disable @typescript-eslint/naming-convention */

export interface IssueBody {
  number: number;
  title: string;
  html_url: string;
  assignee: {
    login: string;
    avatar_url: string;
  };
}

export type GetIssuesByLabelHttpResponseBody = IssueBody[];