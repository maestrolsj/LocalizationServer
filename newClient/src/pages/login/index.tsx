import { gql, useApolloClient } from '@apollo/client';
import { Button, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginLayout from 'src/layout/LoginLayout';
import { openSnackBar, setSnackbarMessage } from 'src/store/system';
import styled from 'styled-components';
import { login as loginSuccess } from 'src/store/user/actions';
import { useSelector } from 'react-redux';

const loginQuery = gql`
    query LoginPage_login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            user {
                id
                email
                firstName
                lastName
                createdAt
                updatedAt
            }
        }
    }
`;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: 8,
        width: '80%',
    },
    password: {
        marginBottom: 0,
        width: '80%',
    },
    errorText: {
        color: 'red',
    },

    forgotPassword: {
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: 12,
        color: theme.palette.primary.main,
        margin: '4px 0',
        textAlign: 'right',
        width: '80%',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const LoginPageBlock = styled.div`
    display: flex;
    height: 100vh;

    .login-window {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 90%;
            height: 30%;
        }
    }
`;

const LoginPage: NextPage = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const client = useApolloClient();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            router.push('/home');
        }
    }, [router, user]);

    const login = useCallback(
        async (event: React.FormEvent<EventTarget>) => {
            event.preventDefault();
            try {
                const { data } = await client.query({
                    query: loginQuery,
                    variables: { email, password },
                });

                if (data.login.accessToken) {
                    localStorage.setItem('access_token', data.login.accessToken);
                }
                dispatch(loginSuccess(data));
            } catch (err) {
                dispatch(setSnackbarMessage(err.message));
                dispatch(openSnackBar());
                setErrorText(err?.graphQLErrors[0]?.message ?? '');
            }
        },
        [client, dispatch, email, password],
    );

    return (
        <LoginPageBlock>
            <LoginLayout>
                <form onSubmit={login} className={classes.root}>
                    <Typography className={classes.errorText}>{errorText}</Typography>
                    <TextField
                        className={classes.input}
                        label="Email"
                        placeholder="John.Doe@gmail.com"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            setErrorText('');
                        }}
                    />
                    <TextField
                        className={clsx(classes.input, classes.password)}
                        label="Password"
                        placeholder="*******"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setErrorText('');
                        }}
                    />
                    <Typography onClick={() => router.push('/forget')} className={classes.forgotPassword}>
                        Forgot password?
                    </Typography>

                    <Button type="submit" className={classes.input} variant="contained" color="primary">
                        Login
                    </Button>
                    <Button onClick={() => router.push('/register')} className={classes.input} color="primary">
                        Register
                    </Button>
                </form>
                <div className="login-window">
                    <img src="/image/login-page-background.jpg" alt="background-login" />
                </div>
            </LoginLayout>
        </LoginPageBlock>
    );
};

export default LoginPage;
