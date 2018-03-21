import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { ImagePicker } from 'expo';

class AddPost extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      author: '',
      image: { uri: 'https://i.pinimg.com/originals/d1/37/5f/d1375f83853416fd628157529771142e.jpg', 
            base64: null 
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.posts())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    let { image } = this.state;
    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Add the gift"
            content="Add the gift that you desire"
          />
          <Form>
            <Item onPress={this._pickImage} >
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 200, height: 200 }}>
                {image &&
                <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
              </View>
            </Item>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input onChangeText={v => this.handleChange('title', v)} />
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input onChangeText={v => this.handleChange('description', v)} />
            </Item>
            <Item stackedLabel>
              <Label>Author</Label>
              <Input onChangeText={v => this.handleChange('author', v)}
              />
            </Item>

            <Spacer size={20} />
              {error && <Messages message={error} />}
            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ 
        image: { uri: result.uri, base64: result.base64 }
      });
    }
  };
}

export default AddPost;
