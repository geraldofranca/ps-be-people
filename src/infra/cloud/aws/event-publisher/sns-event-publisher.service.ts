import { Injectable } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { IEventPublisher } from '../../../../domain/repositories/event-publisher.interface';

@Injectable()
export class SnsEventPublisherService implements IEventPublisher {
  private readonly sns: SNS;

  constructor() {
    this.sns = new SNS({ region: process.env.AWS_REGION });
  }

  async publish<T>(topic: string, payload: T): Promise<void> {
    const topicEnvVar = `SNS_ARN_${topic.toUpperCase().replace(/\./g, '_')}`;
    const topicArn = process.env[topicEnvVar];
    if (!topicArn) {
      throw new Error(`Environment variable ${topicEnvVar} is not set`);
    }

    await this.sns
      .publish({
        TopicArn: topicArn,
        Message: JSON.stringify(payload),
      })
      .promise();
  }
}
