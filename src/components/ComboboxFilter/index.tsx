import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';

const DEFAULT_OPTIONS = [
  { label: 'A', id: '2' },
  { label: 'B', id: '4' },
  { label: 'C', id: '6' },
  { label: 'D', id: '8' },
];

export default function ComboboxFilter({
  label,
  options,
  input,
  setInput,
}: {
  label: string;
  options: { label: string; id: string }[];
  input: unknown;
  setInput: (val) => void;
}) {
  // const handleSubmitInput = () => {
  //   console.log('filtering base on', input);
  // };

  useEffect(() => {
    console.log('[INFO] Combobox input changed', input);
  }, [input]);

  return (
    <div className="flex w-full gap-2 items-center">
      {/* <TextField
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        sx={{ width: '100%' }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmitInput();
          }
        }}
        size="small"
      /> */}
      <Autocomplete
        id="combo-box-demo"
        options={options || DEFAULT_OPTIONS}
        sx={{ width: '100%' }}
        size="small"
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={(e, newVal) => setInput(newVal)}
        getOptionLabel={(o) => o.id + ' - ' + o.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        // value={input}
        // onKeyDown={(e) => {
        //   if (e.key === 'Enter') {
        //     handleSubmitInput();
        //   }
        // }}
      />
      {/* <Button variant="contained" disabled={!input} onClick={handleSubmitInput}>
        Find
      </Button> */}
    </div>
  );
}
