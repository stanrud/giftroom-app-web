import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon, Text } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import PostsContainer from '../../containers/Posts';
import PostsComponent from '../components/Posts';
import PostViewComponent from '../components/Post';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import HomeContainer from '../../containers/Posts';
import HomeComponent from '../components/Home';

import AddPostContainer from '../../containers/AddPost';
import AddPostComponent from '../components/AddPost';

const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        tabBarPosition="bottom"
        showLabel={false}

        {...DefaultProps.tabProps}
      >
        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon ios='ios-people-outline' android="md-people" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={HomeContainer} Layout={HomeComponent} />
        </Stack>

        <Stack
          key="posts"
          title="POSTS"
          icon={() => <Icon ios='ios-list-box-outline' android="md-list-box" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="posts" component={PostsContainer} Layout={PostsComponent} />
        
          <Scene
            key="addpost"
            title="ADDPOST"
            {...DefaultProps.navbarProps}
            component={AddPostContainer}
            Layout={AddPostComponent}
          />
        </Stack>

        <Stack
          key="profile"
          title="PROFILE"
          hideNavBar="true"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene 
            key="profileHome" 
            component={MemberContainer} 
            Layout={ProfileComponent} 
          />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="post"
      title="POST"
      {...DefaultProps.navbarProps}
      component={PostsContainer}
      Layout={PostViewComponent}
    />
  </Stack>
);

export default Index;
