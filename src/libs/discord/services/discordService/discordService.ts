export interface SendTextMessagePayload {
  readonly message: string;
  readonly channelId: string;
}

export interface SendEmbedMessagePayload {
  readonly message: {
    readonly color: string;
    readonly title: string;
    readonly url: string;
    readonly author: {
      readonly name: string;
      readonly url: string;
    };
    readonly thumbnail: string;
    readonly description?: string;
    readonly customFields: { name: string; value: string }[];
  };
  readonly channelId: string;
}

export interface DiscordService {
  sendTextMessage(payload: SendTextMessagePayload): Promise<void>;
  sendEmbedMessage(payload: SendEmbedMessagePayload): Promise<void>;
}
