import React, { useState } from 'react';

import styled from 'styled-components';
import Lightbox from 'react-images';

import Photo from './photo';

interface Props {
    width: string;
    layout: Array<number>;
    photos: Array<{src: string}>;
    margin: string;
    photosHeight: Array<string>;
}

interface SC { [key: string]: any; }
const S:SC = {};

S.Row = styled.div`
    display: flex;
`;
S.Collage = styled.div`
    width: ${props => props.cWidth}
`;

const createLayout = (photos, layout) => {
    const layoutWithPhotos = [];
    layout.map((v, i, a) => {
        if (layoutWithPhotos.length === 0) {
            layoutWithPhotos.push(photos.slice(0, v));
        }
        else {
            layoutWithPhotos.push(photos.slice(a[i - 1], a[i - 1] + v));
        }
    });
    return layoutWithPhotos;
}

const getNumofDisplayPhotos = (cL) => {
    return cL.reduce((pv, cv) => {
        return pv.length + cv.length
    });
}

const createPhotos = (currLayout, photos, margin, photosHeight, handleClick) => {
    const p = [];
    const numOfLayoutPhotos = getNumofDisplayPhotos(currLayout);
    let currIndex = 0;

    currLayout.map((v, i) => {
        p.push(
            v.map((sv, si) => {
                const photoSet = {
                    key: 'p' + i + si,
                    index: currIndex,
                    source: sv.src,
                    margin: margin,
                    photosHeight: photosHeight[i],
                    onClick: handleClick
                };
                if (i === 1 && si === (currLayout[1].length - 1)) {
                    photoSet['numOfRemainingPhotos'] = (photos.length - numOfLayoutPhotos)
                }
                currIndex++;
                return <Photo {...photoSet} />;
            })
        );
    });
    return p;
}

const createContent = (currPhotos) => {
    const cnt = [];
    cnt.push(currPhotos.map((v, i) => {
        return (
            <S.Row key={i}>
                { v.map((sv) => { return sv; }) }
            </S.Row>
        );
    }));
    return cnt;
}

const PhotoCollage = (props: Props) => {
    const { width, layout, photos, margin, photosHeight } = props;

    const [lightboxIsOpen, setLightboxState] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);
        
    const handleClick = (e, { index }) => {
        setLightboxState(true);
        setCurrentImage(index);
    }

    const cLayout = createLayout(photos, layout);        
    const cPhotos = createPhotos(cLayout, photos, margin, photosHeight, handleClick);
    const cContent = createContent(cPhotos);

    return(
        <S.Collage cWidth={width}>
            {cContent}
            <Lightbox 
                currentImage={currentImage}
                images={photos} 
                isOpen={lightboxIsOpen} 
                onClickPrev={() => setCurrentImage(currentImage - 1)} 
                onClickNext={() => setCurrentImage(currentImage + 1)} 
                onClose={() => setLightboxState(false)} 
            />
        </S.Collage>
    );
}

export default PhotoCollage;