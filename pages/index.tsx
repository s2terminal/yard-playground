import TextField from '@material-ui/core/TextField';
import * as React from 'react';

const defaultRuby = `# @param [String] name ユーザ名
# @return [String] password あいさつ
def hello(name)
  return "こんにちは、#{name}さん"
end
`;
const sinatraOrigin = 'http://localhost:4567';

interface State {
  ruby: string
}

class Index extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {ruby: defaultRuby};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ruby: event.target.value});
  };

  render() {
    return (
      <>
        <h1>YARD Playground</h1>
        <form action={`${sinatraOrigin}/yard-push`}>
          <TextField
            id="textfield-ruby"
            name="ruby"
            label="Ruby Source Code"
            multiline
            style={ {width: "640px"} }
            value={this.state.ruby}
            margin="normal"
            onChange={this.handleChange}

          />
          <input type="submit" />
        </form>

        <iframe src={`${sinatraOrigin}/yard`} width="640" height="480"></iframe>

        <p>
          <a href="https://github.com/lsegal/yard">lsegal/yard: YARD is a Ruby Documentation tool. The Y stands for &quot;Yay!&quot;</a>
        </p>
      </>
    );
  }
}

export default Index;
