import ButtonCommon from './ButtonCommon';
import '../../index.css';

//메타데이터
export default {
  title: 'ButtonCommon',
  component: ButtonCommon,
};

export const LargeButton = () => (
  <>
    <ButtonCommon variant='default' size='large'>
      Large Default Button
    </ButtonCommon>
    <ButtonCommon variant='active' size='large'>
      Large Active Button
    </ButtonCommon>
  </>
);
export const BigButton = () => (
  <>
    <ButtonCommon variant='default' size='big' disabled={true}>
      Big disabled button
    </ButtonCommon>
    <ButtonCommon variant='default-active' size='big'>
      Big disabled button
    </ButtonCommon>
    <ButtonCommon customClassName='white' size='big'>
      Big Join Button
    </ButtonCommon>
    <ButtonCommon customClassName='lightblue' size='big'>
      Big Google join Button
    </ButtonCommon>
  </>
);
export const Medium = () => (
  <>
    {' '}
    <ButtonCommon size='medium' disabled={true}>
      Medium Disabled Button
    </ButtonCommon>
    <ButtonCommon variant='default-active' size='medium'>
      Medium Active Button
    </ButtonCommon>
  </>
);
export const SmallButton = () => (
  <>
    Med-Small Button
    <ButtonCommon variant='default-active' size='med-small'>
      Med-Small Button
    </ButtonCommon>
    Small Button
    <ButtonCommon variant='default-active' size='small'>
      Button
    </ButtonCommon>
    SSmall Button
    <ButtonCommon variant='default-active' size='ssmall'>
      Button
    </ButtonCommon>
    <ButtonCommon variant='default-active' size='tiny'>
      Button
    </ButtonCommon>
  </>
);
