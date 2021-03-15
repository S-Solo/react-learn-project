import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from "@material-ui/core";

import './PostModal.scss';

const PostModal = ({
    isOpen,
    titleValue,
    bodyValue,
    changeValue,
    action,
    onClose,
    buttonTitle,
}) => {
    const inputFieldRef = useRef();

    const handleRender = () => {
        console.log('current: ', inputFieldRef.current);
        if (isOpen && inputFieldRef.current) {
            inputFieldRef.current.focus();
        }
    }

    return (
        <Modal
            className="post-modal"
            open={isOpen}
            onClose={onClose}
            onRendered={handleRender}
        >
            <div className="post-modal__block">
                <input
                    name="titleValue"
                    value={titleValue}
                    className="post-modal__block__input"
                    type="text"
                    onChange={changeValue}
                    ref={inputFieldRef}
                />
                <input
                    name="bodyValue"
                    value={bodyValue}
                    className="post-modal__block__input"
                    type="text"
                    onChange={changeValue}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={action}
                    className="post-modal__block__btn"
                    title={buttonTitle}
                >{buttonTitle}</Button>
            </div>
        </Modal>
    )
}

PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    titleValue: PropTypes.string.isRequired,
    bodyValue: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

export default PostModal;
