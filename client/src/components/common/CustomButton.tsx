import { Button, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { UrlObject } from 'url';

declare type Url = string | UrlObject;

const useStyles = makeStyles(theme => ({
    root: {
        height: '40px',
    },

    basic: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(250,250,250)',
        '&:hover': {
            backgroundColor: `#3861e7`,
            color: 'white',
        },
    },
    primary: {
        color: '#FFF',
        width: '100%',
        backgroundColor: `${theme.palette.primary.main}`,
        border: `1px solid ${theme.palette.primary.main}`,
        fontSize: '14px',
        '&:hover': {
            backgroundColor: `${theme.palette.primary.main}`,
        },
    },
    secondary: {
        color: '#D53B3B',
        width: '100%',
        backgroundColor: `${theme.palette.secondary.main}`,
        border: `1px solid ${theme.palette.primary.main}`,
        fontSize: '14px',
    },
    disabled: {
        '&.Mui-disabled': {
            color: '#FFF',
        },

        width: '100%',
        backgroundColor: `#CCC`,
        fontSize: '14px',
        '&:hover': {
            backgroundColor: `#CCC`,
        },
        disableRipple: 'true',
    },
}));

interface CumaButtonProps {
    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    onClick?: (event?: any) => any;
    style?: CSSProperties;
    type?: 'button' | 'reset' | 'submit';
    children?: any;
    className?: string;
    href?: Url;
}

const CumaButton: React.FC<CumaButtonProps> = ({
    children,
    primary,
    secondary,
    disabled,
    className,
    href,
    ...rest
}) => {
    const classes = useStyles();

    // link button
    if (href) {
        if (primary)
            return (
                <Link href={href} passHref>
                    <Button className={clsx(classes.primary, classes.root)} {...rest}>
                        <div className={className}>{children}</div>
                    </Button>
                </Link>
            );
        if (secondary)
            return (
                <Link href={href} passHref>
                    <Button className={clsx(classes.secondary, classes.root)} {...rest}>
                        <div className={className}>{children}</div>
                    </Button>
                </Link>
            );
        if (disabled)
            return (
                <Button disabled className={clsx(classes.disabled, classes.root)} {...rest}>
                    <div className={className}>{children}</div>
                </Button>
            );

        // default
        return (
            <Link href={href} passHref>
                <Button className={clsx(classes.basic, classes.root)} {...rest}>
                    <div className={className}>{children}</div>
                </Button>
            </Link>
        );
    }

    // normal button
    if (primary)
        return (
            <Button className={clsx(classes.primary, classes.root)} {...rest}>
                <div className={className}>{children}</div>
            </Button>
        );
    if (secondary)
        return (
            <Button className={clsx(classes.secondary, classes.root)} {...rest}>
                <div className={className}>{children}</div>
            </Button>
        );
    if (disabled)
        return (
            <Button disabled className={clsx(classes.disabled, classes.root)} {...rest}>
                <div className={className}>{children}</div>
            </Button>
        );

    return (
        <Button className={clsx(classes.basic, classes.root)} {...rest}>
            <div className={className}>{children}</div>
        </Button>
    );
};

export default CumaButton;
