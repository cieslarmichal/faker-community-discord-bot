/* eslint-disable @typescript-eslint/naming-convention */

import {
  processGithubIssueEventBodySchema,
  processGithubIssueEventResponseOkBodySchema,
  type ProcessGithubIssueEventBody,
  type ProcessGithubIssueEventResponseOkBody,
} from './schemas/processGithubIssueEventSchema.js';
import {
  type ProcessGithubPullRequestEventBody,
  type ProcessGithubPullRequestEventResponseOkBody,
  processGithubPullRequestEventBodySchema,
  processGithubPullRequestEventResponseOkBodySchema,
} from './schemas/processGithubPullRequestEventSchema.js';
import { type HttpController } from '../../../../../common/types/http/httpController.js';
import { HttpMethodName } from '../../../../../common/types/http/httpMethodName.js';
import { type HttpRequest } from '../../../../../common/types/http/httpRequest.js';
import { type HttpOkResponse } from '../../../../../common/types/http/httpResponse.js';
import { HttpRoute } from '../../../../../common/types/http/httpRoute.js';
import { HttpStatusCode } from '../../../../../common/types/http/httpStatusCode.js';
import { type SendIssueCreatedMessageCommandHandler } from '../../../application/commandHandlers/sendIssueCreatedMessageCommandHandler/sendIssueCreatedMessageCommandHandler.js';

export class EventHttpController implements HttpController {
  public readonly basePath = '/events/github';

  public constructor(private readonly sendIssueCreatedMessageCommandHandler: SendIssueCreatedMessageCommandHandler) {}

  public getHttpRoutes(): HttpRoute[] {
    return [
      new HttpRoute({
        method: HttpMethodName.post,
        path: '/issues',
        handler: this.processGithubIssueEvent.bind(this),
        schema: {
          request: {
            body: processGithubIssueEventBodySchema,
          },
          response: {
            [HttpStatusCode.ok]: {
              schema: processGithubIssueEventResponseOkBodySchema,
              description: 'Issue event processed.',
            },
          },
        },
        tags: ['Issue', 'Github', 'Webhook'],
        description: 'Process github issue event.',
      }),
      new HttpRoute({
        method: HttpMethodName.post,
        path: '/pull-requests',
        handler: this.processGithubPullRequestEvent.bind(this),
        schema: {
          request: {
            body: processGithubPullRequestEventBodySchema,
          },
          response: {
            [HttpStatusCode.ok]: {
              schema: processGithubPullRequestEventResponseOkBodySchema,
              description: 'Pull request event processed.',
            },
          },
        },
        tags: ['Pull Request', 'Github', 'Webhook'],
        description: 'Process github pull request event.',
      }),
    ];
  }

  private async processGithubIssueEvent(
    request: HttpRequest<ProcessGithubIssueEventBody>,
  ): Promise<HttpOkResponse<ProcessGithubIssueEventResponseOkBody>> {
    const { action, issue, sender } = request.body;

    if (action === 'opened') {
      await this.sendIssueCreatedMessageCommandHandler.execute({
        issueTitle: issue.title,
        issueUrl: issue.url,
        issueNumber: issue.number,
        issueLabels: issue.labels,
        creatorName: sender.login,
        creatorAvatarUrl: sender.avatar_url,
        creatorHtmlUrl: sender.html_url,
      });
    }

    return {
      statusCode: HttpStatusCode.ok,
      body: null,
    };
  }

  private async processGithubPullRequestEvent(
    request: HttpRequest<ProcessGithubPullRequestEventBody>,
  ): Promise<HttpOkResponse<ProcessGithubPullRequestEventResponseOkBody>> {
    const { action, pull_request, sender } = request.body;

    if (action === 'opened') {
      await this.sendIssueCreatedMessageCommandHandler.execute({
        issueTitle: issue.title,
        issueUrl: issue.url,
        issueNumber: issue.number,
        issueLabels: issue.labels,
        creatorName: sender.login,
        creatorAvatarUrl: sender.avatar_url,
        creatorHtmlUrl: sender.html_url,
      });
    }

    return {
      statusCode: HttpStatusCode.ok,
      body: null,
    };
  }
}
