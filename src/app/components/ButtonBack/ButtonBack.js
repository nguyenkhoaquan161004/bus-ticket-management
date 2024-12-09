import React from 'react';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
    const nav = useNavigate();
    return (
        <div>
            <button
                style={{
                    position: 'fixed',
                    top: 200,
                    left: 147
                }}
                onClick={() => nav(-1)}>
                <InlineIcon
                    icon="ic:round-arrow-back-ios"
                    style={{
                        fontSize: 30,
                    }}></InlineIcon>
            </button>
        </div>
    );
};

export default ButtonBack;