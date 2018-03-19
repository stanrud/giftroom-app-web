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

    // Loading
    //if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Add the gift"
            content="Add the gift that you desire"
          />
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
              <Label>Author</Label>
              <Input onChangeText={v => this.handleChange('author', v)}
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

export default AddPost;
