const defaultRuby = `# @param [String] name ユーザ名
# @return [String] password あいさつ
def hello(name)
  return "こんにちは、#{name}さん"
end
`;

const sinatraOrigin = 'http://localhost:4567'

function Home() {
  return (
    <>
      <h1>YARD Playground</h1>
      <form action={`${sinatraOrigin}/yard-push`}>
        <textarea name="ruby" value={defaultRuby}></textarea>
        <input type="submit" />
      </form>

      <iframe src={`${sinatraOrigin}/yard`} width="640" height="480"></iframe>

      <p>
        <a href="https://github.com/lsegal/yard">lsegal/yard: YARD is a Ruby Documentation tool. The Y stands for &quot;Yay!&quot;</a>
      </p>
    </>
  );

}

export default Home;
