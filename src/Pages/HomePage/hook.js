import React, { useState, useEffect } from 'react';

export default function useHook() {
  const [searchData, setSearchData] = useState('');

  const onSearch = () => {
    alert(`You have searched for ${searchData}`);
  };

  return {
    searchData,
    setSearchData,
    onSearch,
  };
}
