import React from 'react';
import SystemUtil from 'src/components/SystemUtil';

interface IProps {
    sample?: string;
}

const LoginLayout: React.FC<IProps> = ({ children }) => {
    return (
        <>
            {children}
            <SystemUtil />
        </>
    );
};

export default LoginLayout;
