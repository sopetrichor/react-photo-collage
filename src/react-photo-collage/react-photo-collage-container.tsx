import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Carousel, { Modal, ModalGateway } from "react-images";

import {
    ReactPhotoCollageComponent,
} from './react-photo-collage-component';

const createPhotoIds = (photos) => {
    return photos.map((data, i) => {
        return { ...data, id: i }
    });
}
const createLayoutPhotoMaps = (layout, photos) => {
    const newPhotos = createPhotoIds(photos);
    const newMaps = {};
    layout.reduce((accumulator, currentValue, currentIndex) => {
        newMaps[currentIndex] = newPhotos.slice(accumulator, accumulator + currentValue);
        return accumulator + currentValue;
    }, 0);

    return newMaps;

}

interface ReactPhotoCollageContainerProps {
    width?: string;
    height?: Array<string>;
    layout: Array<number>;
    photos: Array<{ source: string }>;
    showNumOfRemainingPhotos?: boolean
}
const checkProps = (props: ReactPhotoCollageContainerProps) => {
    const defaultProps = {
        width: '800px',
        height: new Array(props.layout.length),
        layout: [],
        photos: [],
        showNumOfRemainingPhotos: false
    }
    const newProps = { ...defaultProps, ...props };
    if (newProps.height.length < newProps.layout.length) {
        for (let i = 0; i < newProps.layout.length; i++) {
            newProps.height[i] = '200px';
        }
    }
    return newProps;
}
const ReactPhotoCollageContainer: React.FC<ReactPhotoCollageContainerProps> = (props) => {
    const currProps = useMemo(() => checkProps(props), [props]);
    const { width, height, layout, photos, showNumOfRemainingPhotos } = currProps;
    const layoutNum = layout.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const remainingNum = photos.length - layoutNum;
    const [allowRender, setAllowRender] = useState<boolean>(false);
    const [layoutPhotoMaps, setLayoutPhotoMaps] = useState<any>({});
    const [viewerIsOpen, setViewerIsOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    useEffect(() => {
        setLayoutPhotoMaps(createLayoutPhotoMaps(layout, photos));
    }, []);
    useEffect(() => {
        Object.keys(layoutPhotoMaps).length ? setAllowRender(true) : setAllowRender(false);
    }, [layoutPhotoMaps]);

    const openLightbox = useCallback((id) => {
        setCurrentImage(parseInt(id));
        setViewerIsOpen(true);
    }, []);
    const closeLightbox = useCallback(() => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    }, []);

    if (allowRender) {
        return (
            <React.Fragment>
                <ReactPhotoCollageComponent
                    width={width}
                    height={height}
                    layout={layout}
                    layoutPhotoMaps={layoutPhotoMaps}
                    layoutNum={layoutNum}
                    remainingNum={remainingNum}
                    showNumOfRemainingPhotos={showNumOfRemainingPhotos}
                    openLightbox={openLightbox}
                />
                <ModalGateway>
                    {
                        viewerIsOpen ?
                            (
                                <Modal onClose={closeLightbox}>
                                    <Carousel views={photos} currentIndex={currentImage} />
                                </Modal>
                            ) : null
                    }
                </ModalGateway>
            </React.Fragment>
        );
    }

    return null;
}

export default ReactPhotoCollageContainer;