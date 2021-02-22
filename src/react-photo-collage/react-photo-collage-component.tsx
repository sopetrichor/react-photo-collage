import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, {css} from 'styled-components';

interface StyledComponentProps { [key: string]: any; }
export const SC: StyledComponentProps = {};

SC.PhotoCollage = styled.div`
    width: ${props => props.collageWidth};
    font-family: Helvetica, Arial, sans-serif;
`;
SC.PhotoRow = styled.div`
    display: flex;
    ${props => props.showBorders && css`
      border: 1px solid #ddd;
    `}
    height: ${props => props.rowHeight};
    box-sizing: border-box;
    & + & {
        margin-top: ${props => props.gap+"px"};
    }
`;
SC.PhotoGrid = styled.div`
    display: flex;
    position: relative;
    flex: 1;
    cursor: pointer;
    & + & {
        margin-left: ${props => props.gap+"px"};
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
    onClick: Function;
    layoutNum: number;
    remainingNum: number;
    showNumOfRemainingPhotos: boolean;
    moreItemsRenderer?: Function;
    gap: number;
    showBorders?: boolean;
}
const RowPhotos: React.FC<RowPhotosProps> = (props) => {
    const { height, photos, layoutNum, remainingNum, showNumOfRemainingPhotos, onClick, moreItemsRenderer, gap, showBorders } = props;
    return (
        <SC.PhotoRow rowHeight={height} gap={gap} showBorders={showBorders}>
            {
                photos.map((data, i) => {
                    return (
                        <SC.PhotoGrid key={i} data-id={data.id} onClick={e => onClick(e.currentTarget.dataset.id)} gap={gap} showBorders={showBorders}>
                            {
                                showNumOfRemainingPhotos && remainingNum > 0 && data.id === (layoutNum - 1) ?
                                    moreItemsRenderer
                                        ? moreItemsRenderer(remainingNum)
                                        : (
                                            <React.Fragment>
                                                <SC.PhotoMask></SC.PhotoMask>
                                                <SC.ViewMore>
                                                    <SC.NumOfRemaining>{remainingNum}</SC.NumOfRemaining>
                                                </SC.ViewMore>
                                            </React.Fragment>
                                        ) : null
                            }
                            <SC.PhotoThumb thumb={data.src}></SC.PhotoThumb>
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
    onClick: any;
    moreItemsRenderer?: Function;
    gap: number;
    showBorders: boolean;
}
export const ReactPhotoCollageComponent: React.FC<ReactPhotoCollageComponentProps> = React.memo((props) => {
    const { width, height, layout, layoutPhotoMaps, layoutNum, remainingNum, showNumOfRemainingPhotos, onClick, moreItemsRenderer, gap, showBorders } = props;
    return (
        <SC.PhotoCollage collageWidth={width}>
            {
                layout.map((data, i) => {
                    return (
                        <RowPhotos
                            key={i}
                            height={height[i]}
                            photos={layoutPhotoMaps[i]}
                            onClick={onClick}
                            layoutNum={layoutNum}
                            remainingNum={remainingNum}
                            showNumOfRemainingPhotos={showNumOfRemainingPhotos}
                            moreItemsRenderer={moreItemsRenderer}
                            gap={gap}
                            showBorders={showBorders}
                        />
                    )
                })
            }
        </SC.PhotoCollage>
    );
});