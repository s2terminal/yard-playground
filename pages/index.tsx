import { TextField, Button, Grid  } from '@material-ui/core';
import * as React from 'react';
import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setYard();
  }

  async pushRuby(ruby: string) {
    const data = new FormData();
    data.append('ruby', ruby);

    await fetch(`${sinatraOrigin}/yard-push`, {
      method: 'POST',
      mode: 'no-cors',
      body: data
    });
    this.setYard();
  }

  handleChange(event) {
    this.setState({ruby: event.target.value});
  }
  handleSubmit() {
    this.pushRuby(this.state.ruby);
  }
  async setYard() {
    const res = await fetch(`${sinatraOrigin}/yard`);
    const yard = await res.text();
    const $ = cheerio.load(yard);

    document.getElementById('iframe-yard').srcdoc = $('#content');
  }

  render() {
    return (
      <>
        <h1>YARD Playground</h1>
        <form>
          <div>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Generate YARD Document!
            </Button>
          </div>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="textfield-ruby"
                name="ruby"
                label="Ruby Source Code"
                multiline
                style={ {width: "90%"} }
                value={this.state.ruby}
                margin="normal"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <iframe id="iframe-yard" height="480" style={ {width: "90%"} }></iframe>
            </Grid>
          </Grid>

        </form>
        <p>
          <a href="https://github.com/lsegal/yard">lsegal/yard: YARD is a Ruby Documentation tool. The Y stands for &quot;Yay!&quot;</a>
        </p>
      </>
    );
  }
}

export default Index;
