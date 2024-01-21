import InputCommon from './InputCommon';
import '../../index.css';

//메타데이터
export default {
  title: 'InputCommon',
  component: InputCommon,
};

export const Input = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px',
    }}
  >
    <InputCommon variant='default' defaultValue='default input' />
    <InputCommon variant='active' defaultValue='active input' />
    <InputCommon variant='validated' defaultValue='validated input' />
    <InputCommon variant='error' defaultValue='error input' />
    <InputCommon size='medium' defaultValue='medium input' />
    <InputCommon size='small' defaultValue='small input' />
  </div>
);
