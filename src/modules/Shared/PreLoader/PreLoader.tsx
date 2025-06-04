 
import { Hourglass } from 'react-loader-spinner';

const PreLoader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Hourglass
        visible={true}
        height={80}
        width={80}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['black', 'grey']}
      />
    </div>
  );
};

export default PreLoader;
