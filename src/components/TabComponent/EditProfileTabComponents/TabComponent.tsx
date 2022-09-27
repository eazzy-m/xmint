
const TabComponent = (props: {fillPhrase: string}) => {

  const {fillPhrase} = props;

  return (
    <div className='tab-component'>
        {fillPhrase}
    </div>
  );
}
;
export default TabComponent;