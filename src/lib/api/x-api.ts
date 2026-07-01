import axios from 'axios';

const X_API = 'https://api.twitter.com/2';

export interface XThread {
  tweets: Array<{
    text: string;
    reply_to?: string;
  }>;
}

export async function postXThread(
  tweets: string[],
  bearerToken: string
): Promise<string[]> {
  try {
    const tweetIds: string[] = [];
    let previousTweetId: string | undefined;

    for (const text of tweets) {
      const payload: any = {
        text,
      };

      if (previousTweetId) {
        payload.reply = {
          in_reply_to_tweet_id: previousTweetId,
        };
      }

      const response = await axios.post(
        `${X_API}/tweets`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const tweetId = response.data.data.id;
      tweetIds.push(tweetId);
      previousTweetId = tweetId;

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return tweetIds;
  } catch (error) {
    console.error('Error posting X thread:', error);
    throw error;
  }
}

export async function getXTweetAnalytics(
  tweetId: string,
  bearerToken: string
) {
  try {
    const response = await axios.get(
      `${X_API}/tweets/${tweetId}`,
      {
        params: {
          'tweet.fields': 'public_metrics,created_at',
        },
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching X tweet analytics:', error);
    throw error;
  }
}

export async function getXConversations(
  query: string,
  bearerToken: string
) {
  try {
    const response = await axios.get(
      `${X_API}/tweets/search/recent`,
      {
        params: {
          query,
          max_results: 100,
          'tweet.fields': 'author_id,created_at,public_metrics',
          'user.fields': 'username,public_metrics',
          expansions: 'author_id',
        },
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching X conversations:', error);
    throw error;
  }
}

export async function replyToXTweet(
  tweetId: string,
  replyText: string,
  bearerToken: string
) {
  try {
    const response = await axios.post(
      `${X_API}/tweets`,
      {
        text: replyText,
        reply: {
          in_reply_to_tweet_id: tweetId,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error replying to X tweet:', error);
    throw error;
  }
}

export async function retweetPost(
  tweetId: string,
  userId: string,
  bearerToken: string
) {
  try {
    const response = await axios.post(
      `${X_API}/users/${userId}/retweets`,
      {
        tweet_id: tweetId,
      },
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error retweeting post:', error);
    throw error;
  }
}