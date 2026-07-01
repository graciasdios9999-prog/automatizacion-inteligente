import axios from 'axios';

const INSTAGRAM_GRAPH_API = 'https://graph.instagram.com/v18.0';

export interface InstagramMediaUpload {
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL';
  access_token: string;
  business_account_id: string;
}

export interface InstagramComment {
  id: string;
  from: {
    id: string;
    username: string;
  };
  text: string;
  timestamp: string;
}

export async function uploadInstagramContent(
  accountId: string,
  mediaUrl: string,
  caption: string,
  accessToken: string
) {
  try {
    // Create media container
    const containerResponse = await axios.post(
      `${INSTAGRAM_GRAPH_API}/${accountId}/media`,
      {
        image_url: mediaUrl,
        caption: caption,
        access_token: accessToken,
      }
    );

    const mediaId = containerResponse.data.id;

    // Publish media
    const publishResponse = await axios.post(
      `${INSTAGRAM_GRAPH_API}/${accountId}/media_publish`,
      {
        creation_id: mediaId,
        access_token: accessToken,
      }
    );

    return {
      success: true,
      postId: publishResponse.data.id,
      mediaId,
    };
  } catch (error) {
    console.error('Error uploading to Instagram:', error);
    throw error;
  }
}

export async function getInstagramComments(
  mediaId: string,
  accessToken: string
): Promise<InstagramComment[]> {
  try {
    const response = await axios.get(`${INSTAGRAM_GRAPH_API}/${mediaId}/comments`, {
      params: {
        fields: 'id,from,text,timestamp',
        access_token: accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram comments:', error);
    throw error;
  }
}

export async function replyToInstagramComment(
  commentId: string,
  message: string,
  accessToken: string
) {
  try {
    const response = await axios.post(
      `${INSTAGRAM_GRAPH_API}/${commentId}/replies`,
      {
        message,
        access_token: accessToken,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error replying to Instagram comment:', error);
    throw error;
  }
}

export async function getInstagramDMs(
  businessAccountId: string,
  accessToken: string
) {
  try {
    const response = await axios.get(
      `${INSTAGRAM_GRAPH_API}/${businessAccountId}/conversations`,
      {
        params: {
          fields: 'id,senders,latest_message',
          access_token: accessToken,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram DMs:', error);
    throw error;
  }
}

export async function sendInstagramDM(
  conversationId: string,
  message: string,
  accessToken: string
) {
  try {
    const response = await axios.post(
      `${INSTAGRAM_GRAPH_API}/${conversationId}/messages`,
      {
        message,
        access_token: accessToken,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending Instagram DM:', error);
    throw error;
  }
}

export async function getInstagramInsights(
  mediaId: string,
  accessToken: string
) {
  try {
    const response = await axios.get(
      `${INSTAGRAM_GRAPH_API}/${mediaId}/insights`,
      {
        params: {
          metric: 'engagement,impressions,reach,saved',
          access_token: accessToken,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram insights:', error);
    throw error;
  }
}
