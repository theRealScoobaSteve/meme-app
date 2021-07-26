import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getAccessToken } from '../redux/auth/selectors';

interface ReduxProps {
    token: string;
}

interface ComponentProps {
    token: string,
    children: Node
}

const mapStateToProps = (state): ReduxProps => ({
    token: getAccessToken(state)
});

const AuthGuard = ({ children, token }: ComponentProps): Node => {
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, []);

    

    return (
        <>
            {children}
        </>
    );
}

export default connect(mapStateToProps, null)(AuthGuard);