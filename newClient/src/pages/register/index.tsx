import { gql, useMutation } from '@apollo/client';
import { Button, CircularProgress, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useState } from 'react';
import LoginLayout from 'src/layout/LoginLayout';
import styled from 'styled-components';

const upsertUserMutation = gql`
    mutation RegisterPage_upsertUser($firstName: String!, $lastName: String!, $email: String!) {
        upsertUser(data: { firstName: $firstName, lastName: $lastName, email: $email }) {
            id
            email
            firstName
            lastName
            createdAt
            updatedAt
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
    successText: {
        color: 'darkgreen',
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

const RegisterPageBlock = styled.div`
    display: flex;
    height: 100vh;

    .register-window {
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

const Register: NextPage = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [successText, setSuccessText] = useState('');
    const [errorText, setErrorText] = useState('');
    const router = useRouter();
    const [upsertUser, { loading: upsertUserLoading }] = useMutation(upsertUserMutation);

    const login = useCallback(
        async e => {
            e.preventDefault();
            try {
                await upsertUser({ variables: { email, firstName, lastName } });
                setSuccessText('Check your email to set your password');
            } catch (err) {
                if (err?.graphQLErrors[0]?.message) {
                    setErrorText(err?.graphQLErrors[0]?.message ? 'User already exists' : '');
                } else {
                    setErrorText('Server error');
                }
            }
        },
        [email, firstName, lastName, upsertUser],
    );

    return (
        <RegisterPageBlock>
            <LoginLayout>
                <form onSubmit={login} className={classes.root}>
                    <Typography className={classes.successText}>{successText}</Typography>
                    <Typography className={classes.errorText}>{errorText}</Typography>
                    <TextField
                        className={classes.input}
                        label="First name"
                        placeholder="John"
                        variant="outlined"
                        type="text"
                        value={firstName}
                        onChange={e => {
                            setFirstname(e.target.value);
                            setErrorText('');
                            setSuccessText('');
                        }}
                    />
                    <TextField
                        className={classes.input}
                        label="Last name"
                        placeholder="Doe"
                        variant="outlined"
                        type="text"
                        value={lastName}
                        onChange={e => {
                            setLastname(e.target.value);
                            setErrorText('');
                            setSuccessText('');
                        }}
                    />
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
                            setSuccessText('');
                        }}
                    />
                    <Button type="submit" className={classes.input} variant="contained" color="primary">
                        {upsertUserLoading ? <CircularProgress size={24} color="secondary" /> : 'Register'}
                    </Button>
                    <Button onClick={() => router.push('login')} className={classes.input} color="primary">
                        Go to Login
                    </Button>
                </form>
                <div className="register-window">
                    <img src="/image/login-page-background.jpg" alt="background-login" />
                </div>
            </LoginLayout>
        </RegisterPageBlock>
    );
};

export default Register;
