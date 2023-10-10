import React, { useState } from 'react';
import '../index.css'

const Square = () => {
    const [value, setValue] = useState('');

    return (

        //ONCLICK EVENT로 STATE가 변경되면 RERENDERING 발생
        //화면에 표시되는 값을 변경시킴
        <button className="square" onClick={()=> {setValue('X')}}>
            {value}
        </button>
    );
}

export default Square;
