import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUserProfile } from 'src/requests/user';

export const withAuth = (Component: React.ComponentType) => {
    return class extends React.Component {
        state = {
            userProfile: null,
            isLoading: true,
        };

        async componentDidMount() {
            const userProfile = await getUserProfile();
            this.setState({ userProfile, isLoading: false });
        }

        render() {
            const { userProfile, isLoading } = this.state;

            if (isLoading) {
                return <div>Loading...</div>;
            }

            if (userProfile !== 0) {
                return <Component {...this.props} />;
            } else {
                return <Redirect to="/about" />;
            }
        }
    };
};