import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../actions/posts';

const AddPost = ({
  Layout,
  onFormSubmit,
  post,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
}) => (
  <Layout
    post={post}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
  />
);

AddPost.propTypes = {
  Layout: PropTypes.func.isRequired,
  post: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

AddPost.defaultProps = {
  infoMessage: null,
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  post: state.post || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
