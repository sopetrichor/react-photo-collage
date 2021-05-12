import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

interface StyledComponentProps { [key: string]: any; }
export const SC: StyledComponentProps = {};

SC.PhotoCollage = styled.div`
    width: ${props => props.collageWidth};
    font-family: Helvetica, Arial, sans-serif;
`;
SC.PhotoRow = styled.div`
    display: flex;
    border: 1px solid #ddd;
    height: ${props => props.rowHeight};
    box-sizing: border-box;
    & + & {
        margin-top: 2px;
    }
`;
SC.PhotoGrid = styled.div`
    display: flex;
    position: relative;
    flex: 1;
    cursor: pointer;
    & + & {
        margin-left: 2px;
    }
`;
SC.PhotoThumb = styled.div`
    flex: 1;
    background-image: url(${props => props.thumb});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;
SC.PhotoMask = styled.div`
    display: block;
    background-color: rgba(0, 0, 0, .4);
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    cursor: pointer;
`;
SC.NumOfRemaining = styled.div`
    position: absolute;
    color: #fff;
    font-size: 35px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &:before {
        content: '+';
    }
`;
SC.ViewMore = styled.div`
    width: 100%; 
    height: 100%; 
    position: absolute; 
    z-index: 1; 
    cursor: pointer;
`;

interface RowPhotosProps {
    height: string;
    photos: any;
    openLightbox: any;
    layoutNum: number;
    remainingNum: number;
    showNumOfRemainingPhotos: boolean;
}
const RowPhotos: React.FC<RowPhotosProps> = (props) => {
    const { height, photos, layoutNum, remainingNum, showNumOfRemainingPhotos, openLightbox } = props;
    return (
        <SC.PhotoRow rowHeight={height}>
            {
                photos.map((data, i) => {
                    return (
                        <SC.PhotoGrid key={i} data-id={data.id} onClick={e => openLightbox(e.currentTarget.dataset.id)}>
                            {
                                showNumOfRemainingPhotos && remainingNum > 0 && data.id === (layoutNum - 1) ?
                                    (
                                        <React.Fragment>
                                            <SC.PhotoMask></SC.PhotoMask>
                                            <SC.ViewMore>
                                                <SC.NumOfRemaining>{remainingNum}</SC.NumOfRemaining>
                                            </SC.ViewMore>
                                        </React.Fragment>
                                    ) : null
                            }
                            <SC.PhotoThumb thumb={data.source}></SC.PhotoThumb>
                        </SC.PhotoGrid>
                    )
                })
            }
        </SC.PhotoRow>
    );
}

interface ReactPhotoCollageComponentProps {
    width: string;
    height: Array<string>;
    layout: Array<number>;
    layoutPhotoMaps: any;
    layoutNum: number;
    remainingNum: number;
    showNumOfRemainingPhotos: boolean;
    openLightbox: any;
}
export const ReactPhotoCollageComponent: React.FC<ReactPhotoCollageComponentProps> = React.memo((props) => {
    const { width, height, layout, layoutPhotoMaps, layoutNum, remainingNum, showNumOfRemainingPhotos, openLightbox } = props;
    return (
        <SC.PhotoCollage collageWidth={width}>
            {
                layout.map((data, i) => {
                    return (
                        <RowPhotos
                            key={i}
                            height={height[i]}
                            photos={layoutPhotoMaps[i]}
                            openLightbox={openLightbox}
                            layoutNum={layoutNum}
                            remainingNum={remainingNum}
                            showNumOfRemainingPhotos={showNumOfRemainingPhotos}
                        />
                    )
                })
            }
        </SC.PhotoCollage>
    );
});