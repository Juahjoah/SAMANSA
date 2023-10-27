import Card from '.';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;

const mock = {
  title: '킹받다',
  content:
    '침착맨 방송에서 2018년 후반부터 자주 쓰게 된 말. 1번 항목만큼 그렇게까지 진지하게 화가 나는 것은 아니지만, 은근히 신경을 긁거나 짜증나게 하는 상태를 유발하는 무언가를 지칭할 때 쓰는 표현이다.',
  example: '(예: 저 사람 웃음 소리가 킹받는다.)',
};

const { title, content, example } = mock;

export const Default = {
  render: () => <Card title={title} content={content} example={example} />,
};
