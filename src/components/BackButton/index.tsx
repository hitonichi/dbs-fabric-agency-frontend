import { Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const BackButton = () => {
  return (
    <Button>
      <div className="flex gap-2 items-center">
        <ArrowBackIosNewIcon />
        <Typography variant="h6">Back</Typography>
      </div>
    </Button>
  );
};

export default BackButton;
