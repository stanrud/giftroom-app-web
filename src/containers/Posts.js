import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts, getMeals, setError } from '../actions/posts';

class PostListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getPosts: PropTypes.func.isRequired,
    getMeals: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchPosts();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPosts = () => {
    return this.props.getPosts()
      .then(() => this.props.getMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, posts, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        postId={id}
        error={posts.error}
        loading={posts.loading}
        posts={posts.posts}
        meals={posts.meals}
        reFetch={() => this.fetchPosts()}
      />
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts || {},
});

const mapDispatchToProps = {
  getPosts,
  getMeals,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListing);
