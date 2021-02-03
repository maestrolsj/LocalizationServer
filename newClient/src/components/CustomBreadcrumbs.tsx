import { Breadcrumbs, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import CustomButton from './common/CustomButton';

type Path = {
    name: string;
    path?: string;
};

interface CustomBreadcrumbsProps {
    paths: Path[];
}

export const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ paths }) => {
    const router = useRouter();
    const handleClick = useCallback(
        path => {
            router.push(path);
        },
        [router],
    );

    return (
        <Breadcrumbs>
            {paths.length > 1
                ? paths
                      .filter((i, ind) => ind !== paths.length - 1)
                      .map((i, ind) => (
                          <CustomButton key={ind} onClick={() => handleClick(i.path)}>
                              {i.name}
                          </CustomButton>
                      ))
                : null}
            {paths.length > 0 ? <Typography color="textPrimary">{paths[paths.length - 1].name}</Typography> : null}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumbs;
