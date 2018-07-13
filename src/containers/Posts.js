import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts, getMeals, setError, getAllPosts } from '../actions/posts';

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
    getAllPosts: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => {
    this.fetchPosts();
    this.fetchAllPosts();
  }

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

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchAllPosts = () => {
    return this.props.getAllPosts()
      .then(() => this.props.getMeals())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, posts, postsAll, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        postId={id}
        error={posts.error}
        loading={posts.loading}
        posts={posts.posts}
        postsAll={posts.postsAll}
        meals={posts.meals}
        reFetch={() => this.fetchPosts()}
        reFetchAll={() => this.fetchAllPosts()}
      />
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts || {},
  postsAll: state.postsAll || {},
});

const mapDispatchToProps = {
  getPosts,
  getMeals,
  getAllPosts,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListing);
