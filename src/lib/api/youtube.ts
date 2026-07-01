import axios from 'axios';

const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';

export async function uploadYouTubeShort(
  videoFile: Buffer,
  title: string,
  description: string,
  apiKey: string,
  channelId: string
) {
  try {
    // YouTube requires OAuth2 for upload
    const response = await axios.post(
      `${YOUTUBE_API}/videos?uploadType=multipart&part=snippet,status`,
      videoFile,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/octet-stream',
        },
        params: {
          snippet: {
            title,
            description,
            categoryId: '22', // People & Blogs
            tags: ['finance', 'wealth', 'investing'],
          },
          status: {
            privacyStatus: 'public',
          },
        },
      }
    );

    return {
      success: true,
      videoId: response.data.id,
    };
  } catch (error) {
    console.error('Error uploading to YouTube:', error);
    throw error;
  }
}

export async function getYouTubeVideoAnalytics(
  videoId: string,
  apiKey: string
) {
  try {
    const response = await axios.get(
      `${YOUTUBE_API}/videos`,
      {
        params: {
          id: videoId,
          key: apiKey,
          part: 'statistics,snippet',
        },
      }
    );

    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching YouTube analytics:', error);
    throw error;
  }
}

export async function getYouTubeChannelStats(
  channelId: string,
  apiKey: string
) {
  try {
    const response = await axios.get(
      `${YOUTUBE_API}/channels`,
      {
        params: {
          id: channelId,
          key: apiKey,
          part: 'statistics,snippet',
        },
      }
    );

    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching YouTube channel stats:', error);
    throw error;
  }
}

export async function getYouTubeComments(
  videoId: string,
  apiKey: string
) {
  try {
    const response = await axios.get(
      `${YOUTUBE_API}/commentThreads`,
      {
        params: {
          videoId,
          key: apiKey,
          part: 'snippet',
          textFormat: 'plainText',
          maxResults: 20,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube comments:', error);
    throw error;
  }
}