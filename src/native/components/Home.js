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
import LottieView from 'lottie-react-native';

const PostListing = ({
  error,
  loading,
  postsAll,
  reFetch,
  reFetchAll,
  meals
}) => {

  // Loading
  if (loading) return <Loading />;

  componentDidMount = () => reFetchAll();

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.post({ match: { params: { id: String(item.id) } } });

  var _refresh =  () => {
    return new Promise(async (resolve) => {
      await reFetchAll()
      return resolve()
    });
  }

  return (
    <Container>
      <PTRView onRefresh={_refresh} offset={60}>
        <Content padder>
          <Header
            title="FEED"
            content="Find your friends"
          />

          <FlatList
            numColumns={1}
            data={postsAll}
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
                    <Left>
                    <Body>
                      <Button transparent>
                        <Thumbnail source={{uri: 'https://avatars3.githubusercontent.com/u/7645498?s=460&v=4'}} />
                        <Text style={{ color: '#fff' }}>Stan Rud</Text>
                      </Button>
                    </Body>
                    </Left>
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
        </Content>
      </PTRView>
    </Container>
  );
};

PostListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  postsAll: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetchAll: PropTypes.func,
};

PostListing.defaultProps = {
  error: null,
  reFetchAll: null,
};

export default PostListing;
