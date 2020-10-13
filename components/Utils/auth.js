import { parseCookies } from 'nookies';
import { Component } from 'react';

const redirect = (res, url) => {
  res.writeHead(302, {
    Location: url,
  });
  res.end();
};

const withAuth = (ProtectedComponent) => class extends Component {
  static async getInitialProps(ctx) {
    const cookies = parseCookies(ctx);
    if (!cookies.at) {
      redirect(ctx.res, 'http://localhost:3000/login');
    }
    const pageProps = ProtectedComponent.getInitialProps
     && await ProtectedComponent.getInitialProps(ctx);

    return { ...pageProps };
  }

  render() {
    return <ProtectedComponent {...this.props} />;
  }
};
export default withAuth;
