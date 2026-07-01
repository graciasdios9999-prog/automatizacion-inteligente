import axios from 'axios';

const TIKTOK_API = 'https://open.tiktok.com/v1';

export interface TikTokVideoPost {
  video_url?: string;
  text: string;
  disable_comment?: boolean;
  disable_duet?: boolean;
  disable_stitch?: boolean;
  video_cover_timestamp_ms?: number;
}

export async function uploadTikTokVideo(
  videoFile: Buffer,
  caption: string,
  accessToken: string
) {
  try {
    // TikTok requires video file upload first
    const uploadResponse = await axios.post(
      `${TIKTOK_API}/video/upload`,
      videoFile,
      {
        headers: {
          'Content-Type': 'video/mp4',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const videoId = uploadResponse.data.data.video_id;

    // Then create the post
    const postResponse = await axios.post(
      `${TIKTOK_API}/video/publish`,
      {
        video_id: videoId,
        text: caption,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return {
      success: true,
      videoId: postResponse.data.data.video_id,
    };
  } catch (error) {
    console.error('Error uploading to TikTok:', error);
    throw error;
  }
}

export async function getTikTokVideoAnalytics(
  videoId: string,
  accessToken: string
) {
  try {
    const response = await axios.get(
      `${TIKTOK_API}/video/query`,
      {
        params: {
          filters: {
            video_ids: [videoId],
          },
          fields: ['id', 'create_time', 'like_count', 'comment_count', 'share_count', 'view_count'],
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching TikTok analytics:', error);
    throw error;
  }
}

export async function getTikTokComments(
  videoId: string,
  accessToken: string
) {
  try {
    const response = await axios.get(
      `${TIKTOK_API}/comment/list`,
      {
        params: {
          video_id: videoId,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching TikTok comments:', error);
    throw error;
  }
}

export async function getTikTokUserInfo(accessToken: string) {
  try {
    const response = await axios.get(
      `${TIKTOK_API}/user/info`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching TikTok user info:', error);
    throw error;
  }
}