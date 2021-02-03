import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

interface StyleModalProps {
    setWidth: string;
    setHeight: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    bodyFontSize?: string;
    bodyFontWeight?: string;
    leftButtonSize?: string;
    leftButtonFontSize?: string;
    leftButtonFontWeight?: string;
    rightButtonSize?: string;
    rightButtonFontSize?: string;
    rightButtonFontWeight?: string;
}

const StyledModal = styled.div<StyleModalProps>`
    display: block;
    width: ${props => (props.setWidth ? props.setWidth : '256px')};
    height: ${props => (props.setHeight ? props.setHeight : '148px')};
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 18px;
    border-radius: 4px;

    .title {
        height: 23px;
        line-height: 23px;
        margin-bottom: 23px;
        font-size: ${props => (props.titleFontSize ? props.titleFontSize : '16px')};
        font-weight: ${props => (props.titleFontWeight ? props.titleFontWeight : '500')};
        white-space: pre-line;
    }

    .icon_sns {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 15px;
        line-height: 15px;
        margin-right: 2px;
        .icon_container {
            width: 18px;
            height: 18px;
            border-radius: 2px;
            margin-left: 4px;

            display: flex;
            justify-content: center;
            align-items: center;

            &.kakao {
                background-color: #fccc00;
            }

            &.naver {
                background-color: #35b11e;
            }

            img {
                width: 13px;
            }
        }
    }

    .body {
        white-space: pre-line;
        font-size: ${props => (props.bodyFontSize ? props.bodyFontSize : '16px')};
        font-weight: ${props => (props.bodyFontWeight ? props.bodyFontWeight : '500')};
    }

    .button-box {
        display: flex;
        height: 28px;
        position: absolute;
        bottom: 18px;
        right: 18px;
        .left-button {
            padding: 0;
            width: ${props => (props.leftButtonSize ? props.leftButtonSize : '68px')};
            font-size: ${props => (props.leftButtonFontSize ? props.leftButtonFontSize : '14px')};
            font-weight: ${props => (props.leftButtonFontWeight ? props.leftButtonFontSize : '500')};
        }
        .right-button {
            padding: 0;
            width: ${props => (props.rightButtonSize ? props.rightButtonSize : '68px')};
            font-size: ${props => (props.rightButtonFontSize ? props.rightButtonFontSize : '14px')};
            font-weight: ${props => (props.rightButtonFontWeight ? props.rightButtonFontWeight : '500')};
        }
    }

    &:focus {
        outline: none;
    }
`;

interface CumaModalProps {
    open: boolean;
    title?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    body?: string;
    bodyFontSize?: string;
    bodyFontWeight?: string;
    leftButtonText?: string;
    leftButtonOnClick?: () => void;
    rightButtonText?: string;
    rightButtonOnClick?: () => void;
    setWidth?: string;
    setHeight?: string;
}

/**
 * @param open 오픈할때 사용
 * @param title 모달창 타이틀
 * @param titleFontSize 타이틀 폰트사이즈
 * @param titleFontWeight 타이틀 폰트 Weight
 * @param body 모달창 본문내용
 * @param bodyFontSize 본문 폰트 사이즈
 * @param bodyFontWeight 본문 폰트 Weight
 * @param leftButtonText 왼쪽 버튼 이름
 * @param leftButtonOnClick 왼쪽 버튼 클릭
 * @param rightButtonText 오른쪽 버튼 이름
 * @param rightButtonOnClick 오른쪽 버튼 클릭
 * @param setWidth width
 * @param setHeight height
 */
const CumaModal: React.FC<CumaModalProps> = ({
    open,
    bodyFontSize,
    title,
    titleFontSize,
    titleFontWeight,
    body,
    children,
    leftButtonText,
    leftButtonOnClick,
    rightButtonText,
    rightButtonOnClick,
    setWidth,
    setHeight,
}) => {
    return (
        <Modal
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <StyledModal
                    setWidth={setWidth}
                    setHeight={setHeight}
                    titleFontSize={titleFontSize}
                    titleFontWeight={titleFontWeight}
                    bodyFontSize={bodyFontSize}
                >
                    {title && <div className="title">{title ? title : '타이틀을 입력해주세요.'}</div>}
                    {children}
                    {body && <div className="body">{body}</div>}
                    <div className="button-box">
                        {leftButtonText && (
                            <Button className="left-button" onClick={leftButtonOnClick}>
                                {leftButtonText ? leftButtonText : '취소'}
                            </Button>
                        )}
                        {rightButtonText && (
                            <Button className="right-button" onClick={rightButtonOnClick}>
                                {rightButtonText ? rightButtonText : '확인'}
                            </Button>
                        )}
                    </div>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default CumaModal;
