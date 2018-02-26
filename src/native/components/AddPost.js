import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class AddPost extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    //loading: PropTypes.bool.isRequired,
    //onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      link: '',
      projects: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return fetch('http://rudiko.com:1337/parse/classes/Posts', {
          method: "GET",
          headers: {
                        'Content-Type': ' application/json',
                        'X-Parse-Application-Id': '',
                        'X-Parse-REST-API-Key': ''
                    },
        })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
              projects: responseJson.results
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.recipes())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    //if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Add the gift"
            content="Add the gift that you desire"
          />
          {this.state.projects.map((p, i) => {
            return (
              <Image
                    source={{ uri: p.file.url }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1,
                      borderRadius: 7,
                    }}
              ></Image>
            );
          })}

          <Form>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input onChangeText={v => this.handleChange('title', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Description</Label>
              <Input onChangeText={v => this.handleChange('description', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Link</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('link', v)}
              />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}



  //EXAMPLE 
  const gifts = async () => {
  return fetch('http://rudiko.com:1337/parse/classes/Posts', {
          method: "GET",
          headers: {
                        'Content-Type': ' application/json',
                        'X-Parse-Application-Id': 'myAppId',
                        'X-Parse-REST-API-Key': 'QWERTY!@#$%^'
                    },
        })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.results;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const printData = async () => {
    try {
      const json = await gifts()
      console.log(json)
    } catch(e) {f
      console.error("Problem", e)
    }
  }

export default AddPost;
