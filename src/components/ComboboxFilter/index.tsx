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
  size,
}: {
  label: string;
  options: { label: string; id: string }[];
  input: unknown;
  setInput: (val) => void;
  size?: 'small' | 'medium';
}) {
  // const handleSubmitInput = () => {
  //   console.log('filtering base on', input);
  // };

  useEffect(() => {
    console.log('[INFO] Combobox input changed', input);
  }, [input]);

  return (
    <div className="flex w-full gap-2 items-center">
      <Autocomplete
        id="combo-box-demo"
        options={options || DEFAULT_OPTIONS}
        sx={{ width: '100%' }}
        size={size || 'small'}
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
    </div>
  );
}
