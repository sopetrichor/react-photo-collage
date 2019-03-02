import React, { useState } from 'react';

import styled from 'styled-components';

interface SC { [key: string]: any; }
const S:SC = {};

S.PhotoContainer = styled.div`
    height: ${props => props.pHeight}; 
    margin: ${props => props.pMargin};
    overflow: hidden; 
    position: relative; 
    flex: 1;
`;
S.HoverMask = styled.div`
    display: none;
    background-color: rgba(0, 0, 0, .4);
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    cursor: pointer;
    ${S.PhotoContainer}:hover & {
        display: block;
    }
`;

S.NumOfRemaining = styled.div`
    color: #fff;
    font-size: 35px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &:before {
        content: '+';
    }
`;
S.ViewMore = styled.div`
    width: 100%; 
    height: 100%; 
    position: absolute; 
    z-index: 1; 
    cursor: pointer;
`;

S.Img = styled.img.attrs({
    src: props => props.pSource
})`
    position: absolute;
    top: ${props => (props.loaded === 'portrait' ? '0%' : '50%')};
    left: 50%;
    transform: ${props => (props.loaded === 'portrait' ? 'translate(-50%, -0%)' : 'translate(-50%, -50%)')};
`;

interface Props {
    key: string;
    index: number;
    source: string;
    margin: string;
    photosHeight: string;
    onClick: Function;
    numOfRemainingPhotos?: number;
}

const Photo = (props: Props): JSX.Element => {
    const { index, source, numOfRemainingPhotos, photosHeight, margin, onClick } = props;
    
    const [loaded, setLoaded] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [orientation, setOrientation] = useState<string>('');
    
    const imgClick = (e: object) => {
        onClick(e, { source, index });
    }

    const handleImageLoaded = (e: any) => {
        if (!loaded) {
            const { width, height } = e.currentTarget;
            setLoaded(true);
            setWidth(width);
            setHeight(height);
            setOrientation(width <= height ? 'portrait' : 'landscape');
        }
    }

    const handleImageErrored = (e: any) => {}

    if (numOfRemainingPhotos) {
        return (
            <S.PhotoContainer pHeight={photosHeight} pMargin={margin} onClick={imgClick}>
                <S.HoverMask></S.HoverMask>
                <S.ViewMore>
                    <S.NumOfRemaining>{numOfRemainingPhotos}</S.NumOfRemaining>
                </S.ViewMore>
                <S.Img pSource={source} onLoad={handleImageLoaded} onError={handleImageErrored}></S.Img>
            </S.PhotoContainer>
        );
    }
    else {
        return (
            <S.PhotoContainer pHeight={photosHeight} pMargin={margin} onClick={imgClick}>
                <S.HoverMask></S.HoverMask>
                <S.Img pSource={source} onLoad={handleImageLoaded} onError={handleImageErrored}></S.Img>
            </S.PhotoContainer>
        );
    }
}

export default Photo;