import { Typography } from '@mui/material';

export default function InfoEntry({
  label,
  content,
}: {
  label: string;
  content: string | null;
}) {
  return (
    <div className="flex gap-2">
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {label}:
      </Typography>
      <Typography variant="subtitle1">{content}</Typography>
    </div>
  );
}
