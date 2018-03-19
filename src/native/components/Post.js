import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const PostView = ({
  error,
  posts,
  postId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Post from all posts
  let post = null;
  if (postId && posts) {
    post = posts.find(item => item.id === postId);
  }

  // Post not found
  if (!post) return <Error content={ErrorMessages.post404} />;
  // Build Ingredients listing
  if (!post.ingredients) return <Error content={ErrorMessages.post404} />;
  
  const ingredients = post.ingredients.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  // Build Method listing
  const method = post.method.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: post.image }} style={{ height: 100, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>{post.title}</H3>
        <Text>by {post.author}</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>Description</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{post.description}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Ingredients</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {ingredients}
              </List>
            </Content>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Method</Text>
          </CardItem>
          <CardItem>
            <List>
              {method}
            </List>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

PostView.propTypes = {
  error: PropTypes.string,
  postId: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PostView.defaultProps = {
  error: null,
};

export default PostView;
