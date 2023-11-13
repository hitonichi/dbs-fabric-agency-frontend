'use client';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <>
      <div className="flex flex-col p-4 justify-between items-start">
        <Typography variant="h5">Client Search:</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => console.log('[INFO] Submitting:', e)}
        ></Box>
      </div>
    </>
  );
}
