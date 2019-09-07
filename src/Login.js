import React from 'react';
import GitHubLogin from 'react-github-login';

const CLIENT_ID = 'eeb8f591a2721ba003e2';
const REDIRECT_URI = 'http://localhost:3000';

class Login extends React.Component {

  onSuccess = (res) => {
    this.props.changeUserId(res.code);
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12">
            <GitHubLogin
              clientId={CLIENT_ID}
              onSuccess={this.onSuccess}
              redirectUri={REDIRECT_URI}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
