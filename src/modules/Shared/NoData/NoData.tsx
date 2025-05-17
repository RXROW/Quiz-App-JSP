import React from 'react';
import nodata from '../../../assets/No data-rafiki.png';

interface NoDataProps {
  message?: string;
}

const NoData: React.FC<NoDataProps> = ({ message  }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <img className="mx-auto w-96 h-auto mb-6" src={nodata} alt="No Data" />
      <p className="text-gray-500 text-xl">{message}</p>
    </div>
  );
};

export default NoData;
