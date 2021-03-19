import React, { useRef } from 'react';

import './ImageInput.scss';

const ImageInput = () => {
    const inputRef = useRef();

    const clickHandler = () => {
        inputRef.current.click();
    }

    const changeHandler = (e) => {
        console.log(e);
    }

    return (
        <div className="app-image-input">
            <input
                type="file"
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={changeHandler}
            />
            <div className="app-image-input__input" onClick={clickHandler}>
                Upload Image
            </div>
        </div>
    )
}

export default ImageInput;
