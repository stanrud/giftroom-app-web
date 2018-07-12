import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, Icon, ListItem, View, Fab, Thumbnail } from 'native-base';
import DefaultProps from '../constants/navigation';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import PTRView from 'react-native-pull-to-refresh';

const PostListing = ({
  error,
  loading,
  posts,
  reFetch,
  meals,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.post({ match: { params: { id: String(item.id) } } });

  const _refresh = () => {
    return new Promise(async (resolve) => {
      await reFetch();
      resolve();
    });
  };

  return (
    <Container>
      <PTRView onRefresh={_refresh} >
        <Content padder>
          <Header
            title="GiftRoom"
            content="All your desired gifts are displayed here"
          />

          <FlatList
            numColumns={2}
            data={posts}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }} key={item.id}>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1}}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: 200,
                        width: null,
                        flex: 1,
                        borderRadius: 9,
                      }}
                    >
                      <Body>
                        <Spacer size={10} />
                        <Button transparent>
                          <Text style={{ color: '#fff', fontWeight: '800' }}>{item.title}</Text>
                        </Button>
                      </Body>
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
        </Content>
      </PTRView>
      <Fab
        active={'true'}
        containerStyle={{}}
        style={{ backgroundColor: '#9ef9d3' }}
        position="bottomRight"
        onPress={Actions.addpost}>
        <Icon name="add" style={{ color: '#555' }} />
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
