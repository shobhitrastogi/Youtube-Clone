import React from 'react';
import { Stack, Box } from '@mui/material';
import { ChannelCard, VideoCard } from './';

const Videos = ({ videos }) => {
  // Check if the videos prop is not an array or is empty
  if (!Array.isArray(videos) || videos.length === 0) {
    return <div>No videos to display.</div>;
  }

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
