import React from 'react';
import PropTypes from 'prop-types';
import { View,
  AppRegistry,
  StyleSheet,
  ScrollView,
  Image,
  Navigator,
  Button } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text, Icon, Card } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const mePic = {
  uri: 'https://mostbeautiful.files.wordpress.com/2016/03/6992255-ariadne-artiles.jpg?w=625&h=390',
};
const canvasPic = {
  uri: 'http://images6.fanpop.com/image/photos/39200000/Neslihan-Atag-l-neslihan-atagul-39263033-703-960.jpg',
};

const Profile = ({ member, logout }) => (
  <Container>
    <Image source={ canvasPic } style={ styles.canvas } blurRadius={0} />
    <Card style={ styles.card }>
      <View style={ styles.meInfo }>
        <Image source={ mePic } style={ styles.mePic } />
        <Text style={ styles.meName }>{ member.firstName + ' ' + member.lastName }</Text>
      </View>
      <View style={ styles.meInfoWrap }>
        <View style={{ flex: 1 }}>
          <View style={ styles.meData }>
            <View style={ styles.data }>
              <Text style={{ fontWeight: 'bold' }}>22</Text>
              <Text style={{ fontSize: 12, color: '#777' }}>posts</Text>
            </View>

            <View style={ styles.data }>
              <Text style={{ fontWeight: 'bold' }}>204</Text>
              <Text style={{ fontSize: 12, color: '#777' }}>followers</Text>
            </View>

            <View style={ styles.data }>
              <Text style={{ fontWeight: 'bold' }}>22</Text>
              <Text style={{ fontSize: 12, color: '#777' }}>following</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <List style={ styles.listButtons }>
          {(member && member.email) ?
            <View>
              <ListItem onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add" />
                </Left>
                <Body>
                  <Text>Update My Profile</Text>
                </Body>
              </ListItem>
              <ListItem onPress={logout} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>Logout</Text>
                </Body>
              </ListItem>
            </View>
            :
            <View>
              <ListItem onPress={Actions.login} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>Login</Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle" />
                </Left>
                <Body>
                  <Text>Sign Up</Text>
                </Body>
              </ListItem>
              <ListItem onPress={Actions.forgotPassword} icon>
                <Left>
                  <Icon name="help-buoy" />
                </Left>
                <Body>
                  <Text>Forgot Password</Text>
                </Body>
              </ListItem>
            </View>
          }
        </List>
      </View>
    </Card>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  meInfoWrap: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  meData: {
    flexDirection: 'row',
  },
  meInfo: {
    position: 'relative',
    marginTop: -50,
    alignItems: 'center',
  },
  mePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  meName: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 8,
  },
  data: {
    flex: 1,
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  card: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  listButtons: {
    width: '90%',
  },
});

export default Profile;
