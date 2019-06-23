import { TextField, Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as React from 'react';
import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';

const defaultRuby = `# あいさつをします
#
# @param [String] name ユーザ名
# @return [String] あいさつ
def hello(name)
  return "こんにちは、#{name}さん"
end

# (see #hello)
# @note このメソッド使わないほうが良い
def regacyHello(name)
  self.state += 1
  "hello"
end`;
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
        <CssBaseline />
        <Grid container>
          <Grid item xs={12} style={{marginBottom: "1rem"}}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  YARD Playground
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="textfield-ruby"
              name="ruby"
              label="Ruby Source Code"
              multiline
              style={ {width: "90%", marginLeft: "1rem"} }
              value={this.state.ruby}
              margin="normal"
              onChange={this.handleChange}
            />
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Generate YARD Document!
            </Button>
          </Grid>
          <Grid item xs={6}>
            <iframe id="iframe-yard" height="480" style={ {width: "90%"} }></iframe>
          </Grid>
        </Grid>

        <ul>
          <li>about YARD: <a target="blank" href="https://github.com/lsegal/yard">lsegal/yard: YARD is a Ruby Documentation tool. The Y stands for &quot;Yay!&quot;</a></li>
          <li>about this source code: <a target="blank" href="https://github.com/s2terminal/yard-playground">s2terminal/yard-playground</a></li>
        </ul>
      </>
    );
  }
}

export default Index;
