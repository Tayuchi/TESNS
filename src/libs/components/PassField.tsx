import * as React from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material/';

interface PassFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PassField({ value, onChange }: PassFieldProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <FormControl variant="outlined">
                <InputLabel>パスワード</InputLabel>
                <OutlinedInput
                    id="pass"
                    type={showPassword ? 'text' : 'password'}
                    value={value}  // 親コンポーネントから受け取ったvalueを設定
                    onChange={onChange}  // 親コンポーネントから受け取ったonChangeを設定
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </div>
    )
}
