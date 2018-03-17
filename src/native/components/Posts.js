import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Icon, ListItem, View, Fab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const PostListing = ({
  error,
  loading,
  posts,
  reFetch,
  meals
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  console.log();
  const keyExtractor = item => item.id;

  const onPress = item => Actions.post({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Header
          title="GiftRoom"
          content="All your desired gifts are displayed here"
        />

        <FlatList
          numColumns={1}
          data={posts}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }} key={item.id}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1,
                      borderRadius: 7,
                    }}
                  >
                  <Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="thumbs-up" style={{ color: '#fff' }} />
                      <Text style={{ color: '#fff' }} >12</Text>
                    </Button>
                  </Body>
                  </Left>
                  </Image>
                </TouchableOpacity>
              </CardItem>

              {/*
              <CardItem cardBody>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                  <Spacer size={15} />
                  <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(item)}
                  >
                    <Text>View Post</Text>
                  </Button>
                  <Spacer size={5} />
                </Body>
              </CardItem>
                  */}

            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>

          <Fab
            active={'true'}
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={Actions.addpost}>
            <Icon name="add" />
          </Fab>

    </Container>
  );
};

PostListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

PostListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default PostListing;
